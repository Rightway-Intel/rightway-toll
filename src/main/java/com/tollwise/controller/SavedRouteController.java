package com.tollwise.controller;
import com.tollwise.entity.SavedRoute;
import com.tollwise.entity.User;
import com.tollwise.repository.UserRepository;
import com.tollwise.service.SavedRouteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
@RestController
@RequestMapping("/api/routes")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class SavedRouteController {
    private final SavedRouteService savedRouteService;
    private final UserRepository userRepository;
    @GetMapping("/{userId}")
    public ResponseEntity<List<SavedRoute>> getUserRoutes(@PathVariable Long userId) {
        return ResponseEntity.ok(savedRouteService.getUserRoutes(userId));
    }
    @PostMapping("/save")
    public ResponseEntity<SavedRoute> saveRoute(@RequestBody Map<String, String> body) {
        User user = userRepository.findById(Long.parseLong(body.get("userId"))).orElseThrow(() -> new RuntimeException("User not found"));
        return ResponseEntity.ok(savedRouteService.saveRoute(body.get("routeName"), body.get("origin"), body.get("destination"), body.get("vehicle"), user));
    }
    @DeleteMapping("/{routeId}")
    public ResponseEntity<Void> deleteRoute(@PathVariable Long routeId) {
        savedRouteService.deleteRoute(routeId);
        return ResponseEntity.ok().build();
    }
}