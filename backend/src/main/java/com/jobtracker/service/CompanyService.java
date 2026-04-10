package com.jobtracker.service;

import com.jobtracker.dto.company.CompanyRequest;
import com.jobtracker.dto.company.CompanyResponse;
import com.jobtracker.entity.Company;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CompanyService {
    
    public CompanyResponse create(CompanyRequest request, Long userId) {
        // TODO: Implement create company
        return null;
    }
    
    public CompanyResponse getById(Long id) {
        // TODO: Implement get company by ID
        return null;
    }
    
    public List<CompanyResponse> getAllByUserId(Long userId) {
        // TODO: Implement get all companies for user
        return null;
    }
    
    public List<CompanyResponse> search(String name) {
        // TODO: Implement search companies
        return null;
    }
    
    public CompanyResponse update(Long id, CompanyRequest request) {
        // TODO: Implement update company
        return null;
    }
    
    public void delete(Long id) {
        // TODO: Implement delete company
    }
}
