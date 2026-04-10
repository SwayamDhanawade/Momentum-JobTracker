package com.jobtracker.controller;

import com.jobtracker.dto.dashboard.DashboardResponse;
import com.jobtracker.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {
    
    private final DashboardService dashboardService;
    
    @GetMapping
    public ResponseEntity<DashboardResponse> getDashboard(@RequestHeader("X-User-Id") Long userId) {
        return ResponseEntity.ok(dashboardService.getDashboard(userId));
    }
}
