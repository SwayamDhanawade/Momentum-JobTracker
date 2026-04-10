package com.jobtracker.repository;

import com.jobtracker.entity.Interview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface InterviewRepository extends JpaRepository<Interview, Long> {
    List<Interview> findByUserId(Long userId);
    List<Interview> findByApplicationId(Long applicationId);
    List<Interview> findByUserIdAndDateBetween(Long userId, LocalDate start, LocalDate end);
    List<Interview> findByUserIdAndDate(Long userId, LocalDate date);
}
