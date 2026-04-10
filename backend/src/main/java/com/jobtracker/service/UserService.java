package com.jobtracker.service;

import com.jobtracker.dto.auth.AuthResponse;
import com.jobtracker.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    
    public User getById(Long id) {
        // TODO: Implement get user by ID
        return null;
    }
    
    public User getByEmail(String email) {
        // TODO: Implement get user by email
        return null;
    }
    
    public User update(Long id, User user) {
        // TODO: Implement update user
        return null;
    }
    
    public void delete(Long id) {
        // TODO: Implement delete user
    }
    
    public List<AuthResponse> getAllUsers() {
        // TODO: Implement get all users
        return null;
    }
}
