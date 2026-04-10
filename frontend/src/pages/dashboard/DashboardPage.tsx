import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import dashboardService from '../../services/dashboardService';
import type { DashboardResponse } from '../../types';
import { StatCard } from '../../components/dashboard/StatCard';
import './DashboardPage.css';

function DashboardPage() {
  const [stats, setStats] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const data = await dashboardService.getDashboard();
      setStats(data);
    } catch (error) {
      console.error('Error fetching dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="dashboard-page"><div className="loading">Loading...</div></div>;
  }

  const statusColors: Record<string, string> = {
    'Wishlist': '#9b59b6',
    'Applied': '#3498db',
    'Phone Screen': '#f39c12',
    'Technical Interview': '#e67e22',
    'Onsite': '#d35400',
    'Offer': '#27ae60',
    'Rejected': '#e74c3c',
  };

  return (
    <div className="dashboard-page">
      <h1>Dashboard</h1>
      
      <div className="stats-grid">
        <StatCard 
          title="Total Applications" 
          value={stats?.totalApplications || 0} 
        />
        <StatCard 
          title="This Month" 
          value={stats?.applicationsThisMonth || 0} 
        />
        <StatCard 
          title="Interviews This Week" 
          value={stats?.interviewsThisWeek || 0} 
        />
        <StatCard 
          title="Pending Reminders" 
          value={stats?.pendingReminders || 0} 
        />
      </div>

      <div className="dashboard-sections">
        <div className="dashboard-section">
          <h2>Applications by Status</h2>
          <div className="status-breakdown">
            {stats?.applicationsByStatus && Object.entries(stats.applicationsByStatus).length > 0 ? (
              Object.entries(stats.applicationsByStatus).map(([status, count]) => (
                <div key={status} className="status-item">
                  <span 
                    className="status-indicator"
                    style={{ backgroundColor: statusColors[status] || '#666' }}
                  />
                  <span className="status-name">{status}</span>
                  <span className="status-count">{count}</span>
                </div>
              ))
            ) : (
              <p className="empty-message">No applications yet</p>
            )}
          </div>
        </div>

        <div className="dashboard-section">
          <div className="section-header">
            <h2>Recent Applications</h2>
            <Link to="/applications" className="view-all-link">View All</Link>
          </div>
          <div className="recent-list">
            {stats?.recentActivity && stats.recentActivity.length > 0 ? (
              stats.recentActivity.slice(0, 5).map((activity, index) => (
                <div key={index} className="recent-item">
                  <div className="recent-info">
                    <span className="activity-type">{activity.type}</span>
                    <p className="activity-description">{activity.description}</p>
                  </div>
                  <span className="activity-date">{activity.timestamp}</span>
                </div>
              ))
            ) : (
              <p className="empty-message">No recent applications</p>
            )}
          </div>
        </div>

        <div className="dashboard-section">
          <div className="section-header">
            <h2>Upcoming Interviews</h2>
            <Link to="/interviews" className="view-all-link">View All</Link>
          </div>
          <div className="interviews-list">
            {stats?.upcomingInterviews && stats.upcomingInterviews.length > 0 ? (
              stats.upcomingInterviews.slice(0, 5).map((interview) => (
                <div key={interview.id} className="interview-item">
                  <div className="interview-info">
                    <p className="interview-position">{interview.position}</p>
                    <p className="interview-company">{interview.companyName}</p>
                  </div>
                  <div className="interview-time">
                    <span>{interview.date}</span>
                    {interview.time && <span>{interview.time}</span>}
                  </div>
                </div>
              ))
            ) : (
              <p className="empty-message">No upcoming interviews</p>
            )}
          </div>
        </div>

        <div className="dashboard-section">
          <div className="section-header">
            <h2>Pending Reminders</h2>
            <Link to="/reminders" className="view-all-link">View All</Link>
          </div>
          <div className="reminders-list">
            {stats?.upcomingReminders && stats.upcomingReminders.length > 0 ? (
              stats.upcomingReminders.slice(0, 5).map((reminder) => (
                <div key={reminder.id} className="reminder-item">
                  <div className="reminder-info">
                    <p className="reminder-title">{reminder.title}</p>
                  </div>
                  <div className="reminder-time">
                    <span>{reminder.date}</span>
                    {reminder.time && <span>{reminder.time}</span>}
                  </div>
                </div>
              ))
            ) : (
              <p className="empty-message">No pending reminders</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
