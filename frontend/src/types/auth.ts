export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export interface AuthResponse {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  token: string;
  type: string;
}
