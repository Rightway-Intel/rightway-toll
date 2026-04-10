package com.tollwise.dto;
import lombok.Data;
import java.util.List;
@Data
public class TollCalculateResponse {
    private String origin;
    private String destination;
    private String vehicle;
    private Double distanceKm;
    private Integer durationMin;
    private Boolean returnTrip;
    private String polyline;
    private Integer plazaCount;
    private Integer totalTollInr;
    private List<PlazaResult> plazas;
    private List<String> states;
    private List<String> highways;
    private Integer avgTollPerPlaza;
}