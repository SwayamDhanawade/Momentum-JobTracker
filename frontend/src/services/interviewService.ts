import api from './api';
import type { InterviewRequest, InterviewResponse } from '../types';

export const interviewService = {
  getAll: async (): Promise<InterviewResponse[]> => {
    const response = await api.get<InterviewResponse[]>('/interviews');
    return response.data;
  },

  getById: async (id: number): Promise<InterviewResponse> => {
    const response = await api.get<InterviewResponse>(`/interviews/${id}`);
    return response.data;
  },

  getByApplication: async (applicationId: number): Promise<InterviewResponse[]> => {
    const response = await api.get<InterviewResponse[]>(`/interviews/application/${applicationId}`);
    return response.data;
  },

  getUpcoming: async (): Promise<InterviewResponse[]> => {
    const response = await api.get<InterviewResponse[]>('/interviews/upcoming');
    return response.data;
  },

  create: async (interviewData: InterviewRequest): Promise<InterviewResponse> => {
    const response = await api.post<InterviewResponse>('/interviews', interviewData);
    return response.data;
  },

  update: async (id: number, interviewData: InterviewRequest): Promise<InterviewResponse> => {
    const response = await api.put<InterviewResponse>(`/interviews/${id}`, interviewData);
    return response.data;
  },

  addFeedback: async (id: number, feedback: string, rating?: number): Promise<InterviewResponse> => {
    const response = await api.patch<InterviewResponse>(`/interviews/${id}/feedback`, null, {
      params: { feedback, rating },
    });
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/interviews/${id}`);
  },
};

export default interviewService;
