package com.tollwise.controller;
import com.tollwise.entity.Trip;
import com.tollwise.service.TripService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/api/trips")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class TripController {
    private final TripService tripService;
    @GetMapping("/{userId}")
    public ResponseEntity<List<Trip>> getUserTrips(@PathVariable Long userId) {
        return ResponseEntity.ok(tripService.getUserTrips(userId));
    }
}