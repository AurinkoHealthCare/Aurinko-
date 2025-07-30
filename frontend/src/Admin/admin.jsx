import React, { useState } from 'react';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    password: '',
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('/auth/login', formData);
      alert(res.data.message || 'Login success ✅');
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed ❌');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/Assets/AurinkoHome1.png"
          alt="Background"
          className="w-full h-full object-cover filter blur-md brightness-50"
        />
      </div>

      {/* Overlay Form */}
      <form
        onSubmit={handleLogin}
        className="z-10 backdrop-blur-lg bg-white/10 border border-white/30 text-white p-10 m-4 rounded-3xl shadow-2xl w-full max-w-md space-y-6"
      >
        <h2 className="text-3xl font-semibold text-center">Admin Login</h2>

        <div className="space-y-4">
          <input
            name="name"
            placeholder="Name"
            onChange={handleChange}
            value={formData.name}
            className="w-full p-3 rounded-md bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            name="role"
            placeholder="Role"
            onChange={handleChange}
            value={formData.role}
            className="w-full p-3 rounded-md bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            value={formData.password}
            className="w-full p-3 rounded-md bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 transition-all duration-200 text-white rounded-md font-semibold tracking-wide"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
