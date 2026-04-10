package com.tollwise.entity;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
@Data
@Entity
@Table(name = "trips")
public class Trip {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    private String origin;
    private String destination;
    private String vehicle;
    private Double distanceKm;
    private Integer durationMin;
    private Integer totalTollInr;
    private Integer plazaCount;
    private Boolean returnTrip;
    @Column(columnDefinition = "TEXT")
    private String plazasJson;
    @Column(columnDefinition = "TEXT")
    private String statesJson;
    private LocalDateTime createdAt;
    @PrePersist
    protected void onCreate() { createdAt = LocalDateTime.now(); }
}