import { useState, type FormEvent, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import interviewService from '../../services/interviewService';
import type { InterviewRequest } from '../../types';

interface InterviewFormProps {
  applicationId: number;
  onSuccess?: () => void;
  onCancel?: () => void;
}

interface ErrorResponse {
  message?: string;
}

export function InterviewForm({ applicationId, onSuccess, onCancel }: InterviewFormProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<InterviewRequest>({
    applicationId,
    type: '',
    date: '',
    time: '',
    endTime: '',
    location: '',
    meetingLink: '',
    interviewerName: '',
    interviewerEmail: '',
    interviewerPhone: '',
    notes: '',
    questions: '',
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaving(true);

    try {
      await interviewService.create(formData);
      onSuccess?.();
      if (!onSuccess) {
        navigate(-1);
      }
    } catch (err) {
      const axiosError = err as AxiosError<ErrorResponse>;
      setError(axiosError.response?.data?.message || 'Failed to create interview');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="interview-form">
      <h2>Schedule Interview</h2>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Interview Type *</label>
          <select name="type" value={formData.type} onChange={handleChange} required>
            <option value="">Select Type...</option>
            <option value="PHONE_SCREEN">Phone Screen</option>
            <option value="TECHNICAL">Technical Interview</option>
            <option value="BEHAVIORAL">Behavioral Interview</option>
            <option value="SYSTEM_DESIGN">System Design</option>
            <option value="ONSITE">Onsite</option>
            <option value="FINAL">Final Round</option>
            <option value="OTHER">Other</option>
          </select>
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
            <label>Time *</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Office location or address"
          />
        </div>

        <div className="form-group">
          <label>Meeting Link</label>
          <input
            type="url"
            name="meetingLink"
            value={formData.meetingLink}
            onChange={handleChange}
            placeholder="https://..."
          />
        </div>

        <div className="form-group">
          <label>Interviewer Name</label>
          <input
            type="text"
            name="interviewerName"
            value={formData.interviewerName}
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Interviewer Email</label>
            <input
              type="email"
              name="interviewerEmail"
              value={formData.interviewerEmail}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Interviewer Phone</label>
            <input
              type="tel"
              name="interviewerPhone"
              value={formData.interviewerPhone}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={3}
            placeholder="Preparation notes, topics to cover..."
          />
        </div>

        <div className="form-actions">
          <button type="button" onClick={onCancel || (() => navigate(-1))}>
            Cancel
          </button>
          <button type="submit" disabled={saving}>
            {saving ? 'Scheduling...' : 'Schedule Interview'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default InterviewForm;
