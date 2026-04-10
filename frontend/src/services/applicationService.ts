import api from './api';
import type { JobApplicationRequest, JobApplicationResponse, StatusUpdateRequest } from '../types';

export const applicationService = {
  getAll: async (): Promise<JobApplicationResponse[]> => {
    const response = await api.get<JobApplicationResponse[]>('/applications');
    return response.data;
  },

  getById: async (id: number): Promise<JobApplicationResponse> => {
    const response = await api.get<JobApplicationResponse>(`/applications/${id}`);
    return response.data;
  },

  getByStatus: async (statusId: number): Promise<JobApplicationResponse[]> => {
    const response = await api.get<JobApplicationResponse[]>(`/applications/status/${statusId}`);
    return response.data;
  },

  create: async (applicationData: JobApplicationRequest): Promise<JobApplicationResponse> => {
    const response = await api.post<JobApplicationResponse>('/applications', applicationData);
    return response.data;
  },

  update: async (id: number, applicationData: JobApplicationRequest): Promise<JobApplicationResponse> => {
    const response = await api.put<JobApplicationResponse>(`/applications/${id}`, applicationData);
    return response.data;
  },

  updateStatus: async (id: number, statusId: number, notes?: string): Promise<JobApplicationResponse> => {
    const request: StatusUpdateRequest = { statusId, notes };
    const response = await api.patch<JobApplicationResponse>(`/applications/${id}/status`, request);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/applications/${id}`);
  },
};

export default applicationService;
