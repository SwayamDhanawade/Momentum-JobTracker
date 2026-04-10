package com.jobtracker.service;

import com.jobtracker.dto.reminder.ReminderRequest;
import com.jobtracker.dto.reminder.ReminderResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReminderService {
    
    public ReminderResponse create(ReminderRequest request, Long userId) {
        // TODO: Implement create reminder
        return null;
    }
    
    public ReminderResponse getById(Long id) {
        // TODO: Implement get reminder by ID
        return null;
    }
    
    public List<ReminderResponse> getAllByUserId(Long userId) {
        // TODO: Implement get all reminders for user
        return null;
    }
    
    public List<ReminderResponse> getUpcoming(Long userId) {
        // TODO: Implement get upcoming reminders
        return null;
    }
    
    public List<ReminderResponse> getPending(Long userId) {
        // TODO: Implement get pending reminders
        return null;
    }
    
    public ReminderResponse update(Long id, ReminderRequest request) {
        // TODO: Implement update reminder
        return null;
    }
    
    public ReminderResponse markCompleted(Long id) {
        // TODO: Implement mark as completed
        return null;
    }
    
    public void delete(Long id) {
        // TODO: Implement delete reminder
    }
}
