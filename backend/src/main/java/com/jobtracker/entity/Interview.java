package com.jobtracker.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Table(name = "interviews")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Interview {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "application_id", nullable = false)
    private JobApplication application;
    
    @Column(nullable = false)
    private String type;
    
    @Column(nullable = false)
    private LocalDate date;
    
    @Column(nullable = false)
    private LocalTime time;
    
    @Column(name = "end_time")
    private LocalTime endTime;
    
    @Column(length = 500)
    private String location;
    
    @Column(name = "meeting_link", length = 1000)
    private String meetingLink;
    
    @Column(name = "interviewer_name", length = 200)
    private String interviewerName;
    
    @Column(name = "interviewer_email", length = 200)
    private String interviewerEmail;
    
    @Column(name = "interviewer_phone", length = 20)
    private String interviewerPhone;
    
    @Column(columnDefinition = "TEXT")
    private String notes;
    
    @Column(columnDefinition = "TEXT")
    private String questions;
    
    @Column(columnDefinition = "TEXT")
    private String feedback;
    
    @Column(name = "rating")
    private Integer rating;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    private LocalDateTime updatedAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
