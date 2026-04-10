package com.tollwise.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "toll_plazas")
public class TollPlaza {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String plazaCode;
    private String plazaName;
    private String highwayCode;
    private String sectionOfHighway;
    private String state;
    private String district;
    private Double latitude;
    private Double longitude;
    private Boolean paymentFastag;
    private Boolean paymentUpi;
    private Boolean paymentCash;
    private Integer bikeSingleInr;
    private Integer carJeepVanInr;
    private Integer lcvMinibusInr;
    private Integer bus2axleInr;
    private Integer truck3axleInr;
    private Integer truck4axleInr;
    private Integer mavInr;
    private Integer oversizedInr;
    private Double return24hrMult;
    private Double returnNextdayMult;
    private String dataSource;
}
