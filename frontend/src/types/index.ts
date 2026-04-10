export * from './auth';
export * from './application';
export * from './company';
export * from './interview';
export * from './reminder';
export * from './dashboard';

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  resumeUrl?: string;
  skills?: string;
  enabled: boolean;
}
