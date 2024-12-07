import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineUser, HiOutlineLockClosed } from "react-icons/hi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = { username, password };

    try {
      const response = await fetch("http://localhost:8080/users/login", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        throw new Error("Invalid username or password");
      }

      const userData = await response.json();

      if (userData && userData.role) {
        if (userData.role === "User") {
          navigate("/dashboard"); 
        } else if (userData.role === "Admin") {
          navigate("/admindashboard"); 
        }
      } else {
        alert("Incorrect username or password.");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const handleNavigateToUserCreate = () => {
    navigate("/UserCreate"); 
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 md:px-12 bg-blue-50">
      <div className="max-w-md w-full bg-white p-6 flex items-center justify-center transition-all duration-300 rounded-lg shadow-lg">
        <div className="w-full">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-600 text-center mb-4 transition-all duration-300">
            USER LOGIN
          </h2>
          <p className="text-sm md:text-base text-gray-500 text-center mb-8 transition-all duration-300">
            Welcome to the CSM System
          </p>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block">
                <span className="flex items-center bg-blue-100 rounded-md px-4 py-2 transition-all duration-300">
                  <HiOutlineUser className="text-blue-500 mr-3 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-transparent outline-none flex-1 text-gray-700"
                  />
                </span>
              </label>
            </div>
            <div>
              <label className="block">
                <span className="flex items-center bg-blue-100 rounded-md px-4 py-2 transition-all duration-300 relative">
                  <HiOutlineLockClosed className="text-blue-500 mr-3 w-5 h-5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-transparent outline-none flex-1 text-gray-700"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 text-gray-500 hover:text-gray-700 transition"
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible className="w-5 h-5" />
                    ) : (
                      <AiOutlineEye className="w-5 h-5" />
                    )}
                  </button>
                </span>
              </label>
            </div>
            <div className="flex justify-between items-center text-sm md:text-base text-gray-500 transition-all duration-300">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Remember
              </label>
              <a href="#forgot-password" className="hover:underline text-blue-600">
                Forgot Password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 md:py-3 rounded-md font-semibold hover:from-blue-600 hover:to-blue-800 transition-all duration-300"
            >
              Login
            </button>
            <p className="text-center text-sm md:text-base text-gray-500 transition-all duration-300">
              <button
                type="button"
                onClick={handleNavigateToUserCreate}
                className="text-blue-600 hover:underline"
              >
                Create Account
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
