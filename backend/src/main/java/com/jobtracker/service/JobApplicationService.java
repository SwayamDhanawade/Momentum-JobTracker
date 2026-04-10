package com.jobtracker.service;

import com.jobtracker.dto.application.JobApplicationRequest;
import com.jobtracker.dto.application.JobApplicationResponse;
import com.jobtracker.dto.application.StatusUpdateRequest;
import com.jobtracker.entity.ApplicationStatus;
import com.jobtracker.entity.ApplicationStatusHistory;
import com.jobtracker.entity.Company;
import com.jobtracker.entity.JobApplication;
import com.jobtracker.entity.User;
import com.jobtracker.exception.ResourceNotFoundException;
import com.jobtracker.repository.ApplicationStatusHistoryRepository;
import com.jobtracker.repository.ApplicationStatusRepository;
import com.jobtracker.repository.CompanyRepository;
import com.jobtracker.repository.JobApplicationRepository;
import com.jobtracker.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class JobApplicationService {
    
    private final JobApplicationRepository jobApplicationRepository;
    private final UserRepository userRepository;
    private final CompanyRepository companyRepository;
    private final ApplicationStatusRepository applicationStatusRepository;
    private final ApplicationStatusHistoryRepository applicationStatusHistoryRepository;
    
    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ISO_LOCAL_DATE;
    
    @Transactional
    public JobApplicationResponse create(JobApplicationRequest request, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        
        Company company = companyRepository.findById(request.getCompanyId())
                .orElseThrow(() -> new ResourceNotFoundException("Company not found"));
        
        ApplicationStatus status;
        if (request.getStatusId() != null) {
            status = applicationStatusRepository.findById(request.getStatusId())
                    .orElseThrow(() -> new ResourceNotFoundException("Status not found"));
        } else {
            status = applicationStatusRepository.findByIsDefaultTrue()
                    .orElseThrow(() -> new ResourceNotFoundException("Default status not found"));
        }
        
        JobApplication application = JobApplication.builder()
                .position(request.getPosition())
                .location(request.getLocation())
                .jobUrl(request.getJobUrl())
                .salaryMin(request.getSalaryMin())
                .salaryMax(request.getSalaryMax())
                .employmentType(request.getEmploymentType())
                .notes(request.getNotes())
                .coverLetterUrl(request.getCoverLetterUrl())
                .appliedDate(request.getAppliedDate())
                .deadlineDate(request.getDeadlineDate())
                .offerDate(request.getOfferDate())
                .user(user)
                .company(company)
                .status(status)
                .build();
        
        JobApplication saved = jobApplicationRepository.save(application);
        
        createStatusHistory(saved, null, status, user);
        
        return mapToResponse(saved);
    }
    
    public JobApplicationResponse getById(Long id) {
        JobApplication application = jobApplicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job application not found"));
        return mapToResponse(application);
    }
    
    public List<JobApplicationResponse> getAllByUserId(Long userId) {
        return jobApplicationRepository.findByUserId(userId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }
    
    public List<JobApplicationResponse> getByUserIdAndStatus(Long userId, Long statusId) {
        return jobApplicationRepository.findByUserIdAndStatusId(userId, statusId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }
    
    @Transactional
    public JobApplicationResponse update(Long id, JobApplicationRequest request) {
        JobApplication application = jobApplicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job application not found"));
        
        application.setPosition(request.getPosition());
        application.setLocation(request.getLocation());
        application.setJobUrl(request.getJobUrl());
        application.setSalaryMin(request.getSalaryMin());
        application.setSalaryMax(request.getSalaryMax());
        application.setEmploymentType(request.getEmploymentType());
        application.setNotes(request.getNotes());
        application.setCoverLetterUrl(request.getCoverLetterUrl());
        application.setAppliedDate(request.getAppliedDate());
        application.setDeadlineDate(request.getDeadlineDate());
        application.setOfferDate(request.getOfferDate());
        
        if (request.getCompanyId() != null) {
            Company company = companyRepository.findById(request.getCompanyId())
                    .orElseThrow(() -> new ResourceNotFoundException("Company not found"));
            application.setCompany(company);
        }
        
        if (request.getStatusId() != null) {
            ApplicationStatus status = applicationStatusRepository.findById(request.getStatusId())
                    .orElseThrow(() -> new ResourceNotFoundException("Status not found"));
            application.setStatus(status);
        }
        
        JobApplication updated = jobApplicationRepository.save(application);
        return mapToResponse(updated);
    }
    
    @Transactional
    public JobApplicationResponse updateStatus(Long id, StatusUpdateRequest request, Long userId) {
        JobApplication application = jobApplicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job application not found"));
        
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        
        ApplicationStatus oldStatus = application.getStatus();
        ApplicationStatus newStatus = applicationStatusRepository.findById(request.getStatusId())
                .orElseThrow(() -> new ResourceNotFoundException("Status not found"));
        
        application.setStatus(newStatus);
        if (request.getNotes() != null) {
            application.setNotes(application.getNotes() + "\n" + request.getNotes());
        }
        
        JobApplication updated = jobApplicationRepository.save(application);
        
        createStatusHistory(updated, oldStatus, newStatus, user);
        
        return mapToResponse(updated);
    }
    
    private void createStatusHistory(JobApplication application, ApplicationStatus oldStatus, ApplicationStatus newStatus, User user) {
        ApplicationStatusHistory history = ApplicationStatusHistory.builder()
                .application(application)
                .oldStatus(oldStatus)
                .newStatus(newStatus)
                .changedBy(user)
                .build();
        
        applicationStatusHistoryRepository.save(history);
    }
    
    @Transactional
    public void delete(Long id) {
        if (!jobApplicationRepository.existsById(id)) {
            throw new ResourceNotFoundException("Job application not found");
        }
        jobApplicationRepository.deleteById(id);
    }
    
    private JobApplicationResponse mapToResponse(JobApplication application) {
        return JobApplicationResponse.builder()
                .id(application.getId())
                .position(application.getPosition())
                .location(application.getLocation())
                .jobUrl(application.getJobUrl())
                .salaryMin(application.getSalaryMin())
                .salaryMax(application.getSalaryMax())
                .employmentType(application.getEmploymentType())
                .notes(application.getNotes())
                .coverLetterUrl(application.getCoverLetterUrl())
                .userId(application.getUser().getId())
                .companyId(application.getCompany().getId())
                .companyName(application.getCompany().getName())
                .statusId(application.getStatus().getId())
                .statusName(application.getStatus().getName())
                .statusColor(application.getStatus().getColor())
                .appliedDate(application.getAppliedDate())
                .deadlineDate(application.getDeadlineDate())
                .offerDate(application.getOfferDate())
                .createdAt(application.getCreatedAt() != null ? application.getCreatedAt().format(DATE_FORMATTER) : null)
                .updatedAt(application.getUpdatedAt() != null ? application.getUpdatedAt().format(DATE_FORMATTER) : null)
                .build();
    }
}
