import type { ReminderResponse } from '../../types';

interface ReminderCardProps {
  reminder: ReminderResponse;
  onComplete?: (id: number) => void;
}

export function ReminderCard({ reminder, onComplete }: ReminderCardProps) {
  return (
    <div className={`reminder-card ${reminder.isCompleted ? 'completed' : ''}`}>
      <h3>{reminder.title}</h3>
      {reminder.description && <p>{reminder.description}</p>}
      <p><strong>Date:</strong> {new Date(reminder.date).toLocaleDateString()}</p>
      {reminder.time && <p><strong>Time:</strong> {reminder.time}</p>}
      <span className="reminder-type">{reminder.reminderType}</span>
      {!reminder.isCompleted && onComplete && (
        <button onClick={() => onComplete(reminder.id)}>Complete</button>
      )}
    </div>
  );
}

export default ReminderCard;
