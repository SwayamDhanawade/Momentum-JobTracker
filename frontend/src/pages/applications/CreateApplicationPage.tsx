import { useState, useEffect, type FormEvent, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import applicationService from '../../services/applicationService';
import companyService from '../../services/companyService';
import statusService from '../../services/statusService';
import type { JobApplicationRequest, CompanyResponse, ApplicationStatusOption } from '../../types';
import './ApplicationsPage.css';

interface ErrorResponse {
  message?: string;
  errors?: Record<string, string>;
}

function CreateApplicationPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<JobApplicationRequest>({
    position: '',
    location: '',
    jobUrl: '',
    salaryMin: undefined,
    salaryMax: undefined,
    employmentType: '',
    notes: '',
    coverLetterUrl: '',
    companyId: 0,
    statusId: undefined,
    appliedDate: undefined,
    deadlineDate: undefined,
  });
  const [companyName, setCompanyName] = useState('');
  const [companies, setCompanies] = useState<CompanyResponse[]>([]);
  const [statuses, setStatuses] = useState<ApplicationStatusOption[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStatuses();
  }, []);

  const fetchStatuses = async () => {
    try {
      const data = await statusService.getAll();
      setStatuses(data);
    } catch (err) {
      console.error('Error fetching statuses:', err);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ 
      ...prev, 
      [name]: name === 'salaryMin' || name === 'salaryMax' || name === 'companyId' || name === 'statusId'
        ? (value ? Number(value) : undefined) 
        : value 
    }));
  };

  const searchCompanies = async (query: string) => {
    if (query.length >= 2) {
      const results = await companyService.search(query);
      setCompanies(results);
    } else {
      setCompanies([]);
    }
  };

  const selectCompany = (company: CompanyResponse) => {
    setFormData((prev) => ({ ...prev, companyId: company.id }));
    setCompanies([]);
    setCompanyName(company.name);
  };

  const createCompanyAndApplication = async () => {
    setSaving(true);
    setError(null);
    try {
      const newCompany = await companyService.create({ name: companyName });
      const applicationData = { ...formData, companyId: newCompany.id };
      await applicationService.create(applicationData);
      navigate('/applications');
    } catch (err) {
      const axiosError = err as AxiosError<ErrorResponse>;
      const errorMsg = axiosError.response?.data?.message || 
                       axiosError.response?.data?.errors?.position ||
                       axiosError.response?.data?.errors?.companyId ||
                       'Failed to create application';
      setError(errorMsg);
      console.error('Error creating application:', axiosError.response?.data);
    } finally {
      setSaving(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!formData.position?.trim()) {
      setError('Position is required');
      return;
    }
    
    if (!companyName.trim()) {
      setError('Company name is required');
      return;
    }
    
    if (formData.companyId) {
      setSaving(true);
      setError(null);
      try {
        await applicationService.create(formData);
        navigate('/applications');
      } catch (err) {
        const axiosError = err as AxiosError<ErrorResponse>;
        const errorMsg = axiosError.response?.data?.message || 
                         axiosError.response?.data?.errors?.position ||
                         axiosError.response?.data?.errors?.companyId ||
                         'Failed to create application';
        setError(errorMsg);
        console.error('Error creating application:', axiosError.response?.data);
      } finally {
        setSaving(false);
      }
    } else {
      createCompanyAndApplication();
    }
  };

  return (
    <div className="create-application-page">
      <h1>Add New Application</h1>
      
      <div className="form-card">
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Position <span className="required">*</span></label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              placeholder="e.g., Software Engineer"
              required
            />
          </div>
          
          <div className="form-group" style={{ position: 'relative' }}>
            <label>Company <span className="required">*</span></label>
            <input
              type="text"
              name="companyName"
              value={companyName}
              onChange={(e) => {
                setCompanyName(e.target.value);
                setFormData((prev) => ({ ...prev, companyId: 0 }));
                searchCompanies(e.target.value);
              }}
              onFocus={() => companyName && searchCompanies(companyName)}
              placeholder="Start typing to search or create company..."
              required
            />
            {companies.length > 0 && (
              <ul className="company-suggestions">
                {companies.map((company) => (
                  <li key={company.id} onClick={() => selectCompany(company)}>
                    {company.name}
                  </li>
                ))}
                <li 
                  className="create-new"
                  onClick={() => {
                    setCompanies([]);
                  }}
                >
                  + Create "{companyName}"
                </li>
              </ul>
            )}
          </div>

          <div className="form-group">
            <label>Status</label>
            <select name="statusId" value={formData.statusId || ''} onChange={handleChange}>
              <option value="">Select Status...</option>
              {statuses.map((status) => (
                <option key={status.id} value={status.id}>
                  {status.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g., San Francisco, CA or Remote"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Min Salary</label>
              <input
                type="number"
                name="salaryMin"
                value={formData.salaryMin || ''}
                onChange={handleChange}
                placeholder="e.g., 100000"
              />
            </div>
            <div className="form-group">
              <label>Max Salary</label>
              <input
                type="number"
                name="salaryMax"
                value={formData.salaryMax || ''}
                onChange={handleChange}
                placeholder="e.g., 150000"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Employment Type</label>
            <select name="employmentType" value={formData.employmentType || ''} onChange={handleChange}>
              <option value="">Select...</option>
              <option value="FULL_TIME">Full Time</option>
              <option value="PART_TIME">Part Time</option>
              <option value="CONTRACT">Contract</option>
              <option value="INTERNSHIP">Internship</option>
              <option value="REMOTE">Remote</option>
            </select>
          </div>

          <div className="form-group">
            <label>Job URL</label>
            <input
              type="url"
              name="jobUrl"
              value={formData.jobUrl}
              onChange={handleChange}
              placeholder="https://..."
            />
          </div>

          <div className="form-group">
            <label>Applied Date</label>
            <input
              type="date"
              name="appliedDate"
              value={formData.appliedDate || ''}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
              placeholder="Any additional notes about this application..."
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={() => navigate('/applications')}>
              Cancel
            </button>
            <button type="submit" disabled={saving}>
              {saving ? 'Saving...' : 'Save Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateApplicationPage;
