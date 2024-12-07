import React, { useState } from 'react';
import { HiOutlineUser, HiOutlineLockClosed } from 'react-icons/hi'; 
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom'; 

function UserCreate() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('User');
  const [showPassword, setShowPassword] = useState(false); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); 

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    const userData = {
      username,
      password,
      role,
    };

    try {
      const response = await fetch('http://localhost:8080/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Failed to create user');
      }

      const responseData = await response.json();
      console.log('User created:', responseData);

      alert('User created successfully!');
      
      navigate('/login'); 

      setUsername('');
      setPassword('');
      setRole('User');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 md:px-12 bg-blue-50">
      <div className="max-w-md w-full bg-white p-6 flex items-center justify-center transition-all duration-300 rounded-lg shadow-lg">
        <div className="w-full">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-600 text-center mb-4 transition-all duration-300">
            CREATE USER ACCOUNT
          </h2>
          <p className="text-sm md:text-base text-gray-500 text-center mb-8 transition-all duration-300">
            Fill in the details to create a new account
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
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

            <div>
              <label className="block">
                <span className="flex items-center bg-blue-100 rounded-md px-4 py-2 transition-all duration-300">
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="bg-transparent outline-none flex-1 text-gray-700"
                  >
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                  </select>
                </span>
              </label>
            </div>

            {error && (
              <div className="text-red-500 text-center">
                <p>{error}</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 md:py-3 rounded-md font-semibold hover:from-blue-600 hover:to-blue-800 transition-all duration-300"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Account'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserCreate;
