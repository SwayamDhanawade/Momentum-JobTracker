export interface ReminderRequest {
  applicationId?: number;
  interviewId?: number;
  title: string;
  description?: string;
  date: string;
  time?: string;
  reminderType: string;
  isRecurring?: boolean;
  recurringPattern?: string;
}

export interface ReminderResponse {
  id: number;
  applicationId?: number;
  applicationPosition?: string;
  interviewId?: number;
  title: string;
  description?: string;
  date: string;
  time?: string;
  reminderType: string;
  isCompleted: boolean;
  isRecurring?: boolean;
  recurringPattern?: string;
  userId: number;
  createdAt?: string;
}
