package com.tollwise.service;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tollwise.dto.TollCalculateResponse;
import com.tollwise.entity.Trip;
import com.tollwise.entity.User;
import com.tollwise.repository.TripRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
@RequiredArgsConstructor
public class TripService {
    private final TripRepository tripRepository;
    private final ObjectMapper objectMapper;
    public Trip saveTrip(TollCalculateResponse response, User user) {
        try {
            Trip trip = new Trip();
            trip.setUser(user); trip.setOrigin(response.getOrigin()); trip.setDestination(response.getDestination());
            trip.setVehicle(response.getVehicle()); trip.setDistanceKm(response.getDistanceKm());
            trip.setDurationMin(response.getDurationMin()); trip.setTotalTollInr(response.getTotalTollInr());
            trip.setPlazaCount(response.getPlazaCount()); trip.setReturnTrip(response.getReturnTrip());
            trip.setPlazasJson(objectMapper.writeValueAsString(response.getPlazas()));
            trip.setStatesJson(objectMapper.writeValueAsString(response.getStates()));
            return tripRepository.save(trip);
        } catch (Exception e) { throw new RuntimeException("Failed to save trip", e); }
    }
    public List<Trip> getUserTrips(Long userId) { return tripRepository.findByUserIdOrderByCreatedAtDesc(userId); }
}