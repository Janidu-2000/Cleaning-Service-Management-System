import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/userNavbar';

const UserBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('http://localhost:8080/admin/bookings');
        if (response.ok) {
          const data = await response.json();
          setBookings(data);
        } else {
          throw new Error('Failed to fetch bookings');
        }
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  // Fetch Services
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

  const handleDelete = (id) => {
    setBookingToDelete(id);
    setShowConfirmationModal(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8080/bookings/${bookingToDelete}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setBookings(bookings.filter((booking) => booking.id !== bookingToDelete));
        setShowConfirmationModal(false);
        setShowSuccessModal(true);
        setSuccessMessage('Booking has been successfully canceled.');
      } else {
        throw new Error('Failed to delete booking');
      }
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };

  const cancelDelete = () => {
    setShowConfirmationModal(false);
  };

  const handleEdit = (booking) => {
    setSelectedBooking({
      ...booking,
      dateTime: new Date(booking.dateTime).toISOString().slice(0, 16), // Convert to datetime-local format
    });
    setShowEditModal(true);
  };

  const handleSave = async () => {
    try {
      const updatedBooking = {
        ...selectedBooking,
        service: selectedBooking.service ? { id: selectedBooking.service.id } : null,
      };

      const response = await fetch(`http://localhost:8080/bookings/${selectedBooking.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedBooking),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking.id === updatedData.id ? updatedData : booking
          )
        );
        setShowEditModal(false);
        setShowSuccessModal(true);
        setSuccessMessage('Booking has been successfully updated.');
      } else {
        const errorData = await response.json();
        console.error('Error response:', errorData);
      }
    } catch (error) {
      console.error('Error saving booking:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedBooking({ ...selectedBooking, [name]: value });
  };

  const handleServiceChange = (e) => {
    const selectedServiceId = e.target.value;
    const selectedService = services.find((service) => service.id === selectedServiceId);
    setSelectedBooking({ ...selectedBooking, service: selectedService });
  };

  const getServiceName = (serviceId) => {
    const service = services.find((service) => service.id === serviceId);
    return service ? service.name : 'No Service';
  };

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow p-6 bg-gray-100 overflow-hidden">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">User Bookings</h1>
        <div className="bg-white p-4 rounded-lg shadow-md overflow-auto max-h-[calc(100vh-200px)]">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border px-4 py-2 text-left">Customer Name</th>
                <th className="border px-4 py-2 text-left">Service Type</th>
                <th className="border px-4 py-2 text-left">Date & Time</th>
                <th className="border px-4 py-2 text-left">Address</th>
                <th className="border px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length > 0 ? (
                bookings.map((booking) => (
                  <tr key={booking.id}>
                    <td className="border px-4 py-2">{booking.customerName}</td>
                    <td className="border px-4 py-2">{getServiceName(booking.service?.id)}</td>
                    <td className="border px-4 py-2">{new Date(booking.dateTime).toLocaleString()}</td>
                    <td className="border px-4 py-2">{booking.address}</td>
                    <td className="border px-4 py-2">
                      <div className="flex justify-start space-x-2">
                        <button
                          className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-400"
                          onClick={() => handleEdit(booking)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-400"
                          onClick={() => handleDelete(booking.id)}
                        >
                          Cancel
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-gray-500 py-4">
                    No bookings available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit Booking</h2>
            <form>
              <label className="block mb-2">
                Customer Name:
                <input
                  type="text"
                  name="customerName"
                  value={selectedBooking.customerName}
                  onChange={handleChange}
                  className="w-full border rounded px-2 py-1 mt-1"
                />
              </label>
              <label className="block mb-2">
                Service Type:
                <select
                  name="service"
                  value={selectedBooking.service?.id || ''}
                  onChange={handleServiceChange}
                  className="w-full border rounded px-2 py-1 mt-1"
                >
                  <option value="">Select a Service</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block mb-2">
                Date & Time:
                <input
                  type="datetime-local"
                  name="dateTime"
                  value={selectedBooking.dateTime}
                  onChange={handleChange}
                  className="w-full border rounded px-2 py-1 mt-1"
                />
              </label>
              <label className="block mb-4">
                Address:
                <textarea
                  name="address"
                  value={selectedBooking.address}
                  onChange={handleChange}
                  className="w-full border rounded px-2 py-1 mt-1"
                />
              </label>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="bg-gray-500 text-white py-1 px-3 rounded"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="bg-blue-500 text-white py-1 px-3 rounded"
                  onClick={handleSave}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showConfirmationModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Cancel Booking</h2>
            <p>Are you sure you want to cancel this booking?</p>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                className="bg-gray-500 text-white py-1 px-3 rounded"
                onClick={cancelDelete}
              >
                No
              </button>
              <button
                className="bg-red-500 text-white py-1 px-3 rounded"
                onClick={confirmDelete}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Success</h2>
            <p>{successMessage}</p>
            <div className="flex justify-end mt-4">
              <button
                className="bg-blue-500 text-white py-1 px-3 rounded"
                onClick={() => setShowSuccessModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserBookings;
