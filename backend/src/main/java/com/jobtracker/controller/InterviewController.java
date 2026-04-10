package com.jobtracker.controller;

import com.jobtracker.dto.interview.InterviewRequest;
import com.jobtracker.dto.interview.InterviewResponse;
import com.jobtracker.service.InterviewService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/interviews")
@RequiredArgsConstructor
public class InterviewController {
    
    private final InterviewService interviewService;
    
    @PostMapping
    public ResponseEntity<InterviewResponse> create(
            @Valid @RequestBody InterviewRequest request,
            @RequestHeader("X-User-Id") Long userId) {
        return ResponseEntity.ok(interviewService.create(request, userId));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<InterviewResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(interviewService.getById(id));
    }
    
    @GetMapping
    public ResponseEntity<List<InterviewResponse>> getAll(@RequestHeader("X-User-Id") Long userId) {
        return ResponseEntity.ok(interviewService.getAllByUserId(userId));
    }
    
    @GetMapping("/application/{applicationId}")
    public ResponseEntity<List<InterviewResponse>> getByApplication(@PathVariable Long applicationId) {
        return ResponseEntity.ok(interviewService.getByApplicationId(applicationId));
    }
    
    @GetMapping("/upcoming")
    public ResponseEntity<List<InterviewResponse>> getUpcoming(@RequestHeader("X-User-Id") Long userId) {
        return ResponseEntity.ok(interviewService.getUpcoming(userId));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<InterviewResponse> update(
            @PathVariable Long id,
            @Valid @RequestBody InterviewRequest request) {
        return ResponseEntity.ok(interviewService.update(id, request));
    }
    
    @PatchMapping("/{id}/feedback")
    public ResponseEntity<InterviewResponse> addFeedback(
            @PathVariable Long id,
            @RequestParam String feedback,
            @RequestParam(required = false) Integer rating) {
        return ResponseEntity.ok(interviewService.addFeedback(id, feedback, rating));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        interviewService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
