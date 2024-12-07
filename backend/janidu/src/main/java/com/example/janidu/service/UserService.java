package com.example.janidu.service;

import com.example.janidu.model.User;
import com.example.janidu.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Create a new user
    public User createUser(User user) {
        // You could add validation or password encoding here
        if (user.getRole() == null) {
            user.setRole("User"); // Default role if not provided
        }
        return userRepository.save(user);
    }

    // Get user by ID
    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);  // Return null if not found
    }

    // Authenticate user based on username and password
    public User authenticateUser(String username, String password) {
        User user = userRepository.findByUsername(username);  // Find user by username

        // Check if user exists and the password matches
        if (user != null && user.getPassword().equals(password)) {
            return user; // Return the user if authentication is successful
        }
        return null; // Return null if authentication fails
    }
}
