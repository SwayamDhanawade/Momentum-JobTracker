package com.jobtracker.dto.dashboard;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardResponse {
    private long totalApplications;
    private long applicationsThisMonth;
    private long interviewsThisWeek;
    private long pendingReminders;
    private Map<String, Long> applicationsByStatus;
    private List<RecentActivity> recentActivity;
    private List<UpcomingInterview> upcomingInterviews;
    private List<UpcomingReminder> upcomingReminders;
    
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class RecentActivity {
        private String type;
        private String description;
        private String timestamp;
    }
    
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UpcomingInterview {
        private Long id;
        private String position;
        private String companyName;
        private String date;
        private String time;
    }
    
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UpcomingReminder {
        private Long id;
        private String title;
        private String date;
        private String time;
    }
}
