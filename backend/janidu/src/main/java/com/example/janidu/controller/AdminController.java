package com.example.janidu.controller;

import com.example.janidu.model.Booking;
import com.example.janidu.model.Service;
import com.example.janidu.repository.BookingRepository;
import com.example.janidu.repository.ServiceRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private final ServiceRepository serviceRepository;

    @Autowired
    private BookingRepository bookingRepository;

    public AdminController(ServiceRepository serviceRepository) {
        this.serviceRepository = serviceRepository;
    }

    // Add Service
    @PostMapping("/services")
    public Service addService(@Valid @RequestBody Service service) {
        return serviceRepository.save(service);
    }

    // Delete Service
    @DeleteMapping("/services/{id}")
    public ResponseEntity<String> deleteService(@PathVariable Long id) {
        try {
            if (serviceRepository.existsById(id)) {
                // Check if there are related bookings or other entities linked to the service
                // If foreign key violation occurs, handle it properly here

                serviceRepository.deleteById(id);
                return ResponseEntity.ok("Service with ID " + id + " deleted successfully.");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Service with ID " + id + " not found.");
            }
        } catch (Exception e) {
            // Log the exception and return a 500 error response
            System.err.println("Error deleting service with ID: " + id);
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to delete service with ID " + id + ".");
        }
    }


    // Get All Services
    @GetMapping("/services")
    public List<Service> getAllServices() {
        return serviceRepository.findAll();
    }

    // Update Service
    @PutMapping("/services/{id}")
    public Service updateService(@PathVariable Long id, @RequestBody Service updatedService) {
        return serviceRepository.findById(id).map(service -> {
            service.setName(updatedService.getName());
//            service.setDescription(updatedService.getDescription());
            // Add any other fields to update as needed
            return serviceRepository.save(service);
        }).orElseThrow(() -> new RuntimeException("Service not found with id " + id));
    }

    // Get All Bookings
    @GetMapping("/bookings")
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    // Get Booking by ID
    @GetMapping("/bookings/{id}")
    public Booking getBookingById(@PathVariable Long id) {
        return bookingRepository.findById(id).orElse(null);
    }

    // Add Booking
    @PostMapping("/bookings")
    public Booking addBooking(@RequestBody Booking booking) {
        return bookingRepository.save(booking);
    }

    // Delete Booking by ID
    @DeleteMapping("/bookings/{id}")
    public void deleteBooking(@PathVariable Long id) {
        bookingRepository.deleteById(id);
    }

    // Update Booking
    @PutMapping("/bookings/{id}")
    public Booking updateBooking(@PathVariable Long id, @RequestBody Booking updatedBooking) {
        return bookingRepository.findById(id).map(booking -> {
            booking.setCustomerName(updatedBooking.getCustomerName());
            booking.setAddress(updatedBooking.getAddress());
            booking.setDateTime(updatedBooking.getDateTime());
            booking.setService(updatedBooking.getService());
            booking.setUser(updatedBooking.getUser());
            return bookingRepository.save(booking);
        }).orElseThrow(() -> new RuntimeException("Booking not found with id " + id));
    }
}
