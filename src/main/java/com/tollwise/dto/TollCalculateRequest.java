package com.tollwise.dto;
import lombok.Data;
@Data
public class TollCalculateRequest {
    private String origin;
    private String destination;
    private String vehicle;
    private Boolean returnTrip = false;
    private Boolean avoidTolls = false;
}