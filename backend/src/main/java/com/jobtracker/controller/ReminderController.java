package com.jobtracker.controller;

import com.jobtracker.dto.reminder.ReminderRequest;
import com.jobtracker.dto.reminder.ReminderResponse;
import com.jobtracker.service.ReminderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/reminders")
@RequiredArgsConstructor
public class ReminderController {
    
    private final ReminderService reminderService;
    
    @PostMapping
    public ResponseEntity<ReminderResponse> create(
            @Valid @RequestBody ReminderRequest request,
            @RequestHeader("X-User-Id") Long userId) {
        return ResponseEntity.ok(reminderService.create(request, userId));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ReminderResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(reminderService.getById(id));
    }
    
    @GetMapping
    public ResponseEntity<List<ReminderResponse>> getAll(@RequestHeader("X-User-Id") Long userId) {
        return ResponseEntity.ok(reminderService.getAllByUserId(userId));
    }
    
    @GetMapping("/upcoming")
    public ResponseEntity<List<ReminderResponse>> getUpcoming(@RequestHeader("X-User-Id") Long userId) {
        return ResponseEntity.ok(reminderService.getUpcoming(userId));
    }
    
    @GetMapping("/pending")
    public ResponseEntity<List<ReminderResponse>> getPending(@RequestHeader("X-User-Id") Long userId) {
        return ResponseEntity.ok(reminderService.getPending(userId));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<ReminderResponse> update(
            @PathVariable Long id,
            @Valid @RequestBody ReminderRequest request) {
        return ResponseEntity.ok(reminderService.update(id, request));
    }
    
    @PatchMapping("/{id}/complete")
    public ResponseEntity<ReminderResponse> markCompleted(@PathVariable Long id) {
        return ResponseEntity.ok(reminderService.markCompleted(id));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        reminderService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
