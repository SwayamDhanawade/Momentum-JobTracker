import { Link } from 'react-router-dom';
import type { JobApplicationResponse } from '../../types';

interface RecentApplicationsProps {
  applications: JobApplicationResponse[];
}

export function RecentApplications({ applications }: RecentApplicationsProps) {
  if (applications.length === 0) {
    return (
      <div className="recent-applications empty">
        <p>No recent applications</p>
      </div>
    );
  }

  return (
    <div className="recent-applications">
      {applications.map((app) => (
        <Link 
          key={app.id} 
          to={`/applications/${app.id}`}
          className="recent-application-item"
        >
          <div className="recent-app-info">
            <h4>{app.position}</h4>
            <p className="company-name">{app.companyName}</p>
          </div>
          <span 
            className="status-badge"
            style={{ backgroundColor: app.statusColor || '#666' }}
          >
            {app.statusName}
          </span>
        </Link>
      ))}
    </div>
  );
}

export default RecentApplications;
