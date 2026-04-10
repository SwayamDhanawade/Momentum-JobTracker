import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import applicationService from '../../services/applicationService';
import type { JobApplicationResponse } from '../../types';
import './ApplicationsPage.css';

function ApplicationsPage() {
  const [applications, setApplications] = useState<JobApplicationResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const data = await applicationService.getAll();
      setApplications(data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredApplications = filter === 'all' 
    ? applications 
    : applications.filter(app => app.statusName === filter);

  if (loading) {
    return <div className="applications-page"><div className="loading">Loading applications...</div></div>;
  }

  return (
    <div className="applications-page">
      <div className="page-header">
        <h1>Job Applications</h1>
        <Link to="/applications/create" className="btn-add">
          + Add Application
        </Link>
      </div>
      
      <div className="filters">
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All Status</option>
        </select>
      </div>

      <div className="applications-list">
        {filteredApplications.length > 0 ? (
          filteredApplications.map((app) => (
            <Link 
              to={`/applications/${app.id}`} 
              key={app.id} 
              className="application-card"
            >
              <h3>{app.position}</h3>
              <p className="company-name">{app.companyName}</p>
              <span 
                className="status-badge" 
                style={{ backgroundColor: app.statusColor || '#666' }}
              >
                {app.statusName || 'Unknown'}
              </span>
              <p className="applied-date">
                Applied: {app.appliedDate ? new Date(app.appliedDate).toLocaleDateString() : 'Not specified'}
              </p>
            </Link>
          ))
        ) : (
          <div className="no-applications">
            <p>No applications yet. Start tracking your job search!</p>
            <Link to="/applications/create" className="btn-add">
              + Add Your First Application
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default ApplicationsPage;
