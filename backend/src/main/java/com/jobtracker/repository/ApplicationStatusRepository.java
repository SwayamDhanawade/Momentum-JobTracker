package com.jobtracker.repository;

import com.jobtracker.entity.ApplicationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface ApplicationStatusRepository extends JpaRepository<ApplicationStatus, Long> {
    Optional<ApplicationStatus> findByName(String name);
    Optional<ApplicationStatus> findByIsDefaultTrue();
}
