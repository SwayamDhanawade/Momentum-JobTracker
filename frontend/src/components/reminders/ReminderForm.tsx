import { useState, type FormEvent, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import reminderService from '../../services/reminderService';
import type { ReminderRequest } from '../../types';

interface ReminderFormProps {
  applicationId?: number;
  interviewId?: number;
  onSuccess?: () => void;
  onCancel?: () => void;
}

interface ErrorResponse {
  message?: string;
}

export function ReminderForm({ applicationId, interviewId, onSuccess, onCancel }: ReminderFormProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ReminderRequest>({
    applicationId,
    interviewId,
    title: '',
    description: '',
    date: '',
    time: '',
    reminderType: 'GENERAL',
    isRecurring: false,
    recurringPattern: '',
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value 
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaving(true);

    try {
      await reminderService.create(formData);
      onSuccess?.();
      if (!onSuccess) {
        navigate(-1);
      }
    } catch (err) {
      const axiosError = err as AxiosError<ErrorResponse>;
      setError(axiosError.response?.data?.message || 'Failed to create reminder');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="reminder-form">
      <h2>Add Reminder</h2>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Reminder title"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Date *</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Time</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Reminder Type *</label>
          <select name="reminderType" value={formData.reminderType} onChange={handleChange} required>
            <option value="GENERAL">General</option>
            <option value="FOLLOW_UP">Follow Up</option>
            <option value="DEADLINE">Deadline</option>
            <option value="INTERVIEW_PREP">Interview Prep</option>
            <option value="OFFER_RESPONSE">Offer Response</option>
          </select>
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            placeholder="Additional details..."
          />
        </div>

        <div className="form-group checkbox-group">
          <label>
            <input
              type="checkbox"
              name="isRecurring"
              checked={formData.isRecurring}
              onChange={handleChange}
            />
            Recurring Reminder
          </label>
        </div>

        {formData.isRecurring && (
          <div className="form-group">
            <label>Recurring Pattern</label>
            <select 
              name="recurringPattern" 
              value={formData.recurringPattern || ''} 
              onChange={handleChange}
            >
              <option value="">Select...</option>
              <option value="DAILY">Daily</option>
              <option value="WEEKLY">Weekly</option>
              <option value="BIWEEKLY">Bi-weekly</option>
              <option value="MONTHLY">Monthly</option>
            </select>
          </div>
        )}

        <div className="form-actions">
          <button type="button" onClick={onCancel || (() => navigate(-1))}>
            Cancel
          </button>
          <button type="submit" disabled={saving}>
            {saving ? 'Creating...' : 'Create Reminder'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReminderForm;
