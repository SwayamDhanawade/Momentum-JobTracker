package com.jobtracker.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "job_applications")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JobApplication {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String position;
    
    @Column(length = 100)
    private String location;
    
    @Column(name = "job_url", length = 1000)
    private String jobUrl;
    
    @Column(name = "salary_min")
    private Double salaryMin;
    
    @Column(name = "salary_max")
    private Double salaryMax;
    
    @Column(length = 50)
    private String employmentType;
    
    @Column(columnDefinition = "TEXT")
    private String notes;
    
    @Column(name = "cover_letter_url", length = 500)
    private String coverLetterUrl;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "status_id", nullable = false)
    private ApplicationStatus status;
    
    @Column(name = "applied_date")
    private LocalDate appliedDate;
    
    @Column(name = "deadline_date")
    private LocalDate deadlineDate;
    
    @Column(name = "offer_date")
    private LocalDate offerDate;
    
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
