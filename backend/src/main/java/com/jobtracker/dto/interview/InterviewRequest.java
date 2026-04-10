package com.jobtracker.dto.interview;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class InterviewRequest {
    @NotNull(message = "Application ID is required")
    private Long applicationId;
    
    @NotBlank(message = "Interview type is required")
    private String type;
    
    @NotNull(message = "Date is required")
    private LocalDate date;
    
    @NotNull(message = "Time is required")
    private LocalTime time;
    
    private LocalTime endTime;
    private String location;
    private String meetingLink;
    private String interviewerName;
    private String interviewerEmail;
    private String interviewerPhone;
    private String notes;
    private String questions;
}
