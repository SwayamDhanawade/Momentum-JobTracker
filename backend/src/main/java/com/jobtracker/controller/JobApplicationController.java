package com.jobtracker.controller;

import com.jobtracker.dto.application.JobApplicationRequest;
import com.jobtracker.dto.application.JobApplicationResponse;
import com.jobtracker.dto.application.StatusUpdateRequest;
import com.jobtracker.security.SecurityUtils;
import com.jobtracker.service.JobApplicationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
@RequiredArgsConstructor
public class JobApplicationController {
    
    private final JobApplicationService jobApplicationService;
    private final SecurityUtils securityUtils;
    
    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<JobApplicationResponse> create(
            @Valid @RequestBody JobApplicationRequest request) {
        Long userId = securityUtils.getCurrentUserId();
        return ResponseEntity.ok(jobApplicationService.create(request, userId));
    }
    
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<JobApplicationResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(jobApplicationService.getById(id));
    }
    
    @GetMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<JobApplicationResponse>> getAll() {
        Long userId = securityUtils.getCurrentUserId();
        return ResponseEntity.ok(jobApplicationService.getAllByUserId(userId));
    }
    
    @GetMapping("/status/{statusId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<JobApplicationResponse>> getByStatus(@PathVariable Long statusId) {
        Long userId = securityUtils.getCurrentUserId();
        return ResponseEntity.ok(jobApplicationService.getByUserIdAndStatus(userId, statusId));
    }
    
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<JobApplicationResponse> update(
            @PathVariable Long id,
            @Valid @RequestBody JobApplicationRequest request) {
        return ResponseEntity.ok(jobApplicationService.update(id, request));
    }
    
    @PatchMapping("/{id}/status")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<JobApplicationResponse> updateStatus(
            @PathVariable Long id,
            @RequestBody StatusUpdateRequest request) {
        Long userId = securityUtils.getCurrentUserId();
        return ResponseEntity.ok(jobApplicationService.updateStatus(id, request, userId));
    }
    
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        jobApplicationService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
