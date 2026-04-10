package com.jobtracker.dto.reminder;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class ReminderRequest {
    private Long applicationId;
    private Long interviewId;
    
    @NotBlank(message = "Title is required")
    private String title;
    
    private String description;
    
    @NotNull(message = "Date is required")
    private LocalDate date;
    
    private LocalTime time;
    
    @NotBlank(message = "Reminder type is required")
    private String reminderType;
    
    private Boolean isRecurring;
    private String recurringPattern;
}
