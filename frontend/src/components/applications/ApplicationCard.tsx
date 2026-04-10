import type { JobApplicationResponse } from '../../types';

interface ApplicationCardProps {
  application: JobApplicationResponse;
  onClick?: () => void;
}

export function ApplicationCard({ application, onClick }: ApplicationCardProps) {
  return (
    <div className="application-card" onClick={onClick}>
      <h3>{application.position}</h3>
      <p className="company">{application.companyName}</p>
      <span 
        className="status-badge"
        style={{ backgroundColor: application.statusColor }}
      >
        {application.statusName}
      </span>
      <p className="date">
        Applied: {application.appliedDate ? new Date(application.appliedDate).toLocaleDateString() : 'Not specified'}
      </p>
    </div>
  );
}

export default ApplicationCard;
