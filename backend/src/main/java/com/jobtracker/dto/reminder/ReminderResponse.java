package com.jobtracker.dto.reminder;

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
public class ReminderResponse {
    private Long id;
    private Long applicationId;
    private String applicationPosition;
    private Long interviewId;
    private String title;
    private String description;
    private LocalDate date;
    private LocalTime time;
    private String reminderType;
    private Boolean isCompleted;
    private Boolean isRecurring;
    private String recurringPattern;
    private Long userId;
    private String createdAt;
}
