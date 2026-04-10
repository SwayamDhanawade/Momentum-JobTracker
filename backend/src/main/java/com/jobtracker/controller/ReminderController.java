package com.jobtracker.controller;

import com.jobtracker.dto.reminder.ReminderRequest;
import com.jobtracker.dto.reminder.ReminderResponse;
import com.jobtracker.security.SecurityUtils;
import com.jobtracker.service.ReminderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/reminders")
@RequiredArgsConstructor
public class ReminderController {
    
    private final ReminderService reminderService;
    private final SecurityUtils securityUtils;
    
    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<ReminderResponse> create(@Valid @RequestBody ReminderRequest request) {
        Long userId = securityUtils.getCurrentUserId();
        return ResponseEntity.ok(reminderService.create(request, userId));
    }
    
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<ReminderResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(reminderService.getById(id));
    }
    
    @GetMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<ReminderResponse>> getAll() {
        Long userId = securityUtils.getCurrentUserId();
        return ResponseEntity.ok(reminderService.getAllByUserId(userId));
    }
    
    @GetMapping("/upcoming")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<ReminderResponse>> getUpcoming() {
        Long userId = securityUtils.getCurrentUserId();
        return ResponseEntity.ok(reminderService.getUpcoming(userId));
    }
    
    @GetMapping("/pending")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<ReminderResponse>> getPending() {
        Long userId = securityUtils.getCurrentUserId();
        return ResponseEntity.ok(reminderService.getPending(userId));
    }
    
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<ReminderResponse> update(
            @PathVariable Long id,
            @Valid @RequestBody ReminderRequest request) {
        return ResponseEntity.ok(reminderService.update(id, request));
    }
    
    @PatchMapping("/{id}/complete")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<ReminderResponse> markCompleted(@PathVariable Long id) {
        return ResponseEntity.ok(reminderService.markCompleted(id));
    }
    
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        reminderService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
