package com.example.backend.service;

import com.example.backend.model.Asteroid;
import com.example.backend.repository.AsteroidRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.util.Iterator;
import java.util.Map;

@Service
public class NasaService {

    @Autowired
    private AsteroidRepository asteroidRepository;

    private final String NASA_API_URL = "https://api.nasa.gov/neo/rest/v1/feed";
    private final String API_KEY = "JBRdzTyFMA6HbERtnQPrQD2cS63WNGXSAc4BNUZR";

    public void fetchAndSaveAsteroids() {
        RestTemplate restTemplate = new RestTemplate();
        String url = NASA_API_URL + "?api_key=" + API_KEY;

        try {
            String response = restTemplate.getForObject(url, String.class);
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(response);
            JsonNode nearEarthObjects = root.path("near_earth_objects");

            Iterator<Map.Entry<String, JsonNode>> dates = nearEarthObjects.fields();
            while (dates.hasNext()) {
                Map.Entry<String, JsonNode> dateEntry = dates.next();
                JsonNode asteroidsForDate = dateEntry.getValue();

                for (JsonNode node : asteroidsForDate) {
                    Asteroid asteroid = new Asteroid();
                    
                    asteroid.setId(node.path("id").asText());
                    asteroid.setName(node.path("name").asText());
                    asteroid.setHazardous(node.path("is_potentially_hazardous_asteroid").asBoolean());
                    
                    double diameter = node.path("estimated_diameter").path("meters").path("estimated_diameter_max").asDouble();
                    asteroid.setDiameterMeters(diameter);

                    double speed = node.path("close_approach_data").get(0).path("relative_velocity").path("kilometers_per_hour").asDouble();
                    asteroid.setVelocityKmph(speed);

                    double missDistance = node.path("close_approach_data").get(0).path("miss_distance").path("kilometers").asDouble();
                    asteroid.setMissDistanceKm(missDistance);

                    asteroid.setApproachDate(LocalDate.parse(dateEntry.getKey()));

                    asteroidRepository.save(asteroid);
                }
            }
            System.out.println("Backend: NASA Sync Complete.");
        } catch (Exception e) {
            System.err.println("Backend Error: " + e.getMessage());
        }
    }
}