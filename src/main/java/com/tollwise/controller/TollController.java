package com.tollwise.controller;
import com.tollwise.dto.TollCalculateRequest;
import com.tollwise.dto.TollCalculateResponse;
import com.tollwise.service.TollCalculationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/api/toll")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class TollController {
    private final TollCalculationService tollCalculationService;
    @PostMapping("/calculate")
    public ResponseEntity<TollCalculateResponse> calculate(@RequestBody TollCalculateRequest request) {
        return ResponseEntity.ok(tollCalculationService.calculate(
            request.getOrigin(), request.getDestination(),
            request.getVehicle(), request.getReturnTrip(),
            request.getAvoidTolls()
        ));
    }
}