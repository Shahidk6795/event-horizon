package com.example.backend.controller;

import com.example.backend.model.Asteroid;
import com.example.backend.model.LigoEvent;
import com.example.backend.repository.AsteroidRepository;
import com.example.backend.repository.LigoRepository;
import com.example.backend.service.NasaService;
import com.example.backend.service.LigoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/space")
public class AsteroidController {

    @Autowired
    private NasaService nasaService;

    @Autowired
    private LigoService ligoService;

    @Autowired
    private AsteroidRepository asteroidRepository;

    @Autowired
    private LigoRepository ligoRepository;

    @GetMapping("/asteroids/fetch")
    public String fetchFromNasa() {
        nasaService.fetchAndSaveAsteroids();
        return "NASA Asteroid data synced to MySQL!";
    }

    @GetMapping("/asteroids/all")
    public List<Asteroid> getAllAsteroids() {
        return asteroidRepository.findAll();
    }

    @GetMapping("/ligo/fetch")
    public String fetchLigo() {
        ligoService.fetchAndSaveLigoEvents();
        return "LIGO Gravitational Wave data synced to MySQL!";
    }

    @GetMapping("/ligo/all")
    public List<LigoEvent> getAllLigo() {
        return ligoRepository.findAll();
    }
}