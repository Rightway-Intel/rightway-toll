package com.tollwise.entity;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
@Data
@Entity
@Table(name = "saved_routes")
public class SavedRoute {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    private String routeName;
    private String origin;
    private String destination;
    private String defaultVehicle;
    private LocalDateTime createdAt;
    @PrePersist
    protected void onCreate() { createdAt = LocalDateTime.now(); }
}