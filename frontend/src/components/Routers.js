import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./LoginPage/Login";
import DashBoard from "./DashBoard/DashBoard";
import UserBookings from "./UserBookings/userBookings";
import AdminDashBoard from "./DashBoard/AdminDashBoard"; 
import Bookings from "./UserBookings/Bookings";
import UserCreate from "./LoginPage/UserCreate";

const Routers = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/login" element={<Login />} />
        <Route path="/DashBoard" element={<DashBoard />} />
        <Route path="/UserBookings" element={<UserBookings />} />
        <Route path="/AdminDashBoard" element={<AdminDashBoard />} />
        <Route path="/Bookings" element={<Bookings />} />
        <Route path="/UserCreate" element={<UserCreate />} />
      </Routes>
    </Router>
  );
};

export default Routers;
