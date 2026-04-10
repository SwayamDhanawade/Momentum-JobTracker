package com.jobtracker.controller;

import com.jobtracker.entity.ApplicationStatus;
import com.jobtracker.repository.ApplicationStatusRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/statuses")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
@RequiredArgsConstructor
public class ApplicationStatusController {
    
    private final ApplicationStatusRepository applicationStatusRepository;
    
    @GetMapping
    public ResponseEntity<List<ApplicationStatus>> getAllStatuses() {
        return ResponseEntity.ok(applicationStatusRepository.findAll());
    }
}
