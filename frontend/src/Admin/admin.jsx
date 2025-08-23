import React, { useState, useEffect } from "react";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [formData, setFormData] = useState({ name: "", role: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [error, setError] = useState("");
  const [lockTime, setLockTime] = useState(0); // seconds left for lock

  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (lockTime > 0) {
      timer = setInterval(() => setLockTime(prev => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [lockTime]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (lockTime > 0) return; // prevent login if locked
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("/auth/login", formData);
      navigate("/dashboard");
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed ❌";
      setError(msg);

      // extract remaining lock time if backend sends it
      const match = msg.match(/Try again in (\d+) seconds/);
      if (match) setLockTime(parseInt(match[1], 10));
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!formData.name || !formData.role) {
      return setError("⚠️ Please enter your Name and Role first");
    }
    setResetLoading(true);
    setError("");

    try {
      const res = await axios.post("/auth/forgot-password", { name: formData.name, role: formData.role });
      alert(res.data.message || "OTP has been sent to Admin's email ✅");
      navigate("/reset-password");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP ❌");
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
      <div className="absolute inset-0">
        <img src="/Assets/AurinkoHome1.png" alt="Background" className="w-full h-full object-cover opacity-20 blur-sm" />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <form onSubmit={handleLogin} className="relative z-10 backdrop-blur-xl bg-white/10 border border-white/20 text-white p-8 md:p-10 rounded-2xl shadow-2xl w-[90%] max-w-md space-y-6">
        <h2 className="text-3xl font-bold text-center text-white drop-shadow-lg">Admin Login</h2>
        <p className="text-center text-gray-300 text-sm">Sign in to manage your dashboard</p>

        <div className="space-y-4">
          <input name="name" placeholder="Enter Name" onChange={handleChange} value={formData.name} className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400 transition" required />
          <input name="role" placeholder="Enter Role" onChange={handleChange} value={formData.role} className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400 transition" required />
          <input name="password" type="password" placeholder="Enter Password" onChange={handleChange} value={formData.password} className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400 transition" required />
        </div>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        {lockTime > 0 && <p className="text-yellow-300 text-sm text-center">⏳ Please wait {lockTime} seconds before next attempt</p>}

        <button type="submit" disabled={loading || lockTime > 0} className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-200 text-white rounded-lg font-semibold tracking-wide shadow-lg">
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-gray-400 text-sm">
          Forgot password?{' '}
          <button type="button" onClick={handleForgotPassword} disabled={resetLoading} className="text-blue-400 hover:underline cursor-pointer ml-1">
            {resetLoading ? "Sending..." : "Reset"}
          </button>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
