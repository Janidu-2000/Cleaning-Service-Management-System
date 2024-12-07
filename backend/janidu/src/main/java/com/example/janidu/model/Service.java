package com.example.janidu.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

@Entity
public class Service {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String name;

    // Default constructor
    public Service() {
    }

    // Constructor with parameters
    public Service(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    // Getter for id
    public Long getId() {
        return id;
    }

    // Setter for id
    public void setId(Long id) {
        this.id = id;
    }

    // Getter for name
    public String getName() {
        return name;
    }

    // Setter for name
    public void setName(String name) {
        this.name = name;
    }
}