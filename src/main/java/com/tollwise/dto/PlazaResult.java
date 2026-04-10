package com.tollwise.dto;
import lombok.Data;
@Data
public class PlazaResult {
    private Long id;
    private String plazaName;
    private String highwayCode;
    private String state;
    private String district;
    private Double latitude;
    private Double longitude;
    private Integer tollInr;
    private Double distFromRouteKm;
    private Double distAlongRouteKm;
}