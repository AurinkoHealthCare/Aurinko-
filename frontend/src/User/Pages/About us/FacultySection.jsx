import React, { useEffect, useState } from "react";
import axios from "../../../../api/axios";
import { useTranslation } from "react-i18next";

const FacultySection = () => {
  const { i18n } = useTranslation();
  const [faculties, setFaculties] = useState([]);

  // ✅ Fetch Faculties
  const fetchFaculties = async () => {
    try {
      const { data } = await axios.get("/faculty/get");
      setFaculties(data);
    } catch (err) {
      console.error("Failed to fetch faculty:", err);
    }
  };

  useEffect(() => {
    fetchFaculties();
  }, []);

  const currentLang = i18n.language || "en"; // ✅ fallback 'en'

  return (
    <section className="py-12 px-6">
      {/* Page Heading */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Our Leadership Team
        </h1>
        <p className="text-gray-600 mt-2">
          Meet the visionaries guiding our company towards excellence
        </p>
      </div>

      {/* Faculty Members */}
      <div className="flex flex-col gap-12 max-w-5xl mx-auto">
        {faculties.map((faculty) => (
          <div
            key={faculty._id}
            className="flex flex-col md:flex-row items-center gap-8 bg-white p-8 rounded-2xl shadow-md"
          >
            {/* Left: Image */}
            <div className="w-40 h-40 md:w-56 md:h-56 rounded-2xl overflow-hidden shadow-lg">
              {faculty.image?.url ? (
                <img
                  src={faculty.image.url}
                  alt={faculty.name?.[currentLang] || "Faculty"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
                  No Image
                </div>
              )}
            </div>

            {/* Right: Info */}
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold text-gray-800">
                {faculty.name?.[currentLang] || "No Name"}
              </h2>
              <p className="text-lg text-blue-600 font-semibold mt-1">
                {faculty.designation?.[currentLang] || "No Designation"}
              </p>
              <p className="text-gray-600 mt-3 leading-relaxed max-w-xl">
                {faculty.bio?.[currentLang] || "No Bio"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FacultySection;
