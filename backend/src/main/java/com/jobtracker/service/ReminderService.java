package com.jobtracker.service;

import com.jobtracker.dto.reminder.ReminderRequest;
import com.jobtracker.dto.reminder.ReminderResponse;
import com.jobtracker.entity.Interview;
import com.jobtracker.entity.JobApplication;
import com.jobtracker.entity.Reminder;
import com.jobtracker.entity.User;
import com.jobtracker.exception.ResourceNotFoundException;
import com.jobtracker.repository.InterviewRepository;
import com.jobtracker.repository.JobApplicationRepository;
import com.jobtracker.repository.ReminderRepository;
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
public class ReminderService {
    
    private final ReminderRepository reminderRepository;
    private final JobApplicationRepository jobApplicationRepository;
    private final InterviewRepository interviewRepository;
    private final UserRepository userRepository;
    
    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ISO_LOCAL_DATE;
    
    @Transactional
    public ReminderResponse create(ReminderRequest request, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        
        JobApplication application = null;
        if (request.getApplicationId() != null) {
            application = jobApplicationRepository.findById(request.getApplicationId())
                    .orElseThrow(() -> new ResourceNotFoundException("Application not found"));
        }
        
        Interview interview = null;
        if (request.getInterviewId() != null) {
            interview = interviewRepository.findById(request.getInterviewId())
                    .orElseThrow(() -> new ResourceNotFoundException("Interview not found"));
        }
        
        Reminder reminder = Reminder.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .date(request.getDate())
                .time(request.getTime())
                .reminderType(request.getReminderType())
                .isRecurring(request.getIsRecurring() != null ? request.getIsRecurring() : false)
                .recurringPattern(request.getRecurringPattern())
                .application(application)
                .interview(interview)
                .user(user)
                .build();
        
        Reminder saved = reminderRepository.save(reminder);
        return mapToResponse(saved);
    }
    
    public ReminderResponse getById(Long id) {
        Reminder reminder = reminderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reminder not found"));
        return mapToResponse(reminder);
    }
    
    public List<ReminderResponse> getAllByUserId(Long userId) {
        return reminderRepository.findByUserId(userId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }
    
    public List<ReminderResponse> getUpcoming(Long userId) {
        LocalDate today = LocalDate.now();
        return reminderRepository.findByUserIdAndDateBetween(userId, today, today.plusMonths(1))
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }
    
    public List<ReminderResponse> getPending(Long userId) {
        return reminderRepository.findByUserIdAndIsCompletedFalse(userId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }
    
    @Transactional
    public ReminderResponse update(Long id, ReminderRequest request) {
        Reminder reminder = reminderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reminder not found"));
        
        if (request.getTitle() != null) reminder.setTitle(request.getTitle());
        if (request.getDescription() != null) reminder.setDescription(request.getDescription());
        if (request.getDate() != null) reminder.setDate(request.getDate());
        if (request.getTime() != null) reminder.setTime(request.getTime());
        if (request.getReminderType() != null) reminder.setReminderType(request.getReminderType());
        if (request.getIsRecurring() != null) reminder.setIsRecurring(request.getIsRecurring());
        if (request.getRecurringPattern() != null) reminder.setRecurringPattern(request.getRecurringPattern());
        
        Reminder updated = reminderRepository.save(reminder);
        return mapToResponse(updated);
    }
    
    @Transactional
    public ReminderResponse markCompleted(Long id) {
        Reminder reminder = reminderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reminder not found"));
        
        reminder.setIsCompleted(true);
        
        Reminder updated = reminderRepository.save(reminder);
        return mapToResponse(updated);
    }
    
    @Transactional
    public void delete(Long id) {
        if (!reminderRepository.existsById(id)) {
            throw new ResourceNotFoundException("Reminder not found");
        }
        reminderRepository.deleteById(id);
    }
    
    private ReminderResponse mapToResponse(Reminder reminder) {
        return ReminderResponse.builder()
                .id(reminder.getId())
                .applicationId(reminder.getApplication() != null ? reminder.getApplication().getId() : null)
                .applicationPosition(reminder.getApplication() != null ? reminder.getApplication().getPosition() : null)
                .interviewId(reminder.getInterview() != null ? reminder.getInterview().getId() : null)
                .title(reminder.getTitle())
                .description(reminder.getDescription())
                .date(reminder.getDate())
                .time(reminder.getTime())
                .reminderType(reminder.getReminderType())
                .isCompleted(reminder.getIsCompleted())
                .isRecurring(reminder.getIsRecurring())
                .recurringPattern(reminder.getRecurringPattern())
                .userId(reminder.getUser().getId())
                .createdAt(reminder.getCreatedAt() != null ? reminder.getCreatedAt().format(DATE_FORMATTER) : null)
                .build();
    }
}
