import { useState, type ChangeEvent } from 'react';
import { AxiosError } from 'axios';
import applicationService from '../../services/applicationService';
import statusService from '../../services/statusService';
import type { ApplicationStatusOption } from '../../types';

interface StatusTimelineProps {
  applicationId: number;
  currentStatusId: number;
  currentStatusName: string;
  currentStatusColor: string | undefined;
  onStatusChange?: () => void;
}

interface ErrorResponse {
  message?: string;
}

export function StatusTimeline({
  applicationId,
  currentStatusId,
  currentStatusName,
  currentStatusColor,
  onStatusChange,
}: StatusTimelineProps) {
  const [statuses, setStatuses] = useState<ApplicationStatusOption[]>([]);
  const [selectedStatusId, setSelectedStatusId] = useState<number>(currentStatusId);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const fetchStatuses = async () => {
    try {
      const data = await statusService.getAll();
      setStatuses(data);
      setShowDropdown(true);
    } catch (err) {
      console.error('Error fetching statuses:', err);
    }
  };

  const handleStatusChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    const newStatusId = Number(e.target.value);
    setSelectedStatusId(newStatusId);
    
    if (newStatusId === currentStatusId) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await applicationService.updateStatus(applicationId, newStatusId);
      onStatusChange?.();
      setShowDropdown(false);
    } catch (err) {
      const axiosError = err as AxiosError<ErrorResponse>;
      setError(axiosError.response?.data?.message || 'Failed to update status');
      setSelectedStatusId(currentStatusId);
    } finally {
      setLoading(false);
    }
  };

  const openDropdown = () => {
    if (statuses.length === 0) {
      fetchStatuses();
    } else {
      setShowDropdown(true);
    }
  };

  return (
    <div className="status-timeline">
      <div className="current-status" onClick={openDropdown}>
        <span 
          className="status-badge"
          style={{ backgroundColor: currentStatusColor || '#666' }}
        >
          {currentStatusName}
        </span>
        <span className="change-hint">Click to change</span>
      </div>

      {showDropdown && (
        <div className="status-dropdown-overlay" onClick={() => setShowDropdown(false)}>
          <div className="status-dropdown" onClick={(e) => e.stopPropagation()}>
            <h4>Update Status</h4>
            
            {error && <div className="error-message">{error}</div>}
            
            <select
              value={selectedStatusId}
              onChange={handleStatusChange}
              disabled={loading}
            >
              <option value="">Select Status...</option>
              {statuses.map((status) => (
                <option key={status.id} value={status.id}>
                  {status.name}
                </option>
              ))}
            </select>
            
            <div className="dropdown-actions">
              <button 
                type="button" 
                onClick={() => setShowDropdown(false)}
                className="btn-cancel"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StatusTimeline;
