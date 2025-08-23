import React, { useState } from 'react';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

  const navigate = useNavigate();

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

  const handleForgotPassword = async () => {
    if (!formData.name || !formData.role) {
      return alert("⚠️ Please enter your Name and Role first");
    }
    setResetLoading(true);
    try {
      const res = await axios.post('/auth/forgot-password', {
        name: formData.name,
        role: formData.role,
      });
      alert(res.data.message || "OTP has been sent to Admin's email ✅");
      // Optionally navigate to reset page
      navigate('/reset-password');
    } catch (err) {
      alert(err.response?.data?.message || "Failed to send OTP ❌");
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0">
        <img
          src="/Assets/AurinkoHome1.png"
          alt="Background"
          className="w-full h-full object-cover opacity-20 blur-sm"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Form Card */}
      <form
        onSubmit={handleLogin}
        className="relative z-10 backdrop-blur-xl bg-white/10 border border-white/20 text-white p-8 md:p-10 rounded-2xl shadow-2xl w-[90%] max-w-md space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-white drop-shadow-lg">
          Admin Login
        </h2>
        <p className="text-center text-gray-300 text-sm">
          Sign in to manage your dashboard
        </p>

        <div className="space-y-4">
          <input
            name="name"
            placeholder="Enter Name"
            onChange={handleChange}
            value={formData.name}
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            required
          />
          <input
            name="role"
            placeholder="Enter Role"
            onChange={handleChange}
            value={formData.role}
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Enter Password"
            onChange={handleChange}
            value={formData.password}
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-200 text-white rounded-lg font-semibold tracking-wide shadow-lg"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <p className="text-center text-gray-400 text-sm">
          Forgot password?{' '}
          <button
            type="button"
            onClick={handleForgotPassword}
            disabled={resetLoading}
            className="text-blue-400 hover:underline cursor-pointer ml-1"
          >
            {resetLoading ? 'Sending...' : 'Reset'}
          </button>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
