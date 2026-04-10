import api from './api';
import type { CompanyRequest, CompanyResponse } from '../types';

export const companyService = {
  getAll: async (): Promise<CompanyResponse[]> => {
    const response = await api.get<CompanyResponse[]>('/companies');
    return response.data;
  },

  getById: async (id: number): Promise<CompanyResponse> => {
    const response = await api.get<CompanyResponse>(`/companies/${id}`);
    return response.data;
  },

  search: async (name: string): Promise<CompanyResponse[]> => {
    const response = await api.get<CompanyResponse[]>('/companies/search', { params: { name } });
    return response.data;
  },

  create: async (companyData: CompanyRequest): Promise<CompanyResponse> => {
    const response = await api.post<CompanyResponse>('/companies', companyData);
    return response.data;
  },

  update: async (id: number, companyData: CompanyRequest): Promise<CompanyResponse> => {
    const response = await api.put<CompanyResponse>(`/companies/${id}`, companyData);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/companies/${id}`);
  },
};

export default companyService;
