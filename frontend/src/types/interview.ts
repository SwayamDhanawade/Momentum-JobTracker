export interface InterviewRequest {
  applicationId: number;
  type: string;
  date: string;
  time: string;
  endTime?: string;
  location?: string;
  meetingLink?: string;
  interviewerName?: string;
  interviewerEmail?: string;
  interviewerPhone?: string;
  notes?: string;
  questions?: string;
}

export interface InterviewResponse {
  id: number;
  applicationId: number;
  position?: string;
  companyName?: string;
  type: string;
  date: string;
  time: string;
  endTime?: string;
  location?: string;
  meetingLink?: string;
  interviewerName?: string;
  interviewerEmail?: string;
  interviewerPhone?: string;
  notes?: string;
  questions?: string;
  feedback?: string;
  rating?: number;
  userId: number;
  createdAt?: string;
}
