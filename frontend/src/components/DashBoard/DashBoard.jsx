import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserNavbar from '../Navbar/userNavbar'; 

function DashBoard() {
  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]); 
  const [customerName, setCustomerName] = useState('');
  const [address, setAddress] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [serviceTypeId, setServiceTypeId] = useState('');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('http://localhost:8080/admin/services');
        if (response.ok) {
          const data = await response.json();
          setServices(data); 
        } else {
          throw new Error('Failed to fetch services');
        }
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };
    fetchServices();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const dateTime = `${bookingDate}T${bookingTime}`;

    const newBooking = {
      customerName,
      address,
      dateTime, 
      service: { id: serviceTypeId }, 
      user: { id: 1 }, 
      status: 'Pending', 
    };

    fetch('http://localhost:8080/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBooking),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to create booking');
        }
        return response.json();
      })
      .then((data) => {
        setBookings([...bookings, data]);
        setCustomerName('');
        setAddress('');
        setBookingDate('');
        setBookingTime('');
        setServiceTypeId('');
        alert('Booking created successfully!');
      })
      .catch((error) => console.error('Error:', error));
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <UserNavbar />

      <div className="p-6" id="home">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          Create a Booking
        </h2>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
          <div className="mb-4">
            <label htmlFor="customerName" className="block text-gray-700">Customer Name</label>
            <input
              type="text"
              id="customerName"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block text-gray-700">Address</label>
            <input
              type="text"
              id="address"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="mb-4 flex flex-col sm:flex-row sm:space-x-4">
            <div className="flex-1">
              <label htmlFor="bookingDate" className="block text-gray-700">Date</label>
              <input
                type="date"
                id="bookingDate"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                required
              />
            </div>
            <div className="flex-1">
              <label htmlFor="bookingTime" className="block text-gray-700">Time</label>
              <input
                type="time"
                id="bookingTime"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                value={bookingTime}
                onChange={(e) => setBookingTime(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="serviceType" className="block text-gray-700">Service Type</label>
            <select
              id="serviceType"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              value={serviceTypeId}
              onChange={(e) => setServiceTypeId(e.target.value)}
              required
            >
              <option value="">Select Service</option>
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500 transition">
            Create Booking
          </button>
        </form>
      </div>
    </div>
  );
}

export default DashBoard;
