import { useEffect, useState } from 'react';
import reminderService from '../../services/reminderService';
import type { ReminderResponse } from '../../types';
import './InterviewsReminders.css';

function RemindersPage() {
  const [reminders, setReminders] = useState<ReminderResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReminders();
  }, []);

  const fetchReminders = async () => {
    try {
      const data = await reminderService.getAll();
      setReminders(data);
    } catch (error) {
      console.error('Error fetching reminders:', error);
    } finally {
      setLoading(false);
    }
  };

  const markCompleted = async (id: number) => {
    try {
      await reminderService.markCompleted(id);
      setReminders((prev) =>
        prev.map((r) =>
          r.id === id ? { ...r, isCompleted: true } : r
        )
      );
    } catch (error) {
      console.error('Error marking reminder as completed:', error);
    }
  };

  const formatReminderType = (type: string) => {
    return type.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
  };

  const pendingReminders = reminders.filter((r) => !r.isCompleted);
  const completedReminders = reminders.filter((r) => r.isCompleted);

  if (loading) {
    return <div className="reminders-page"><div className="loading">Loading...</div></div>;
  }

  return (
    <div className="reminders-page">
      <div className="page-header">
        <h1>Reminders</h1>
      </div>

      <div className="reminders-section">
        <h2 className="section-title">Pending ({pendingReminders.length})</h2>
        <div className="reminders-list">
          {pendingReminders.length > 0 ? (
            pendingReminders.map((reminder) => (
              <div key={reminder.id} className="reminder-card">
                <div className="reminder-header">
                  <div>
                    <h3>{reminder.title}</h3>
                    <span className="reminder-type">{formatReminderType(reminder.reminderType)}</span>
                  </div>
                </div>
                {reminder.description && (
                  <p className="description">{reminder.description}</p>
                )}
                <div className="reminder-details">
                  <div className="detail-row">
                    <span className="detail-icon">📅</span>
                    <span>{new Date(reminder.date).toLocaleDateString()}</span>
                    {reminder.time && (
                      <>
                        <span className="detail-icon">🕐</span>
                        <span>{reminder.time}</span>
                      </>
                    )}
                  </div>
                </div>
                {reminder.applicationPosition && (
                  <p className="related-application">
                    Related to: {reminder.applicationPosition}
                  </p>
                )}
                <button
                  onClick={() => markCompleted(reminder.id)}
                  className="btn-complete"
                >
                  Mark Complete
                </button>
              </div>
            ))
          ) : (
            <p className="no-data">No pending reminders</p>
          )}
        </div>
      </div>

      {completedReminders.length > 0 && (
        <div className="reminders-section">
          <h2 className="section-title">Completed ({completedReminders.length})</h2>
          <div className="reminders-list">
            {completedReminders.map((reminder) => (
              <div key={reminder.id} className="reminder-card completed">
                <div className="reminder-header">
                  <div>
                    <h3>{reminder.title}</h3>
                    <span className="reminder-type">{formatReminderType(reminder.reminderType)}</span>
                  </div>
                  <span className="completed-badge">✓ Completed</span>
                </div>
                {reminder.description && (
                  <p className="description">{reminder.description}</p>
                )}
                <div className="reminder-details">
                  <div className="detail-row">
                    <span className="detail-icon">📅</span>
                    <span>{new Date(reminder.date).toLocaleDateString()}</span>
                    {reminder.time && (
                      <>
                        <span className="detail-icon">🕐</span>
                        <span>{reminder.time}</span>
                      </>
                    )}
                  </div>
                </div>
                {reminder.applicationPosition && (
                  <p className="related-application">
                    Related to: {reminder.applicationPosition}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default RemindersPage;
