import React, { useState, useEffect } from 'react';
import AdminNavbar from '../Navbar/adminNavbar'; 
import axios from 'axios';

function AdminDashBoard() {
  const [serviceName, setServiceName] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');
  const [availableServices, setAvailableServices] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentServiceId, setCurrentServiceId] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteServiceId, setDeleteServiceId] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8080/admin/services')
      .then(response => {
        setAvailableServices(response.data);  
      })
      .catch(error => {
        console.error('There was an error fetching the services!', error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = {};
    if (!serviceName) errors.name = 'Service Name is required';

    if (Object.keys(errors).length) {
      setErrors(errors);
      return;
    }

    const newService = { name: serviceName, description: serviceDescription };

    if (editMode) {
      axios.put(`http://localhost:8080/admin/services/${currentServiceId}`, newService)
        .then(response => {
          setAvailableServices(prevServices =>
            prevServices.map(service =>
              service.id === currentServiceId ? { ...service, ...newService } : service
            )
          );
          setEditMode(false);
          setIsSuccessModalOpen(true);
          setServiceName('');
          setServiceDescription('');
        })
        .catch(error => {
          console.error('There was an error updating the service!', error);
        });
    } else {
      axios.post('http://localhost:8080/admin/services', newService)
        .then(response => {
          setAvailableServices(prevServices => [
            ...prevServices,
            { ...newService, id: response.data.id }  
          ]);
          setIsSuccessModalOpen(true);
          setServiceName('');
          setServiceDescription('');
        })
        .catch(error => {
          console.error('There was an error adding the service!', error);
        });
    }

    setErrors({});
  };

  const handleEdit = (id) => {
    const serviceToEdit = availableServices.find((service) => service.id === id);
    setServiceName(serviceToEdit.name);
    setServiceDescription(serviceToEdit.description);
    setEditMode(true);
    setCurrentServiceId(id);
  };

  const handleDelete = (id) => {
    setDeleteServiceId(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    axios.delete(`http://localhost:8080/admin/services/${deleteServiceId}`)
      .then(() => {
        setAvailableServices(availableServices.filter((service) => service.id !== deleteServiceId));
        setIsDeleteModalOpen(false);
      })
      .catch(error => {
        console.error('There was an error deleting the service!', error);
      });
  };

  const closeModal = () => {
    setIsSuccessModalOpen(false);
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="bg-gray-100 pt-20">
      <AdminNavbar />

      <div className="p-6">
        <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">{editMode ? 'Edit Service' : 'Add New Service'}</h1>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="serviceName">
                Service Name
              </label>
              <input
                type="text"
                id="serviceName"
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md"
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
                required
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="serviceDescription">
                Service Description (Optional)
              </label>
              <textarea
                id="serviceDescription"
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md"
                rows="4"
                value={serviceDescription}
                onChange={(e) => setServiceDescription(e.target.value)}
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            >
              {editMode ? 'Update Service' : 'Add Service'}
            </button>
          </form>
        </div>

        <div className="w-full max-w-4xl mx-auto mt-6 overflow-x-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Available Services</h2>
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="px-6 py-3 text-left">Service Name</th>
                <th className="px-6 py-3 text-left">Description</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {availableServices.map((service) => (
                <tr key={service.id} className={`border-b ${currentServiceId === service.id ? 'bg-yellow-100' : ''}`}>
                  <td className="px-6 py-3">{service.name}</td>
                  <td className="px-6 py-3">{service.description}</td>
                  <td className="px-6 py-3 flex justify-start space-x-4">
                    <button
                      onClick={() => handleEdit(service.id)}
                      className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(service.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isSuccessModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold text-green-600">Success</h2>
            <p className="mt-2 text-gray-700">Your changes have been successfully saved!</p>
            <button
              onClick={closeModal}
              className="mt-4 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold text-red-600">Are you sure?</h2>
            <p className="mt-2 text-gray-700">You are about to delete this service. This action cannot be undone.</p>
            <div className="flex justify-between mt-4">
              <button
                onClick={confirmDelete}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                Yes, Delete
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashBoard;
