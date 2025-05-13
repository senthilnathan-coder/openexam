import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(credentials.email, credentials.password, 'admin');
      navigate('/admin/dashboard');
    } catch (error) {
      setError('Invalid admin credentials');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-purple-900 flex items-center justify-center">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Admin Login</h2>
        {error && <div className="bg-red-500/10 text-red-400 p-3 rounded-lg mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="text-white block mb-2">Email</label>
              <input
                type="email"
                className="w-full bg-white/5 rounded-lg border border-purple-500/30 p-3 text-white"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="text-white block mb-2">Password</label>
              <input
                type="password"
                className="w-full bg-white/5 rounded-lg border border-purple-500/30 p-3 text-white"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;