package com.example.backend.repository;

import com.example.backend.model.LigoEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LigoRepository extends JpaRepository<LigoEvent, String> {
}