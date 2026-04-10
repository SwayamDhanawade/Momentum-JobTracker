package com.jobtracker.repository;

import com.jobtracker.entity.JobApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {
    List<JobApplication> findByUserId(Long userId);
    List<JobApplication> findByUserIdAndStatusId(Long userId, Long statusId);
    List<JobApplication> findByUserIdAndCompanyId(Long userId, Long companyId);
    List<JobApplication> findByUserIdAndAppliedDateBetween(Long userId, LocalDate start, LocalDate end);
    long countByUserId(Long userId);
    long countByUserIdAndStatusId(Long userId, Long statusId);
}
