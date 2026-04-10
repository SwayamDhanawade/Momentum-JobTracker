package com.jobtracker.service;

import com.jobtracker.dto.application.JobApplicationResponse;
import com.jobtracker.dto.dashboard.DashboardResponse;
import com.jobtracker.entity.Interview;
import com.jobtracker.entity.JobApplication;
import com.jobtracker.entity.Reminder;
import com.jobtracker.repository.InterviewRepository;
import com.jobtracker.repository.JobApplicationRepository;
import com.jobtracker.repository.ReminderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DashboardService {
    
    private final JobApplicationRepository jobApplicationRepository;
    private final InterviewRepository interviewRepository;
    private final ReminderRepository reminderRepository;
    
    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ISO_LOCAL_DATE;
    
    public DashboardResponse getDashboard(Long userId) {
        long totalApplications = jobApplicationRepository.countByUserId(userId);
        
        LocalDate monthStart = LocalDate.now().withDayOfMonth(1);
        LocalDate monthEnd = LocalDate.now();
        LocalDate weekStart = LocalDate.now();
        LocalDate weekEnd = LocalDate.now().plusDays(7);
        
        List<JobApplication> monthApps = jobApplicationRepository
                .findByUserIdAndAppliedDateBetweenOrderByAppliedDateDesc(userId, monthStart, monthEnd);
        long applicationsThisMonth = monthApps.size();
        
        List<Interview> upcomingInterviews = interviewRepository
                .findByUserIdAndDateBetweenOrderByDateAsc(userId, weekStart, weekEnd);
        long interviewsThisWeek = upcomingInterviews.size();
        
        List<Reminder> pendingReminders = reminderRepository
                .findByUserIdAndIsCompletedFalseAndDateBefore(userId, LocalDate.now().plusDays(1));
        long pendingRemindersCount = pendingReminders.size();
        
        Map<String, Long> applicationsByStatus = getStatusCounts(userId);
        
        List<JobApplication> recentApps = jobApplicationRepository
                .findByUserIdOrderByCreatedAtDesc(userId, PageRequest.of(0, 5));
        
        List<DashboardResponse.RecentActivity> recentActivity = recentApps.stream()
                .map(app -> DashboardResponse.RecentActivity.builder()
                        .type("APPLICATION")
                        .description(app.getPosition() + " at " + app.getCompany().getName())
                        .timestamp(app.getCreatedAt() != null ? app.getCreatedAt().format(DATE_FORMATTER) : "")
                        .build())
                .collect(Collectors.toList());
        
        List<DashboardResponse.UpcomingInterview> upcomingInterviewsList = upcomingInterviews.stream()
                .limit(5)
                .map(interview -> {
                    String position = "Unknown";
                    String companyName = "Unknown";
                    if (interview.getApplication() != null) {
                        position = interview.getApplication().getPosition();
                        if (interview.getApplication().getCompany() != null) {
                            companyName = interview.getApplication().getCompany().getName();
                        }
                    }
                    return DashboardResponse.UpcomingInterview.builder()
                            .id(interview.getId())
                            .position(position)
                            .companyName(companyName)
                            .date(interview.getDate() != null ? interview.getDate().format(DATE_FORMATTER) : "")
                            .time(interview.getTime() != null ? interview.getTime().toString() : "")
                            .build();
                })
                .collect(Collectors.toList());
        
        List<DashboardResponse.UpcomingReminder> upcomingRemindersList = pendingReminders.stream()
                .limit(5)
                .map(reminder -> DashboardResponse.UpcomingReminder.builder()
                        .id(reminder.getId())
                        .title(reminder.getTitle())
                        .date(reminder.getDate() != null ? reminder.getDate().format(DATE_FORMATTER) : "")
                        .time(reminder.getTime() != null ? reminder.getTime().toString() : null)
                        .build())
                .collect(Collectors.toList());
        
        return DashboardResponse.builder()
                .totalApplications(totalApplications)
                .applicationsThisMonth(applicationsThisMonth)
                .interviewsThisWeek(interviewsThisWeek)
                .pendingReminders(pendingRemindersCount)
                .applicationsByStatus(applicationsByStatus)
                .recentActivity(recentActivity)
                .upcomingInterviews(upcomingInterviewsList)
                .upcomingReminders(upcomingRemindersList)
                .build();
    }
    
    public List<JobApplicationResponse> getRecentApplications(Long userId) {
        return jobApplicationRepository
                .findByUserIdOrderByCreatedAtDesc(userId, PageRequest.of(0, 5))
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }
    
    public Map<String, Long> getStatusCounts(Long userId) {
        List<Object[]> results = jobApplicationRepository.countByStatusForUser(userId);
        Map<String, Long> statusCounts = new LinkedHashMap<>();
        
        for (Object[] result : results) {
            String statusName = (String) result[0];
            Long count = (Long) result[1];
            statusCounts.put(statusName, count);
        }
        
        return statusCounts;
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
