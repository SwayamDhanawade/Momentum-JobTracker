import api from './api';
import type { ReminderRequest, ReminderResponse } from '../types';

export const reminderService = {
  getAll: async (): Promise<ReminderResponse[]> => {
    const response = await api.get<ReminderResponse[]>('/reminders');
    return response.data;
  },

  getById: async (id: number): Promise<ReminderResponse> => {
    const response = await api.get<ReminderResponse>(`/reminders/${id}`);
    return response.data;
  },

  getUpcoming: async (): Promise<ReminderResponse[]> => {
    const response = await api.get<ReminderResponse[]>('/reminders/upcoming');
    return response.data;
  },

  getPending: async (): Promise<ReminderResponse[]> => {
    const response = await api.get<ReminderResponse[]>('/reminders/pending');
    return response.data;
  },

  create: async (reminderData: ReminderRequest): Promise<ReminderResponse> => {
    const response = await api.post<ReminderResponse>('/reminders', reminderData);
    return response.data;
  },

  update: async (id: number, reminderData: ReminderRequest): Promise<ReminderResponse> => {
    const response = await api.put<ReminderResponse>(`/reminders/${id}`, reminderData);
    return response.data;
  },

  markCompleted: async (id: number): Promise<ReminderResponse> => {
    const response = await api.patch<ReminderResponse>(`/reminders/${id}/complete`);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/reminders/${id}`);
  },
};

export default reminderService;
