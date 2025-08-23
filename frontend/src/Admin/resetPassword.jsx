import React, { useState } from "react";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";

const ResetPasswordPage = () => {
  const [formData, setFormData] = useState({ name: "", otp: "", newPassword: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // Inline error
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Clear previous errors

    try {
      const res = await axios.post("/auth/reset-password", formData);
      alert(res.data.message || "Password reset successful ✅");
      navigate("/AurinkoOne"); // Redirect to login or home
    } catch (err) {
      setError(err.response?.data?.message || "Reset failed ❌");
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

      <form
        onSubmit={handleReset}
        className="z-10 backdrop-blur-lg bg-white/10 border border-white/30 text-white p-10 m-4 rounded-3xl shadow-2xl w-full max-w-md space-y-6"
      >
        <h2 className="text-3xl font-semibold text-center">Reset Password</h2>

        <input
          name="name"
          placeholder="Admin Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 rounded-md bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          name="otp"
          placeholder="Enter OTP"
          value={formData.otp}
          onChange={handleChange}
          className="w-full p-3 rounded-md bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={formData.newPassword}
          onChange={handleChange}
          className="w-full p-3 rounded-md bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        {/* Inline Error */}
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 transition-all duration-200 text-white rounded-md font-semibold tracking-wide"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
