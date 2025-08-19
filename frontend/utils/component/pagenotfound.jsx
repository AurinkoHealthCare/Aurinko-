import { useEffect } from "react";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Leaf, HeartPulse, PawPrint } from "lucide-react";

export default function NotFound404({ homeHref = "/" }) {
  useEffect(() => {
    document.title = "404 – Page Not Found";
  }, []);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white text-gray-800 p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl"
      >
        {/* Transparent Glass Card */}
        <div className="rounded-3xl border border-gray-200 bg-white/50 backdrop-blur-md shadow-lg p-10 text-center">
          {/* 404 Title */}
          <motion.h1
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-7xl md:text-8xl font-extrabold text-gray-900"
          >
            404
          </motion.h1>

          {/* Icons for Human, Animal, Agriculture */}
          <div className="flex justify-center gap-6 mt-6 text-indigo-600">
            <HeartPulse className="h-10 w-10" /> {/* Human health */}
            <PawPrint className="h-10 w-10 text-pink-500" /> {/* Animal health */}
            <Leaf className="h-10 w-10 text-green-600" /> {/* Agriculture */}
          </div>

          {/* Subtitle */}
          <p className="mt-6 text-gray-600 max-w-md mx-auto">
            Sorry, the page you’re looking for doesn’t exist.  
            But we care for **Humans, Animals & Agriculture** 🌱❤️🐾
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href={homeHref}
              className="flex items-center gap-2 rounded-full bg-indigo-600 hover:bg-indigo-700 px-5 py-2.5 text-sm font-medium text-white shadow-md transition"
            >
              <Home className="h-4 w-4" /> Go Home
            </a>
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 rounded-full bg-gray-200 hover:bg-gray-300 px-5 py-2.5 text-sm font-medium shadow-md transition"
            >
              <ArrowLeft className="h-4 w-4" /> Go Back
            </button>
          </div>
        </div>

        {/* Small Tip */}
        <p className="mt-6 text-center text-sm text-gray-500">
          Tip: Check the URL or navigate back to a safe page.
        </p>
      </motion.div>
    </div>
  );
}
