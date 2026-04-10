import { useEffect, useState } from 'react';
import interviewService from '../../services/interviewService';
import type { InterviewResponse } from '../../types';
import './InterviewsReminders.css';

function InterviewsPage() {
  const [interviews, setInterviews] = useState<InterviewResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all');

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    try {
      const data = await interviewService.getAll();
      setInterviews(data);
    } catch (error) {
      console.error('Error fetching interviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];
  
  const filteredInterviews = interviews.filter((interview) => {
    if (filter === 'upcoming') return interview.date >= today;
    if (filter === 'past') return interview.date < today;
    return true;
  });

  const formatInterviewType = (type: string) => {
    return type.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
  };

  if (loading) {
    return <div className="interviews-page"><div className="loading">Loading...</div></div>;
  }

  return (
    <div className="interviews-page">
      <div className="page-header">
        <h1>Interviews</h1>
      </div>

      <div className="filters">
        <button 
          className={filter === 'all' ? 'active' : ''} 
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button 
          className={filter === 'upcoming' ? 'active' : ''} 
          onClick={() => setFilter('upcoming')}
        >
          Upcoming
        </button>
        <button 
          className={filter === 'past' ? 'active' : ''} 
          onClick={() => setFilter('past')}
        >
          Past
        </button>
      </div>

      <div className="interviews-list">
        {filteredInterviews.length > 0 ? (
          filteredInterviews.map((interview) => (
            <div key={interview.id} className="interview-card">
              <div className="interview-header">
                <div>
                  <h3>{interview.position}</h3>
                  <span className="company-name">{interview.companyName}</span>
                </div>
                <span className="interview-type">{formatInterviewType(interview.type)}</span>
              </div>
              <div className="interview-details">
                <div className="detail-row">
                  <span className="detail-icon">📅</span>
                  <span>{new Date(interview.date).toLocaleDateString()}</span>
                  <span className="detail-icon">🕐</span>
                  <span>{interview.time}</span>
                </div>
                {interview.location && (
                  <div className="detail-row">
                    <span className="detail-icon">📍</span>
                    <span>{interview.location}</span>
                  </div>
                )}
                {interview.meetingLink && (
                  <a href={interview.meetingLink} target="_blank" rel="noopener noreferrer" className="meeting-link">
                    Join Meeting
                  </a>
                )}
              </div>
              {interview.interviewerName && (
                <div className="interviewer-info">
                  <strong>Interviewer:</strong> {interview.interviewerName}
                  {interview.interviewerEmail && <span> ({interview.interviewerEmail})</span>}
                </div>
              )}
              {interview.feedback && (
                <div className="feedback-info">
                  <strong>Feedback:</strong> {interview.feedback}
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="no-data">No interviews found</p>
        )}
      </div>
    </div>
  );
}

export default InterviewsPage;
