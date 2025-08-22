import { useState } from "react";
import axios from "../../../../api/axios";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ReviewForm = () => {
  const [form, setForm] = useState({ name: "", email: "", rating: 0, comment: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  function update(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) {
      e.email = "Email is required";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)) {
      e.email = "Invalid email format";
    }
    if (form.rating < 1) e.rating = "Please select a rating";
    if (!form.comment.trim()) e.comment = "Please add your review";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    try {
      setLoading(true);
      await axios.post("/reviews/add", form);
      toast.success("✅ Thank you! Your review has been submitted.");
      setForm({ name: "", email: "", rating: 0, comment: "" });
    } catch (err) {
      toast.error(err.response?.data?.error || "❌ Something went wrong!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center px-4 py-10 gap-8">
      
      {/* Left Side - Image */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full md:w-1/2 flex justify-center"
      >
        <img
          src="/Assets/review/review.avif" // 👈 apni image ka path daaliye
          alt="Review Illustration"
          className="rounded-2xl shadow-lg max-h-[400px] object-cover"
        />
      </motion.div>

      {/* Right Side - Form */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full md:w-1/2 p-8 bg-white"
      >
        {/* Company Name */}
        <h2 className="text-3xl font-extrabold text-center mb-2">
          <span className="text-green-800">Aurinko</span>{" "}
          <span className="text-red-800">One Health</span>
        </h2>

        <p className="text-center text-gray-500 mb-6 text-sm">
          Your feedback helps us care better 💙
        </p>

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              className={`w-full border rounded-xl px-4 py-2.5 text-gray-800 focus:ring-2 focus:ring-green-500 outline-none transition ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your name"
            />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              className={`w-full border rounded-xl px-4 py-2.5 text-gray-800 focus:ring-2 focus:ring-green-500 outline-none transition ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rating
            </label>
            <StarRating value={form.rating} onChange={(v) => update("rating", v)} />
            {errors.rating && <p className="text-xs text-red-500 mt-1">{errors.rating}</p>}
          </div>

          {/* Comment */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Comment
            </label>
            <textarea
              rows={3}
              value={form.comment}
              onChange={(e) => update("comment", e.target.value)}
              className={`w-full border rounded-xl px-4 py-2.5 text-gray-800 focus:ring-2 focus:ring-green-500 outline-none transition ${
                errors.comment ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Write your thoughts..."
            />
            {errors.comment && (
              <p className="text-xs text-red-500 mt-1">{errors.comment}</p>
            )}
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            type="submit"
            disabled={loading}
            className="w-full bg-green-800 text-white py-3 rounded-xl font-semibold shadow-md hover:bg-green-700 transition disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Review"}
          </motion.button>
        </form>

        <ToastContainer position="bottom-center" autoClose={3000} />
      </motion.div>
    </div>
  );
};

function StarRating({ value, onChange }) {
  const stars = [1, 2, 3, 4, 5];
  return (
    <div className="flex gap-2">
      {stars.map((n) => (
        <motion.button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          whileHover={{ scale: 1.2, rotate: -5 }}
          whileTap={{ scale: 0.9 }}
          className={`text-3xl transition-colors ${
            n <= value ? "text-yellow-400 drop-shadow" : "text-gray-300"
          }`}
        >
          ★
        </motion.button>
      ))}
    </div>
  );
}

export default ReviewForm;
