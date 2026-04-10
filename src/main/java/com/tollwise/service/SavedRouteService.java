package com.tollwise.service;
import com.tollwise.entity.SavedRoute;
import com.tollwise.entity.User;
import com.tollwise.repository.SavedRouteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
@RequiredArgsConstructor
public class SavedRouteService {
    private final SavedRouteRepository savedRouteRepository;
    public SavedRoute saveRoute(String routeName, String origin, String destination, String vehicle, User user) {
        SavedRoute route = new SavedRoute();
        route.setUser(user); route.setRouteName(routeName); route.setOrigin(origin);
        route.setDestination(destination); route.setDefaultVehicle(vehicle);
        return savedRouteRepository.save(route);
    }
    public List<SavedRoute> getUserRoutes(Long userId) { return savedRouteRepository.findByUserId(userId); }
    public void deleteRoute(Long routeId) { savedRouteRepository.deleteById(routeId); }
}