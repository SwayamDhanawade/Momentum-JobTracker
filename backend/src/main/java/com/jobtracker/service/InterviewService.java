package com.jobtracker.service;

import com.jobtracker.dto.interview.InterviewRequest;
import com.jobtracker.dto.interview.InterviewResponse;
import com.jobtracker.entity.Interview;
import com.jobtracker.entity.JobApplication;
import com.jobtracker.entity.User;
import com.jobtracker.exception.ResourceNotFoundException;
import com.jobtracker.repository.InterviewRepository;
import com.jobtracker.repository.JobApplicationRepository;
import com.jobtracker.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InterviewService {
    
    private final InterviewRepository interviewRepository;
    private final JobApplicationRepository jobApplicationRepository;
    private final UserRepository userRepository;
    
    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ISO_LOCAL_DATE;
    
    @Transactional
    public InterviewResponse create(InterviewRequest request, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        
        JobApplication application = jobApplicationRepository.findById(request.getApplicationId())
                .orElseThrow(() -> new ResourceNotFoundException("Application not found"));
        
        Interview interview = Interview.builder()
                .type(request.getType())
                .date(request.getDate())
                .time(request.getTime())
                .endTime(request.getEndTime())
                .location(request.getLocation())
                .meetingLink(request.getMeetingLink())
                .interviewerName(request.getInterviewerName())
                .interviewerEmail(request.getInterviewerEmail())
                .interviewerPhone(request.getInterviewerPhone())
                .notes(request.getNotes())
                .questions(request.getQuestions())
                .application(application)
                .user(user)
                .build();
        
        Interview saved = interviewRepository.save(interview);
        return mapToResponse(saved);
    }
    
    public InterviewResponse getById(Long id) {
        Interview interview = interviewRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Interview not found"));
        return mapToResponse(interview);
    }
    
    public List<InterviewResponse> getAllByUserId(Long userId) {
        return interviewRepository.findByUserId(userId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }
    
    public List<InterviewResponse> getByApplicationId(Long applicationId) {
        return interviewRepository.findByApplicationId(applicationId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }
    
    public List<InterviewResponse> getUpcoming(Long userId) {
        LocalDate today = LocalDate.now();
        return interviewRepository.findByUserIdAndDateBetweenOrderByDateAsc(userId, today, today.plusMonths(1))
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }
    
    @Transactional
    public InterviewResponse update(Long id, InterviewRequest request) {
        Interview interview = interviewRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Interview not found"));
        
        if (request.getType() != null) interview.setType(request.getType());
        if (request.getDate() != null) interview.setDate(request.getDate());
        if (request.getTime() != null) interview.setTime(request.getTime());
        if (request.getEndTime() != null) interview.setEndTime(request.getEndTime());
        if (request.getLocation() != null) interview.setLocation(request.getLocation());
        if (request.getMeetingLink() != null) interview.setMeetingLink(request.getMeetingLink());
        if (request.getInterviewerName() != null) interview.setInterviewerName(request.getInterviewerName());
        if (request.getInterviewerEmail() != null) interview.setInterviewerEmail(request.getInterviewerEmail());
        if (request.getInterviewerPhone() != null) interview.setInterviewerPhone(request.getInterviewerPhone());
        if (request.getNotes() != null) interview.setNotes(request.getNotes());
        if (request.getQuestions() != null) interview.setQuestions(request.getQuestions());
        
        Interview updated = interviewRepository.save(interview);
        return mapToResponse(updated);
    }
    
    @Transactional
    public InterviewResponse addFeedback(Long id, String feedback, Integer rating) {
        Interview interview = interviewRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Interview not found"));
        
        interview.setFeedback(feedback);
        if (rating != null) interview.setRating(rating);
        
        Interview updated = interviewRepository.save(interview);
        return mapToResponse(updated);
    }
    
    @Transactional
    public void delete(Long id) {
        if (!interviewRepository.existsById(id)) {
            throw new ResourceNotFoundException("Interview not found");
        }
        interviewRepository.deleteById(id);
    }
    
    private InterviewResponse mapToResponse(Interview interview) {
        return InterviewResponse.builder()
                .id(interview.getId())
                .applicationId(interview.getApplication().getId())
                .position(interview.getApplication().getPosition())
                .companyName(interview.getApplication().getCompany().getName())
                .type(interview.getType())
                .date(interview.getDate())
                .time(interview.getTime())
                .endTime(interview.getEndTime())
                .location(interview.getLocation())
                .meetingLink(interview.getMeetingLink())
                .interviewerName(interview.getInterviewerName())
                .interviewerEmail(interview.getInterviewerEmail())
                .interviewerPhone(interview.getInterviewerPhone())
                .notes(interview.getNotes())
                .questions(interview.getQuestions())
                .feedback(interview.getFeedback())
                .rating(interview.getRating())
                .userId(interview.getUser().getId())
                .createdAt(interview.getCreatedAt() != null ? interview.getCreatedAt().format(DATE_FORMATTER) : null)
                .build();
    }
}
