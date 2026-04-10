import { useEffect, useState } from 'react';
import reminderService from '../../services/reminderService';
import type { ReminderResponse } from '../../types';
import './InterviewsReminders.css';

function RemindersPage() {
  const [reminders, setReminders] = useState<ReminderResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'pending' | 'all'>('pending');

  useEffect(() => {
    fetchReminders();
  }, [filter]);

  const fetchReminders = async () => {
    try {
      const data = filter === 'pending' 
        ? await reminderService.getPending()
        : await reminderService.getAll();
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
      fetchReminders();
    } catch (error) {
      console.error('Error marking reminder as completed:', error);
    }
  };

  if (loading) {
    return <div className="reminders-page">Loading...</div>;
  }

  return (
    <div className="reminders-page">
      <div className="page-header">
        <h1>Reminders</h1>
      </div>

      <div className="filters">
        <select value={filter} onChange={(e) => setFilter(e.target.value as 'pending' | 'all')}>
          <option value="pending">Pending</option>
          <option value="all">All</option>
        </select>
      </div>

      <div className="reminders-list">
        {reminders.length > 0 ? (
          reminders.map((reminder) => (
            <div 
              key={reminder.id} 
              className={`reminder-card ${reminder.isCompleted ? 'completed' : ''}`}
            >
              <div className="reminder-header">
                <h3>{reminder.title}</h3>
                <span className="reminder-type">{reminder.reminderType}</span>
              </div>
              {reminder.description && (
                <p className="description">{reminder.description}</p>
              )}
              <div className="reminder-details">
                <p><strong>Date:</strong> {new Date(reminder.date).toLocaleDateString()}</p>
                {reminder.time && <p><strong>Time:</strong> {reminder.time}</p>}
              </div>
              {reminder.applicationPosition && (
                <p className="related-application">
                  Related to: {reminder.applicationPosition}
                </p>
              )}
              {!reminder.isCompleted && (
                <button 
                  onClick={() => markCompleted(reminder.id)}
                  className="btn-complete"
                >
                  Mark Complete
                </button>
              )}
            </div>
          ))
        ) : (
          <p className="no-data">No reminders</p>
        )}
      </div>
    </div>
  );
}

export default RemindersPage;
