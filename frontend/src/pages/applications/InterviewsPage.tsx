import { useEffect, useState } from 'react';
import interviewService from '../../services/interviewService';
import type { InterviewResponse } from '../../types';
import './InterviewsReminders.css';

function InterviewsPage() {
  const [interviews, setInterviews] = useState<InterviewResponse[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <div className="interviews-page">Loading...</div>;
  }

  return (
    <div className="interviews-page">
      <div className="page-header">
        <h1>Interviews</h1>
      </div>

      <div className="interviews-list">
        {interviews.length > 0 ? (
          interviews.map((interview) => (
            <div key={interview.id} className="interview-card">
              <div className="interview-header">
                <h3>{interview.position}</h3>
                <span className="interview-type">{interview.type}</span>
              </div>
              <p className="company-name">{interview.companyName}</p>
              <div className="interview-details">
                <p><strong>Date:</strong> {new Date(interview.date).toLocaleDateString()}</p>
                <p><strong>Time:</strong> {interview.time}</p>
                {interview.location && <p><strong>Location:</strong> {interview.location}</p>}
                {interview.meetingLink && (
                  <a href={interview.meetingLink} target="_blank" rel="noopener noreferrer">
                    Join Meeting
                  </a>
                )}
              </div>
              {interview.interviewerName && (
                <div className="interviewer-info">
                  <p><strong>Interviewer:</strong> {interview.interviewerName}</p>
                  {interview.interviewerEmail && <p>{interview.interviewerEmail}</p>}
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="no-data">No interviews scheduled</p>
        )}
      </div>
    </div>
  );
}

export default InterviewsPage;
