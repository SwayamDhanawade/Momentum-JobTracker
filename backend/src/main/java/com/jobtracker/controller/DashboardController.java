package com.jobtracker.controller;

import com.jobtracker.dto.dashboard.DashboardResponse;
import com.jobtracker.security.SecurityUtils;
import com.jobtracker.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {
    
    private final DashboardService dashboardService;
    private final SecurityUtils securityUtils;
    
    @GetMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<DashboardResponse> getDashboard() {
        Long userId = securityUtils.getCurrentUserId();
        return ResponseEntity.ok(dashboardService.getDashboard(userId));
    }
}
