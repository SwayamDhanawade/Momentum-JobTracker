import { useState, useEffect, type FormEvent, type ChangeEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import applicationService from '../../services/applicationService';
import companyService from '../../services/companyService';
import statusService from '../../services/statusService';
import type { JobApplicationRequest, CompanyResponse, ApplicationStatusOption } from '../../types';
import './ApplicationsPage.css';

function EditApplicationPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
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

  useEffect(() => {
    fetchApplication();
    fetchStatuses();
  }, [id]);

  const fetchApplication = async () => {
    try {
      if (id) {
        const data = await applicationService.getById(Number(id));
        setFormData({
          position: data.position,
          location: data.location || '',
          jobUrl: data.jobUrl || '',
          salaryMin: data.salaryMin,
          salaryMax: data.salaryMax,
          employmentType: data.employmentType || '',
          notes: data.notes || '',
          coverLetterUrl: data.coverLetterUrl || '',
          companyId: data.companyId,
          statusId: data.statusId,
          appliedDate: data.appliedDate,
          deadlineDate: data.deadlineDate,
        });
        setCompanyName(data.companyName);
      }
    } catch (err) {
      console.error('Error fetching application:', err);
      setError('Failed to load application');
    } finally {
      setLoading(false);
    }
  };

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!formData.companyId) {
      setError('Please select a company');
      return;
    }
    
    setSaving(true);
    setError(null);
    
    try {
      if (id) {
        await applicationService.update(Number(id), formData);
        navigate(`/applications/${id}`);
      }
    } catch (err) {
      console.error('Error updating application:', err);
      setError('Failed to update application');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="create-application-page"><p>Loading...</p></div>;
  }

  return (
    <div className="create-application-page">
      <h1>Edit Application</h1>
      
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
              onBlur={() => searchCompanies(companyName)}
              onFocus={() => companyName && searchCompanies(companyName)}
              placeholder="Start typing to search companies..."
              required
            />
            {companies.length > 0 && (
              <ul className="company-suggestions">
                {companies.map((company) => (
                  <li key={company.id} onClick={() => selectCompany(company)}>
                    {company.name}
                  </li>
                ))}
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
              />
            </div>
            <div className="form-group">
              <label>Max Salary</label>
              <input
                type="number"
                name="salaryMax"
                value={formData.salaryMax || ''}
                onChange={handleChange}
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
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={() => navigate(`/applications/${id}`)}>
              Cancel
            </button>
            <button type="submit" disabled={saving}>
              {saving ? 'Saving...' : 'Update Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditApplicationPage;
