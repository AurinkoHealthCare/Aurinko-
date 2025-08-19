// src/pages/Unauthorized.jsx
import { Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white shadow-2xl rounded-3xl p-10 text-center max-w-md"
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className="flex justify-center mb-6"
        >
          <div className="bg-red-100 p-5 rounded-full shadow-inner">
            <Lock className="w-12 h-12 text-red-600" />
          </div>
        </motion.div>

        {/* Title */}
        <h1 className="text-3xl font-extrabold text-red-600 tracking-tight">
          Access Denied
        </h1>
        <p className="text-gray-600 mt-3 text-base">
          You are not authorized to view this page.
        </p>

        {/* Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/")}
          className="mt-6 w-full px-5 py-3 bg-red-600 text-white font-medium rounded-xl shadow-md hover:bg-red-700 transition"
        >
          Go Back Home
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Unauthorized;
