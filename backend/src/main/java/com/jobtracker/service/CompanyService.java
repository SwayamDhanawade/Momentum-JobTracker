package com.jobtracker.service;

import com.jobtracker.dto.company.CompanyRequest;
import com.jobtracker.dto.company.CompanyResponse;
import com.jobtracker.entity.Company;
import com.jobtracker.entity.User;
import com.jobtracker.exception.ResourceNotFoundException;
import com.jobtracker.repository.CompanyRepository;
import com.jobtracker.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CompanyService {
    
    private final CompanyRepository companyRepository;
    private final UserRepository userRepository;
    
    @Transactional
    public CompanyResponse create(CompanyRequest request, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        
        Company company = Company.builder()
                .name(request.getName())
                .description(request.getDescription())
                .website(request.getWebsite())
                .industry(request.getIndustry())
                .location(request.getLocation())
                .logoUrl(request.getLogoUrl())
                .careersPageUrl(request.getCareersPageUrl())
                .createdBy(user)
                .build();
        
        Company saved = companyRepository.save(company);
        return mapToResponse(saved);
    }
    
    public CompanyResponse getById(Long id) {
        Company company = companyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Company not found"));
        return mapToResponse(company);
    }
    
    public List<CompanyResponse> getAllByUserId(Long userId) {
        return companyRepository.findByCreatedById(userId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }
    
    public List<CompanyResponse> search(String name) {
        return companyRepository.findByNameContainingIgnoreCase(name)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }
    
    @Transactional
    public CompanyResponse update(Long id, CompanyRequest request) {
        Company company = companyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Company not found"));
        
        company.setName(request.getName());
        company.setDescription(request.getDescription());
        company.setWebsite(request.getWebsite());
        company.setIndustry(request.getIndustry());
        company.setLocation(request.getLocation());
        company.setLogoUrl(request.getLogoUrl());
        company.setCareersPageUrl(request.getCareersPageUrl());
        
        Company updated = companyRepository.save(company);
        return mapToResponse(updated);
    }
    
    @Transactional
    public void delete(Long id) {
        if (!companyRepository.existsById(id)) {
            throw new ResourceNotFoundException("Company not found");
        }
        companyRepository.deleteById(id);
    }
    
    private CompanyResponse mapToResponse(Company company) {
        return CompanyResponse.builder()
                .id(company.getId())
                .name(company.getName())
                .description(company.getDescription())
                .website(company.getWebsite())
                .industry(company.getIndustry())
                .location(company.getLocation())
                .logoUrl(company.getLogoUrl())
                .careersPageUrl(company.getCareersPageUrl())
                .userId(company.getCreatedBy() != null ? company.getCreatedBy().getId() : null)
                .createdById(company.getCreatedBy() != null ? company.getCreatedBy().getId() : null)
                .createdAt(company.getCreatedAt() != null ? company.getCreatedAt().toString() : null)
                .build();
    }
}
