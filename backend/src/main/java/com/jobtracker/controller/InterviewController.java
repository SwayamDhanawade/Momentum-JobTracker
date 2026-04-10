package com.jobtracker.controller;

import com.jobtracker.dto.interview.InterviewRequest;
import com.jobtracker.dto.interview.InterviewResponse;
import com.jobtracker.security.SecurityUtils;
import com.jobtracker.service.InterviewService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/interviews")
@RequiredArgsConstructor
public class InterviewController {
    
    private final InterviewService interviewService;
    private final SecurityUtils securityUtils;
    
    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<InterviewResponse> create(@Valid @RequestBody InterviewRequest request) {
        Long userId = securityUtils.getCurrentUserId();
        return ResponseEntity.ok(interviewService.create(request, userId));
    }
    
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<InterviewResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(interviewService.getById(id));
    }
    
    @GetMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<InterviewResponse>> getAll() {
        Long userId = securityUtils.getCurrentUserId();
        return ResponseEntity.ok(interviewService.getAllByUserId(userId));
    }
    
    @GetMapping("/application/{applicationId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<InterviewResponse>> getByApplication(@PathVariable Long applicationId) {
        return ResponseEntity.ok(interviewService.getByApplicationId(applicationId));
    }
    
    @GetMapping("/upcoming")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<InterviewResponse>> getUpcoming() {
        Long userId = securityUtils.getCurrentUserId();
        return ResponseEntity.ok(interviewService.getUpcoming(userId));
    }
    
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<InterviewResponse> update(
            @PathVariable Long id,
            @Valid @RequestBody InterviewRequest request) {
        return ResponseEntity.ok(interviewService.update(id, request));
    }
    
    @PatchMapping("/{id}/feedback")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<InterviewResponse> addFeedback(
            @PathVariable Long id,
            @RequestParam String feedback,
            @RequestParam(required = false) Integer rating) {
        return ResponseEntity.ok(interviewService.addFeedback(id, feedback, rating));
    }
    
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        interviewService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
