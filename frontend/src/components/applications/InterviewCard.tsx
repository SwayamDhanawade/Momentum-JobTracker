import type { InterviewResponse } from '../../types';

interface InterviewCardProps {
  interview: InterviewResponse;
}

export function InterviewCard({ interview }: InterviewCardProps) {
  return (
    <div className="interview-card">
      <h3>{interview.position}</h3>
      <p className="company">{interview.companyName}</p>
      <p><strong>Type:</strong> {interview.type}</p>
      <p><strong>Date:</strong> {new Date(interview.date).toLocaleDateString()}</p>
      <p><strong>Time:</strong> {interview.time}</p>
      {interview.location && <p><strong>Location:</strong> {interview.location}</p>}
    </div>
  );
}

export default InterviewCard;
