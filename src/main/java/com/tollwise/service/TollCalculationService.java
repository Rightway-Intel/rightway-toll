package com.tollwise.service;
import com.tollwise.dto.PlazaResult;
import com.tollwise.dto.TollCalculateResponse;
import com.tollwise.entity.TollPlaza;
import com.tollwise.repository.TollPlazaRepository;
import com.tollwise.util.GeoUtil;
import com.tollwise.util.PolylineDecoder;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.*;
import java.util.stream.Collectors;
@Service
@RequiredArgsConstructor
public class TollCalculationService {
    private final TollPlazaRepository tollPlazaRepository;
    private final RestTemplate restTemplate;
    @Value("${google.maps.api.key}")
    private String googleMapsApiKey;

    public List<TollCalculateResponse> calculateAll(String origin, String destination, String vehicle, Boolean returnTrip, Boolean avoidTolls) {
        String avoidParam = (avoidTolls != null && avoidTolls) ? "&avoid=tolls" : "";
        String url = "https://maps.googleapis.com/maps/api/directions/json?origin=" + origin
                + "&destination=" + destination
                + "&alternatives=true"
                + "&key=" + googleMapsApiKey
                + "&region=in" + avoidParam;

        Map response = restTemplate.getForObject(url, Map.class);
        if (response == null || !"OK".equals(response.get("status"))) throw new RuntimeException("Route not found");

        List<Map> routes = (List<Map>) response.get("routes");
        List<TollCalculateResponse> results = new ArrayList<>();

        for (int i = 0; i < routes.size(); i++) {
            Map route = routes.get(i);
            Map leg = ((List<Map>) route.get("legs")).get(0);
            String polyline = ((Map) route.get("overview_polyline")).get("points").toString();
            double distanceKm = ((Number)((Map)leg.get("distance")).get("value")).doubleValue()/1000;
            int durationMin = ((Number)((Map)leg.get("duration")).get("value")).intValue()/60;

            List<double[]> points = PolylineDecoder.decode(polyline);
            List<PlazaResult> plazas = (avoidTolls != null && avoidTolls) ? new ArrayList<>() : findPlazasOnRoute(points, vehicle, returnTrip);
            int totalToll = plazas.stream().mapToInt(PlazaResult::getTollInr).sum();

            TollCalculateResponse res = new TollCalculateResponse();
            res.setOrigin(leg.get("start_address").toString());
            res.setDestination(leg.get("end_address").toString());
            res.setVehicle(vehicle);
            res.setDistanceKm(distanceKm);
            res.setDurationMin(durationMin);
            res.setReturnTrip(returnTrip);
            res.setPolyline(polyline);
            res.setPlazaCount(plazas.size());
            res.setTotalTollInr(totalToll);
            res.setPlazas(plazas);
            res.setStates(plazas.stream().map(PlazaResult::getState).distinct().sorted().collect(Collectors.toList()));
            res.setHighways(plazas.stream().map(PlazaResult::getHighwayCode).distinct().sorted().collect(Collectors.toList()));
            res.setAvgTollPerPlaza(plazas.isEmpty() ? 0 : totalToll/plazas.size());
            res.setRouteIndex(i);
            results.add(res);
        }
        return results;
    }

    public TollCalculateResponse calculate(String origin, String destination, String vehicle, Boolean returnTrip, Boolean avoidTolls) {
        List<TollCalculateResponse> all = calculateAll(origin, destination, vehicle, returnTrip, avoidTolls);
        return all.get(0);
    }

    private List<PlazaResult> findPlazasOnRoute(List<double[]> points, String vehicle, Boolean returnTrip) {
        double pad=0.35;
        double latMin=points.stream().mapToDouble(p->p[0]).min().orElse(0)-pad;
        double latMax=points.stream().mapToDouble(p->p[0]).max().orElse(0)+pad;
        double lonMin=points.stream().mapToDouble(p->p[1]).min().orElse(0)-pad;
        double lonMax=points.stream().mapToDouble(p->p[1]).max().orElse(0)+pad;
        List<TollPlaza> candidates = tollPlazaRepository.findByBoundingBox(latMin,latMax,lonMin,lonMax);
        double[] cumulative = new double[points.size()];
        for (int i=1; i<points.size(); i++) cumulative[i]=cumulative[i-1]+GeoUtil.haversine(points.get(i-1)[0],points.get(i-1)[1],points.get(i)[0],points.get(i)[1]);
        List<PlazaResult> matched = new ArrayList<>();
        Set<Long> seen = new HashSet<>();
        for (TollPlaza plaza : candidates) {
            double bestDist=Double.MAX_VALUE, bestAlong=0;
            for (int i=0; i<points.size()-1; i++) {
                double[] proj=GeoUtil.projectPointOnSegment(plaza.getLatitude(),plaza.getLongitude(),points.get(i)[0],points.get(i)[1],points.get(i+1)[0],points.get(i+1)[1]);
                double dist=GeoUtil.haversine(plaza.getLatitude(),plaza.getLongitude(),proj[0],proj[1]);
                if (dist<bestDist) { bestDist=dist; double segLen=GeoUtil.haversine(points.get(i)[0],points.get(i)[1],points.get(i+1)[0],points.get(i+1)[1]); bestAlong=cumulative[i]+proj[2]*segLen; }
            }
            if (bestDist>20.0 || seen.contains(plaza.getId())) continue;
            seen.add(plaza.getId());
            int baseToll=getTollByVehicle(plaza,vehicle);
            int toll=returnTrip?(int)Math.round(baseToll*plaza.getReturn24hrMult()):baseToll;
            PlazaResult result=new PlazaResult();
            result.setId(plaza.getId()); result.setPlazaName(plaza.getPlazaName()); result.setHighwayCode(plaza.getHighwayCode());
            result.setState(plaza.getState()); result.setDistrict(plaza.getDistrict()); result.setLatitude(plaza.getLatitude()); result.setLongitude(plaza.getLongitude());
            result.setTollInr(toll); result.setDistFromRouteKm(Math.round(bestDist*10.0)/10.0); result.setDistAlongRouteKm(Math.round(bestAlong*10.0)/10.0);
            matched.add(result);
        }
        matched.sort(Comparator.comparingDouble(PlazaResult::getDistAlongRouteKm));
        List<PlazaResult> deduped = new ArrayList<>();
        double lastAlong = -999;
        for (PlazaResult p : matched) {
            if (p.getDistAlongRouteKm() - lastAlong >= 5.0) {
                deduped.add(p);
                lastAlong = p.getDistAlongRouteKm();
            }
        }
        return deduped;
    }

    private int getTollByVehicle(TollPlaza plaza, String vehicle) {
        return switch(vehicle) {
            case "bike" -> plaza.getBikeSingleInr()!=null?plaza.getBikeSingleInr():0;
            case "lcv" -> plaza.getLcvMinibusInr()!=null?plaza.getLcvMinibusInr():0;
            case "bus" -> plaza.getBus2axleInr()!=null?plaza.getBus2axleInr():0;
            case "truck3" -> plaza.getTruck3axleInr()!=null?plaza.getTruck3axleInr():0;
            case "truck4" -> plaza.getTruck4axleInr()!=null?plaza.getTruck4axleInr():0;
            case "mav" -> plaza.getMavInr()!=null?plaza.getMavInr():0;
            case "over" -> plaza.getOversizedInr()!=null?plaza.getOversizedInr():0;
            default -> plaza.getCarJeepVanInr()!=null?plaza.getCarJeepVanInr():0;
        };
    }
}