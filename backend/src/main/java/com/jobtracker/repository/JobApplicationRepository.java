package com.jobtracker.repository;

import com.jobtracker.entity.JobApplication;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
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
    
    List<JobApplication> findByUserIdOrderByCreatedAtDesc(Long userId, Pageable pageable);
    
    List<JobApplication> findByUserIdAndAppliedDateBetweenOrderByAppliedDateDesc(
            Long userId, LocalDate start, LocalDate end);
    
    @Query("SELECT COUNT(j) FROM JobApplication j WHERE j.user.id = :userId AND j.status.name = :statusName")
    long countByUserIdAndStatusName(@Param("userId") Long userId, @Param("statusName") String statusName);
    
    @Query("SELECT j.status.name, COUNT(j) FROM JobApplication j WHERE j.user.id = :userId GROUP BY j.status.name")
    List<Object[]> countByStatusForUser(@Param("userId") Long userId);
}
