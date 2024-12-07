package com.example.janidu.service;

import com.example.janidu.model.Booking;
import com.example.janidu.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    public List<Booking> getBookingsByUserId(Long userId) {
        return bookingRepository.findByUserId(userId);  // Fetch bookings for a user by userId
    }

    public Booking saveBooking(Booking booking) {
        return bookingRepository.save(booking);  // Save booking
    }

    public void deleteBooking(Long id) {
        bookingRepository.deleteById(id);  // Delete booking by id
    }
}
