import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserShield, FaLock } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SuperAdminLogin = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  // Add dummy credentials
  const dummyCredentials = {
    username: 'admin',
    password: 'admin123'
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Check against dummy credentials
      if (credentials.username === dummyCredentials.username && 
          credentials.password === dummyCredentials.password) {
        // Simulate token creation
        const dummyToken = 'dummy-super-admin-token';
        localStorage.setItem('superAdminToken', dummyToken);
        toast.success('Login successful!');
        navigate('/super-admin/dashboard');
      } else {
        toast.error('Invalid credentials! Try admin/admin123');
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-6">
      <ToastContainer position="top-right" theme="dark" />
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <FaUserShield className="text-6xl text-blue-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-white mb-2">Super Admin Portal</h1>
          <p className="text-blue-200">Access system administration</p>
          {/* Add demo credentials hint */}
          <p className="text-xs text-blue-300 mt-2">Demo: admin / admin123</p>
        </div>

        <form onSubmit={handleLogin} className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl">
          <div className="space-y-6">
            <div>
              <label className="text-white block mb-2">Username</label>
              <div className="relative">
                <input
                  type="text"
                  value={credentials.username}
                  onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                  className="w-full p-4 pl-12 bg-black/20 border-2 border-blue-500/30 rounded-xl text-white placeholder-blue-200/50 focus:outline-none focus:border-blue-500"
                  placeholder="Enter your username"
                  required
                />
                <FaUserShield className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400" />
              </div>
            </div>

            <div>
              <label className="text-white block mb-2">Password</label>
              <div className="relative">
                <input
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  className="w-full p-4 pl-12 bg-black/20 border-2 border-blue-500/30 rounded-xl text-white placeholder-blue-200/50 focus:outline-none focus:border-blue-500"
                  placeholder="Enter your password"
                  required
                />
                <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all"
            >
              Login to Dashboard
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SuperAdminLogin;