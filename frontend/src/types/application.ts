export interface JobApplicationRequest {
  position: string;
  location?: string;
  jobUrl?: string;
  salaryMin?: number;
  salaryMax?: number;
  employmentType?: string;
  notes?: string;
  coverLetterUrl?: string;
  companyId: number;
  statusId?: number;
  appliedDate?: string;
  deadlineDate?: string;
  offerDate?: string;
}

export interface JobApplicationResponse {
  id: number;
  position: string;
  location?: string;
  jobUrl?: string;
  salaryMin?: number;
  salaryMax?: number;
  employmentType?: string;
  notes?: string;
  coverLetterUrl?: string;
  userId: number;
  companyId: number;
  companyName: string;
  statusId: number;
  statusName: string;
  statusColor?: string;
  appliedDate?: string;
  deadlineDate?: string;
  offerDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface StatusUpdateRequest {
  statusId: number;
  notes?: string;
}
