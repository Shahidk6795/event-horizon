package com.example.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDate;

@Entity
@Table(name = "asteroids")
public class Asteroid {

    @Id
    private String id;
    private String name;
    private boolean isHazardous;
    private double diameterMeters;
    private double velocityKmph;
    private double missDistanceKm;
    private LocalDate approachDate;

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public boolean isHazardous() { return isHazardous; }
    public void setHazardous(boolean hazardous) { isHazardous = hazardous; }

    public double getDiameterMeters() { return diameterMeters; }
    public void setDiameterMeters(double diameterMeters) { this.diameterMeters = diameterMeters; }

    public double getVelocityKmph() { return velocityKmph; }
    public void setVelocityKmph(double velocityKmph) { this.velocityKmph = velocityKmph; }

    public double getMissDistanceKm() { return missDistanceKm; }
    public void setMissDistanceKm(double missDistanceKm) { this.missDistanceKm = missDistanceKm; }

    public LocalDate getApproachDate() { return approachDate; }
    public void setApproachDate(LocalDate approachDate) { this.approachDate = approachDate; }
}