package com.example.janidu.repository;

import com.example.janidu.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    // Custom query to find user by username
    User findByUsername(String username);
}
