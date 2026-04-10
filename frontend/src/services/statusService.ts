import api from './api';
import type { ApplicationStatusOption } from '../types';

export const statusService = {
  getAll: async (): Promise<ApplicationStatusOption[]> => {
    const response = await api.get<ApplicationStatusOption[]>('/statuses');
    return response.data;
  },
};

export default statusService;
