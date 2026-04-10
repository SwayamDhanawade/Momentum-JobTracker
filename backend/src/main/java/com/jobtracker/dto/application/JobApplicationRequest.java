package com.jobtracker.dto.application;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.time.LocalDate;

@Data
public class JobApplicationRequest {
    @NotBlank(message = "Position is required")
    private String position;
    
    private String location;
    private String jobUrl;
    private Double salaryMin;
    private Double salaryMax;
    private String employmentType;
    private String notes;
    private String coverLetterUrl;
    
    @NotNull(message = "Company ID is required")
    private Long companyId;
    
    private Long statusId;
    private LocalDate appliedDate;
    private LocalDate deadlineDate;
    private LocalDate offerDate;
}
