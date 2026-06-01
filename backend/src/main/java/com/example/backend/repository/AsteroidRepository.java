package com.example.backend.repository;

import com.example.backend.model.Asteroid;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AsteroidRepository extends JpaRepository<Asteroid, String> {
}