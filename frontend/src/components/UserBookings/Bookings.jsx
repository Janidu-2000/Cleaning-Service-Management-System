import React, { useState, useEffect } from "react";
import AdminNavbar from "../Navbar/adminNavbar"; 

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteBookingId, setDeleteBookingId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingBooking, setEditingBooking] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/admin/bookings")
      .then((response) => response.json())
      .then((data) => setBookings(data))
      .catch((error) => console.error("Error fetching bookings:", error));
  }, []);

  const handleCancel = (id) => {
    setDeleteBookingId(id);
    setIsDeleteModalOpen(true);
  };

  const handleEdit = (booking) => {
    setEditingBooking(booking);
    setIsEditModalOpen(true);
  };

  const confirmCancel = () => {
    fetch(`http://localhost:8080/bookings/${deleteBookingId}`, {
      method: "DELETE",
    })
      .then(() => {
        setBookings(bookings.filter((booking) => booking.id !== deleteBookingId));
        setIsDeleteModalOpen(false);
      })
      .catch((error) => console.error("Error deleting booking:", error));
  };

  const closeModal = () => {
    setIsDeleteModalOpen(false);
    setIsEditModalOpen(false);
  };

  const handleSaveEdit = () => {
    fetch(`http://localhost:8080/bookings/${editingBooking.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editingBooking),
    })
      .then(() => {
        setBookings(
          bookings.map((booking) =>
            booking.id === editingBooking.id ? editingBooking : booking
          )
        );
        setIsEditModalOpen(false);
      })
      .catch((error) => console.error("Error updating booking:", error));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingBooking({ ...editingBooking, [name]: value });
  };

  return (
    <div className="h-screen flex flex-col">
      <AdminNavbar />
      <div className="flex-grow p-6 bg-gray-100 overflow-hidden">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">User Bookings</h1>
        <div className="bg-white p-4 rounded-lg shadow-md overflow-auto max-h-[calc(100vh-200px)]">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border px-4 py-2 text-left">Customer Name</th>
                <th className="border px-4 py-2 text-left">Service Type</th>
                <th className="border px-4 py-2 text-left">Date</th>
                <th className="border px-4 py-2 text-left">Time</th>
                <th className="border px-4 py-2 text-left">Address</th>
                <th className="border px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length > 0 ? (
                bookings.map((booking, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{booking.customerName}</td>
                    <td className="border px-4 py-2">
                      {booking.service ? booking.service.name : "No service assigned"}
                    </td>
                    <td className="border px-4 py-2">
                      {new Date(booking.dateTime).toLocaleDateString()}
                    </td>
                    <td className="border px-4 py-2">
                      {new Date(booking.dateTime).toLocaleTimeString()}
                    </td>
                    <td className="border px-4 py-2">{booking.address}</td>
                    <td className="border px-4 py-2">
                      <div className="flex justify-start space-x-2">
                        <button
                          onClick={() => handleEdit(booking)}
                          className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-400"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleCancel(booking.id)}
                          className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-400"
                        >
                          Cancel
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center text-gray-500 py-4">
                    No bookings available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold text-red-600">Are you sure?</h2>
            <p className="mt-2 text-gray-700">
              You are about to cancel this booking. This action cannot be undone.
            </p>
            <div className="mt-4 flex justify-between">
              <button
                onClick={confirmCancel}
                className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
              >
                Confirm
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold text-blue-600">Edit Booking</h2>
            <form className="mt-4">
              <div className="mb-4">
                <label htmlFor="customerName" className="block text-gray-700">
                  Customer Name
                </label>
                <input
                  type="text"
                  id="customerName"
                  name="customerName"
                  value={editingBooking.customerName}
                  onChange={handleEditChange}
                  className="w-full px-4 py-2 border rounded-md mt-1"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="service" className="block text-gray-700">
                  Service
                </label>
                <input
                  type="text"
                  id="service"
                  name="service"
                  value={editingBooking.service.name}
                  onChange={handleEditChange}
                  className="w-full px-4 py-2 border rounded-md mt-1"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="dateTime" className="block text-gray-700">
                  Date & Time
                </label>
                <input
                  type="datetime-local"
                  id="dateTime"
                  name="dateTime"
                  value={editingBooking.dateTime}
                  onChange={handleEditChange}
                  className="w-full px-4 py-2 border rounded-md mt-1"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="address" className="block text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={editingBooking.address}
                  onChange={handleEditChange}
                  className="w-full px-4 py-2 border rounded-md mt-1"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <button
                  type="button"
                  onClick={handleSaveEdit}
                  className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bookings;
