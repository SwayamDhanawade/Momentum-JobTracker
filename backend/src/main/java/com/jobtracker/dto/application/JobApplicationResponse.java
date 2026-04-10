package com.jobtracker.dto.application;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JobApplicationResponse {
    private Long id;
    private String position;
    private String location;
    private String jobUrl;
    private Double salaryMin;
    private Double salaryMax;
    private String employmentType;
    private String notes;
    private String coverLetterUrl;
    private Long userId;
    private Long companyId;
    private String companyName;
    private Long statusId;
    private String statusName;
    private String statusColor;
    private LocalDate appliedDate;
    private LocalDate deadlineDate;
    private LocalDate offerDate;
    private String createdAt;
    private String updatedAt;
}
