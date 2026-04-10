export interface DashboardResponse {
  totalApplications: number;
  applicationsThisMonth: number;
  interviewsThisWeek: number;
  pendingReminders: number;
  applicationsByStatus?: Record<string, number>;
  recentActivity?: RecentActivity[];
  upcomingInterviews?: UpcomingInterview[];
  upcomingReminders?: UpcomingReminder[];
}

export interface RecentActivity {
  type: string;
  description: string;
  timestamp: string;
}

export interface UpcomingInterview {
  id: number;
  position: string;
  companyName: string;
  date: string;
  time: string;
}

export interface UpcomingReminder {
  id: number;
  title: string;
  date: string;
  time?: string;
}

export interface DashboardStats {
  totalApplications: number;
  applicationsThisMonth: number;
  interviewsThisWeek: number;
  pendingReminders: number;
  statusCounts: Record<string, number>;
}
