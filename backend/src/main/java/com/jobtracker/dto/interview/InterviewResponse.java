package com.jobtracker.dto.interview;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InterviewResponse {
    private Long id;
    private Long applicationId;
    private String position;
    private String companyName;
    private String type;
    private LocalDate date;
    private LocalTime time;
    private LocalTime endTime;
    private String location;
    private String meetingLink;
    private String interviewerName;
    private String interviewerEmail;
    private String interviewerPhone;
    private String notes;
    private String questions;
    private String feedback;
    private Integer rating;
    private Long userId;
    private String createdAt;
}
