package com.jobtracker.config;

import com.jobtracker.entity.ApplicationStatus;
import com.jobtracker.entity.User;
import com.jobtracker.repository.ApplicationStatusRepository;
import com.jobtracker.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {
    
    private final ApplicationStatusRepository applicationStatusRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    
    @Override
    public void run(String... args) {
        initializeStatuses();
        initializeDefaultUser();
    }
    
    private void initializeStatuses() {
        if (applicationStatusRepository.count() == 0) {
            List<ApplicationStatus> defaultStatuses = Arrays.asList(
                ApplicationStatus.builder()
                    .name("Wishlist")
                    .color("#9b59b6")
                    .description("Jobs I'm interested in but haven't applied yet")
                    .displayOrder(1)
                    .isDefault(true)
                    .build(),
                ApplicationStatus.builder()
                    .name("Applied")
                    .color("#3498db")
                    .description("Application submitted")
                    .displayOrder(2)
                    .isDefault(false)
                    .build(),
                ApplicationStatus.builder()
                    .name("Phone Screen")
                    .color("#f39c12")
                    .description("Phone screening interview")
                    .displayOrder(3)
                    .isDefault(false)
                    .build(),
                ApplicationStatus.builder()
                    .name("Technical Interview")
                    .color("#e67e22")
                    .description("Technical interview stage")
                    .displayOrder(4)
                    .isDefault(false)
                    .build(),
                ApplicationStatus.builder()
                    .name("Onsite")
                    .color("#d35400")
                    .description("On-site interview")
                    .displayOrder(5)
                    .isDefault(false)
                    .build(),
                ApplicationStatus.builder()
                    .name("Offer")
                    .color("#27ae60")
                    .description("Job offer received")
                    .displayOrder(6)
                    .isDefault(false)
                    .build(),
                ApplicationStatus.builder()
                    .name("Rejected")
                    .color("#e74c3c")
                    .description("Application rejected")
                    .displayOrder(7)
                    .isDefault(false)
                    .build()
            );
            applicationStatusRepository.saveAll(defaultStatuses);
        }
    }
    
    private void initializeDefaultUser() {
        if (userRepository.count() == 0) {
            User defaultUser = User.builder()
                .email("demo@example.com")
                .password(passwordEncoder.encode("password123"))
                .firstName("Demo")
                .lastName("User")
                .phone("1234567890")
                .enabled(true)
                .build();
            userRepository.save(defaultUser);
        }
    }
}
