import { useEffect, useState } from "react";
import axios from "../api/axios";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function ReviewManager() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/reviews/all");
      setReviews(data);
    } catch (err) {
      console.error("Error fetching reviews:", err);
    }
    setLoading(false);
  };

  const approveReview = async (id) => {
    try {
      await axios.patch(`/reviews/${id}/approve`);
      fetchReviews();
    } catch (err) {
      console.error("Error approving review:", err);
    }
  };

  const deleteReview = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(`/reviews/${id}`);
      fetchReviews();
    } catch (err) {
      console.error("Error deleting review:", err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto mt-10">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Review Management
      </h1>

      {loading ? (
        <p className="text-center text-gray-600">Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p className="text-center text-gray-500 italic">No reviews found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r) => (
            <motion.div
              key={r._id}
              className="bg-white rounded-3xl shadow-lg p-6 flex flex-col justify-between hover:shadow-2xl transform hover:-translate-y-1 transition-all"
            >
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-800">{r.name}</h3>
                <p className="text-sm text-gray-500">{r.email}</p>

                <div className="flex items-center mt-2">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span
                      key={i}
                      className={`text-2xl ${i < r.rating ? "text-yellow-400" : "text-gray-300"}`}
                    >
                      ★
                    </span>
                  ))}
                  <span className="ml-2 text-sm font-medium text-gray-600">{r.rating}/5</span>
                </div>

                <p
                  className={`mt-2 inline-block px-3 py-1 text-sm rounded-full font-semibold ${
                    r.approved ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {r.approved ? "Approved" : "Pending"}
                </p>

                <p className="mt-3 text-gray-700 line-clamp-3">{r.comment}</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setSelected(r)}
                  className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-gray-700 font-medium text-sm transition"
                >
                  View
                </button>
                {!r.approved && (
                  <button
                    onClick={() => approveReview(r._id)}
                    className="flex-1 px-4 py-2 bg-green-100 hover:bg-green-200 rounded-xl text-green-700 font-medium text-sm transition"
                  >
                    Confirm
                  </button>
                )}
                <button
                  onClick={() => deleteReview(r._id)}
                  className="flex-1 px-4 py-2 bg-red-100 hover:bg-red-200 rounded-xl text-red-700 font-medium text-sm transition"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              className="bg-white/95 backdrop-blur-md rounded-2xl shadow-lg p-6 w-full max-w-md relative"
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              >
                <X size={22} />
              </button>

              <h2 className="text-xl font-semibold mb-4 text-gray-800">Review Details</h2>
              <p className="mb-2"><strong>Name:</strong> {selected.name}</p>
              <p className="mb-2"><strong>Email:</strong> {selected.email}</p>
              <p className="mb-2"><strong>Rating:</strong> ⭐ {selected.rating}</p>
              <p className="mb-2">
                <strong>Status:</strong>{" "}
                {selected.approved ? (
                  <span className="text-green-600 font-medium">Approved</span>
                ) : (
                  <span className="text-orange-500 font-medium">Pending</span>
                )}
              </p>
              <p className="mt-3 text-gray-700 leading-relaxed">{selected.comment}</p>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setSelected(null)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
