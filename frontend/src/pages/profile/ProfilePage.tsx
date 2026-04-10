import { useAuth } from '../../contexts/AuthContext';
import './ProfilePage.css';

function ProfilePage() {
  const { user } = useAuth();

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-avatar">
          {user?.fullName ? getInitials(user.fullName) : 'U'}
        </div>
        <h1>{user?.fullName || 'User'}</h1>
        <p className="profile-email">{user?.email}</p>
      </div>

      <div className="profile-content">
        <div className="profile-card">
          <h2>Account Information</h2>
          <div className="info-list">
            <div className="info-item">
              <span className="info-label">Full Name</span>
              <span className="info-value">{user?.fullName || '-'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Email</span>
              <span className="info-value">{user?.email || '-'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Phone</span>
              <span className="info-value">{user?.phone || '-'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Account Type</span>
              <span className="info-value">{user?.type || 'Standard User'}</span>
            </div>
          </div>
        </div>

        <div className="profile-card">
          <h2>About Momentum</h2>
          <p className="about-text">
            Momentum is a job application tracking tool designed to help you stay organized 
            throughout your job search journey. Track applications, schedule interviews, 
            and never miss an important follow-up.
          </p>
          <div className="app-info">
            <span className="info-label">Version</span>
            <span className="info-value">1.0.0</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
