import { useState, type FormEvent, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import applicationService from '../../services/applicationService';
import companyService from '../../services/companyService';
import type { JobApplicationRequest, CompanyResponse } from '../../types';
import './ApplicationsPage.css';

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
    companyId: 0,
  });
  const [companyName, setCompanyName] = useState('');
  const [companies, setCompanies] = useState<CompanyResponse[]>([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ 
      ...prev, 
      [name]: name === 'salaryMin' || name === 'salaryMax' || name === 'companyId' 
        ? (value ? Number(value) : undefined) 
        : value 
    }));
  };

  const searchCompanies = async (query: string) => {
    if (query.length >= 2) {
      const results = await companyService.search(query);
      setCompanies(results);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await applicationService.create(formData);
      navigate('/applications');
    } catch (error) {
      console.error('Error creating application:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-application-page">
      <h1>Add New Application</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Position *</label>
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Company Name *</label>
          <input
            type="text"
            name="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            onBlur={() => searchCompanies(companyName)}
            required
          />
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
            value={formData.appliedDate}
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
          <button type="button" onClick={() => navigate('/applications')}>
            Cancel
          </button>
          <button type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Save Application'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateApplicationPage;
