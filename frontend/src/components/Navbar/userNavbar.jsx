import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const UserNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();  
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path ? 'font-bold' : '';

  const handleLogout = () => {
    localStorage.removeItem('userToken'); 
    navigate('/login'); 
  };

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Cleaning Service</h1>

        {/* Mobile Menu Toggle Button */}
        <button
          className="lg:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Desktop Menu */}
        <div className="hidden lg:flex space-x-4 items-center">
          <Link
            to="/DashBoard"
            className={`text-white hover:text-gray-300 transition ${isActive('/DashBoard')}`}
          >
            DashBoard
          </Link>
          <Link
            to="/UserBookings"
            className={`text-white hover:text-gray-300 transition ${isActive('/UserBookings')}`}
          >
            User Bookings
          </Link>
          <button
            onClick={handleLogout}
            className="text-white hover:text-gray-300 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Mobile Menu (when toggled open) */}
      {isMenuOpen && (
        <div className="lg:hidden bg-blue-600 text-white p-4 flex flex-col gap-y-4">
          <Link
            to="/DashBoard"
            className={`text-white hover:text-gray-300 transition ${isActive('/DashBoard')}`}
            onClick={() => setIsMenuOpen(false)}
          >
            DashBoard
          </Link>
          <Link
            to="/UserBookings"
            className={`text-white hover:text-gray-300 transition ${isActive('/UserBookings')}`}
            onClick={() => setIsMenuOpen(false)}
          >
            User Bookings
          </Link>
          <button
            onClick={() => {
              setIsMenuOpen(false);
              handleLogout();
            }}
            className="text-white hover:text-gray-300 transition"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default UserNavbar;
