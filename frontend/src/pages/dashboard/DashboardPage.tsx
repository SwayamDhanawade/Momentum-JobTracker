import { useEffect, useState } from 'react';
import api from '../../services/api';
import type { DashboardResponse } from '../../types';
import './DashboardPage.css';

function DashboardPage() {
  const [stats, setStats] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await api.get<DashboardResponse>('/dashboard');
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="dashboard-page">Loading...</div>;
  }

  return (
    <div className="dashboard-page">
      <h1>Dashboard</h1>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Applications</h3>
          <p className="stat-number">{stats?.totalApplications || 0}</p>
        </div>
        <div className="stat-card">
          <h3>This Month</h3>
          <p className="stat-number">{stats?.applicationsThisMonth || 0}</p>
        </div>
        <div className="stat-card">
          <h3>Interviews This Week</h3>
          <p className="stat-number">{stats?.interviewsThisWeek || 0}</p>
        </div>
        <div className="stat-card">
          <h3>Pending Reminders</h3>
          <p className="stat-number">{stats?.pendingReminders || 0}</p>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
