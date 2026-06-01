package com.example.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "ligo_events")
public class LigoEvent {

    @Id
    private String eventId;
    private String commonName;
    private String gpsTime;
    private String eventType;
    private double totalMass;
    public String getEventId() { return eventId; }
    public void setEventId(String eventId) { this.eventId = eventId; }

    public String getCommonName() { return commonName; }
    public void setCommonName(String commonName) { this.commonName = commonName; }

    public String getGpsTime() { return gpsTime; }
    public void setGpsTime(String gpsTime) { this.gpsTime = gpsTime; }

    public String getEventType() { return eventType; }
    public void setEventType(String eventType) { this.eventType = eventType; }

    public double getTotalMass() { return totalMass; }
    public void setTotalMass(double totalMass) { this.totalMass = totalMass; }
}