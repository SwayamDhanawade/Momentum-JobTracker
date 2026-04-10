export interface CompanyRequest {
  name: string;
  description?: string;
  website?: string;
  industry?: string;
  location?: string;
  logoUrl?: string;
  careersPageUrl?: string;
}

export interface CompanyResponse {
  id: number;
  name: string;
  description?: string;
  website?: string;
  industry?: string;
  location?: string;
  logoUrl?: string;
  careersPageUrl?: string;
  createdById?: number;
  createdAt?: string;
}
