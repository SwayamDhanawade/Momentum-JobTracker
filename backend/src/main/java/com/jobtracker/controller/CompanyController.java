package com.jobtracker.controller;

import com.jobtracker.dto.company.CompanyRequest;
import com.jobtracker.dto.company.CompanyResponse;
import com.jobtracker.service.CompanyService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/companies")
@RequiredArgsConstructor
public class CompanyController {
    
    private final CompanyService companyService;
    
    @PostMapping
    public ResponseEntity<CompanyResponse> create(
            @Valid @RequestBody CompanyRequest request,
            @RequestHeader("X-User-Id") Long userId) {
        return ResponseEntity.ok(companyService.create(request, userId));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<CompanyResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(companyService.getById(id));
    }
    
    @GetMapping
    public ResponseEntity<List<CompanyResponse>> getAll(@RequestHeader("X-User-Id") Long userId) {
        return ResponseEntity.ok(companyService.getAllByUserId(userId));
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<CompanyResponse>> search(@RequestParam String name) {
        return ResponseEntity.ok(companyService.search(name));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<CompanyResponse> update(
            @PathVariable Long id,
            @Valid @RequestBody CompanyRequest request) {
        return ResponseEntity.ok(companyService.update(id, request));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        companyService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
