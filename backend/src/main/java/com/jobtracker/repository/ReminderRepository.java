package com.jobtracker.repository;

import com.jobtracker.entity.Reminder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface ReminderRepository extends JpaRepository<Reminder, Long> {
    List<Reminder> findByUserId(Long userId);
    List<Reminder> findByUserIdAndDate(Long userId, LocalDate date);
    List<Reminder> findByUserIdAndDateBetween(Long userId, LocalDate start, LocalDate end);
    List<Reminder> findByUserIdAndIsCompletedFalse(Long userId);
    List<Reminder> findByDateAndIsCompletedFalse(LocalDate date);
}
