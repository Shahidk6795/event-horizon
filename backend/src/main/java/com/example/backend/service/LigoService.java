package com.example.backend.service;

import com.example.backend.model.LigoEvent;
import com.example.backend.repository.LigoRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Iterator;
import java.util.Map;

@Service
public class LigoService {

    @Autowired
    private LigoRepository ligoRepository;

    private final String LIGO_API_URL = "https://gwosc.org/eventapi/json/GWTC-1-confident/";

    public void fetchAndSaveLigoEvents() {
        RestTemplate restTemplate = new RestTemplate();
        try {
            System.out.println("Connecting to LIGO API...");
            String response = restTemplate.getForObject(LIGO_API_URL, String.class);
            
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(response);
            
            JsonNode events = root.has("events") ? root.get("events") : root;

            if (events.isEmpty()) {
                System.out.println("CRITICAL: No events found in the API response!");
                return;
            }

            Iterator<Map.Entry<String, JsonNode>> eventEntries = events.fields();
            int count = 0;

            while (eventEntries.hasNext() && count < 20) {
                Map.Entry<String, JsonNode> entry = eventEntries.next();
                String key = entry.getKey();
                JsonNode eventNode = entry.getValue();

                if (key.equalsIgnoreCase("metadata") || key.equalsIgnoreCase("links")) continue;

                System.out.println("Found Event: " + key);

                LigoEvent ligoEvent = new LigoEvent();
                ligoEvent.setEventId(key);
                
                JsonNode nameNode = eventNode.findValue("commonName");
                ligoEvent.setCommonName(nameNode != null ? nameNode.asText() : key);

                JsonNode gpsNode = eventNode.findValue("gps");
                if (gpsNode == null) gpsNode = eventNode.findValue("GPS");
                
                if (gpsNode != null) {
                    ligoEvent.setGpsTime(gpsNode.asText());
                } else {
                    ligoEvent.setGpsTime("0");
                }

                ligoEvent.setEventType("Compact Binary Coalescence");

                JsonNode massNode = eventNode.findValue("total_mass_source");
                ligoEvent.setTotalMass(massNode != null ? massNode.asDouble() : 0.0);

                ligoRepository.save(ligoEvent);
                count++;
            }
            System.out.println("Successfully saved " + count + " LIGO events to MySQL.");
        } catch (Exception e) {
            System.err.println("FATAL ERROR: " + e.getMessage());
            e.printStackTrace();
        }
    }
}