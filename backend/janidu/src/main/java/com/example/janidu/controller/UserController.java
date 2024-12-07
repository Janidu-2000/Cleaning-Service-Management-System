package com.example.janidu.controller;

import com.example.janidu.model.User;
import com.example.janidu.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    // Endpoint to create a new user
    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    // Endpoint to get a user by ID
    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    // Endpoint to login a user
    @PostMapping("/login")
    public User loginUser(@RequestBody User loginRequest) {
        User user = userService.authenticateUser(loginRequest.getUsername(), loginRequest.getPassword());

        if (user != null) {
            return user;  // Return user if credentials are valid
        } else {
            throw new RuntimeException("Invalid username or password");  // Return error if invalid credentials
        }
    }

    // Other endpoints like updateUser, deleteUser can be added here
}
