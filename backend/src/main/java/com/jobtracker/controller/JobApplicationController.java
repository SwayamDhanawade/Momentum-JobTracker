package com.jobtracker.controller;

import com.jobtracker.dto.application.JobApplicationRequest;
import com.jobtracker.dto.application.JobApplicationResponse;
import com.jobtracker.dto.application.StatusUpdateRequest;
import com.jobtracker.service.JobApplicationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
@RequiredArgsConstructor
public class JobApplicationController {
    
    private final JobApplicationService jobApplicationService;
    
    @PostMapping
    public ResponseEntity<JobApplicationResponse> create(
            @Valid @RequestBody JobApplicationRequest request,
            @RequestHeader("X-User-Id") Long userId) {
        return ResponseEntity.ok(jobApplicationService.create(request, userId));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<JobApplicationResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(jobApplicationService.getById(id));
    }
    
    @GetMapping
    public ResponseEntity<List<JobApplicationResponse>> getAll(@RequestHeader("X-User-Id") Long userId) {
        return ResponseEntity.ok(jobApplicationService.getAllByUserId(userId));
    }
    
    @GetMapping("/status/{statusId}")
    public ResponseEntity<List<JobApplicationResponse>> getByStatus(
            @PathVariable Long statusId,
            @RequestHeader("X-User-Id") Long userId) {
        return ResponseEntity.ok(jobApplicationService.getByUserIdAndStatus(userId, statusId));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<JobApplicationResponse> update(
            @PathVariable Long id,
            @Valid @RequestBody JobApplicationRequest request) {
        return ResponseEntity.ok(jobApplicationService.update(id, request));
    }
    
    @PatchMapping("/{id}/status")
    public ResponseEntity<JobApplicationResponse> updateStatus(
            @PathVariable Long id,
            @RequestBody StatusUpdateRequest request,
            @RequestHeader("X-User-Id") Long userId) {
        return ResponseEntity.ok(jobApplicationService.updateStatus(id, request, userId));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        jobApplicationService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
