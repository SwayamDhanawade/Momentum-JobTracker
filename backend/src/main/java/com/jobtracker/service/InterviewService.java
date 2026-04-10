package com.jobtracker.service;

import com.jobtracker.dto.interview.InterviewRequest;
import com.jobtracker.dto.interview.InterviewResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class InterviewService {
    
    public InterviewResponse create(InterviewRequest request, Long userId) {
        // TODO: Implement create interview
        return null;
    }
    
    public InterviewResponse getById(Long id) {
        // TODO: Implement get interview by ID
        return null;
    }
    
    public List<InterviewResponse> getAllByUserId(Long userId) {
        // TODO: Implement get all interviews for user
        return null;
    }
    
    public List<InterviewResponse> getByApplicationId(Long applicationId) {
        // TODO: Implement get interviews by application
        return null;
    }
    
    public List<InterviewResponse> getUpcoming(Long userId) {
        // TODO: Implement get upcoming interviews
        return null;
    }
    
    public InterviewResponse update(Long id, InterviewRequest request) {
        // TODO: Implement update interview
        return null;
    }
    
    public InterviewResponse addFeedback(Long id, String feedback, Integer rating) {
        // TODO: Implement add feedback
        return null;
    }
    
    public void delete(Long id) {
        // TODO: Implement delete interview
    }
}
