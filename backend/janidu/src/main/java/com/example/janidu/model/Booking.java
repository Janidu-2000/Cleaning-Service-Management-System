package com.example.janidu.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

@Entity
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String customerName;

    @NotNull
    private String address;

    @NotNull
    private LocalDateTime dateTime;

    @ManyToOne
    @JoinColumn(name = "service_id")
    @NotNull
    private Service service;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @NotNull
    private User user;

    // Default constructor
    public Booking() {}

    // Constructor with parameters
    public Booking(Long id, String customerName, String address, LocalDateTime dateTime, Service service, User user) {
        this.id = id;
        this.customerName = customerName;
        this.address = address;
        this.dateTime = dateTime;
        this.service = service;
        this.user = user;
    }

    // Getter and setter methods
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public LocalDateTime getDateTime() {
        return dateTime;
    }

    public void setDateTime(LocalDateTime dateTime) {
        this.dateTime = dateTime;
    }

    public Service getService() {
        return service;
    }

    public void setService(Service service) {
        this.service = service;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
