package com.example.janidu.controller;

import com.example.janidu.model.Booking;
import com.example.janidu.service.BookingService;
import com.example.janidu.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/bookings")
public class UserBookingController {

    @Autowired
    private BookingService bookingService;

    @Autowired
    private UserService userService;

    // Get all bookings for a specific user
    @GetMapping
    public List<Booking> getAllBookings(@RequestParam Long userId) {
        // Here you can validate if the user exists first (optional)
        // User user = userService.getUserByUsername(username);
        return bookingService.getBookingsByUserId(userId);
    }

    // Create a new booking
    @PostMapping
    public Booking createBooking(@RequestBody Booking booking) {
        return bookingService.saveBooking(booking);
    }

    // Update an existing booking
    @PutMapping("/{id}")
    public Booking updateBooking(@PathVariable Long id, @RequestBody Booking booking) {
        // Set the ID to the booking for the update
        booking.setId(id);
        return bookingService.saveBooking(booking);
    }

    // Delete a booking by ID
    @DeleteMapping("/{id}")
    public void deleteBooking(@PathVariable Long id) {
        bookingService.deleteBooking(id);
    }
}
