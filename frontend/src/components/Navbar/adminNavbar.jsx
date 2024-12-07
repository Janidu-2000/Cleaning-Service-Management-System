import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("adminToken"); 
    navigate("/login"); 
  };

  return (
    <nav className="bg-blue-600 text-white p-4 fixed w-full top-0 z-50 shadow-md">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Cleaning Service Management System</h1>

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
            to="/adminDashboard"
            className={`hover:text-gray-300 transition ${
              isActive("/adminDashboard") ? "font-bold" : ""
            }`}
          >
            Dashboard
          </Link>
          <Link
            to="/Bookings"
            className={`hover:text-gray-300 transition ${
              isActive("/Bookings") ? "font-bold" : ""
            }`}
          >
            Bookings
          </Link>
          <button
            onClick={handleLogout}
            className="hover:text-gray-300 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Mobile Menu (when toggled open) */}
      {isMenuOpen && (
        <div className="lg:hidden bg-blue-600 text-white p-4 flex flex-col gap-y-4">
          <Link
            to="/adminDashboard"
            className={`hover:text-gray-300 transition ${
              isActive("/adminDashboard") ? "font-bold" : ""
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            to="/Bookings"
            className={`hover:text-gray-300 transition ${
              isActive("/Bookings") ? "font-bold" : ""
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Bookings
          </Link>
          <button
            onClick={() => {
              setIsMenuOpen(false);
              handleLogout();
            }}
            className="hover:text-gray-300 transition"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default AdminNavbar;
