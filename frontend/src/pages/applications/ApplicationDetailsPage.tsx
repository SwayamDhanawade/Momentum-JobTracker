import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import applicationService from '../../services/applicationService';
import interviewService from '../../services/interviewService';
import type { JobApplicationResponse, InterviewResponse } from '../../types';
import './ApplicationsPage.css';

function ApplicationDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [application, setApplication] = useState<JobApplicationResponse | null>(null);
  const [interviews, setInterviews] = useState<InterviewResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchApplication();
      fetchInterviews();
    }
  }, [id]);

  const fetchApplication = async () => {
    try {
      if (id) {
        const data = await applicationService.getById(Number(id));
        setApplication(data);
      }
    } catch (error) {
      console.error('Error fetching application:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchInterviews = async () => {
    try {
      if (id) {
        const data = await interviewService.getByApplication(Number(id));
        setInterviews(data);
      }
    } catch (error) {
      console.error('Error fetching interviews:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      try {
        if (id) {
          await applicationService.delete(Number(id));
          navigate('/applications');
        }
      } catch (error) {
        console.error('Error deleting application:', error);
      }
    }
  };

  if (loading) {
    return <div className="application-details-page">Loading...</div>;
  }

  if (!application) {
    return <div className="application-details-page">Application not found</div>;
  }

  return (
    <div className="application-details-page">
      <div className="page-header">
        <h1>{application.position}</h1>
        <div className="actions">
          <button onClick={() => navigate(`/applications/${id}/edit`)}>
            Edit
          </button>
          <button onClick={handleDelete} className="btn-danger">
            Delete
          </button>
        </div>
      </div>

      <div className="details-grid">
        <div className="detail-card">
          <h3>Company</h3>
          <p>{application.companyName}</p>
        </div>
        <div className="detail-card">
          <h3>Status</h3>
          <span 
            className="status-badge"
            style={{ backgroundColor: application.statusColor }}
          >
            {application.statusName}
          </span>
        </div>
        <div className="detail-card">
          <h3>Location</h3>
          <p>{application.location || 'Not specified'}</p>
        </div>
        <div className="detail-card">
          <h3>Applied Date</h3>
          <p>{application.appliedDate ? new Date(application.appliedDate).toLocaleDateString() : 'Not specified'}</p>
        </div>
        <div className="detail-card">
          <h3>Salary Range</h3>
          <p>
            {application.salaryMin && application.salaryMax
              ? `$${application.salaryMin} - $${application.salaryMax}`
              : 'Not specified'}
          </p>
        </div>
        <div className="detail-card">
          <h3>Job URL</h3>
          {application.jobUrl && (
            <a href={application.jobUrl} target="_blank" rel="noopener noreferrer">
              View Job Posting
            </a>
          )}
        </div>
      </div>

      <div className="notes-section">
        <h3>Notes</h3>
        <p>{application.notes || 'No notes added'}</p>
      </div>

      <div className="interviews-section">
        <div className="section-header">
          <h3>Interviews</h3>
          <button onClick={() => navigate(`/interviews/create?applicationId=${id}`)}>
            Schedule Interview
          </button>
        </div>
        {interviews.length > 0 ? (
          <div className="interviews-list">
            {interviews.map((interview) => (
              <div key={interview.id} className="interview-card">
                <p><strong>Type:</strong> {interview.type}</p>
                <p><strong>Date:</strong> {new Date(interview.date).toLocaleDateString()}</p>
                <p><strong>Time:</strong> {interview.time}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No interviews scheduled</p>
        )}
      </div>
    </div>
  );
}

export default ApplicationDetailsPage;
