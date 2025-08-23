import React, { useState } from "react";
import axios from "../../../../../api/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LANGUAGES = ["en", "ar", "es", "fr", "ko"];

const AddFaculty = () => {
  const [formData, setFormData] = useState({
    name: LANGUAGES.reduce((acc, lang) => ({ ...acc, [lang]: "" }), {}),
    designation: LANGUAGES.reduce((acc, lang) => ({ ...acc, [lang]: "" }), {}),
    bio: LANGUAGES.reduce((acc, lang) => ({ ...acc, [lang]: "" }), {}),
    image: null,
  });

  const [activeLang, setActiveLang] = useState("en");

  const handleInputChange = (field, lang, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: { ...prev[field], [lang]: value },
    }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0] || null,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("name", JSON.stringify(formData.name));
      data.append("designation", JSON.stringify(formData.designation));
      data.append("bio", JSON.stringify(formData.bio));

      if (formData.image) {
        data.append("image", formData.image);
      }

      await axios.post("/faculty/add", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("✅ Faculty added successfully!");
      window.scrollTo({ top: 0, behavior: "smooth" });

      setFormData({
        name: LANGUAGES.reduce((acc, lang) => ({ ...acc, [lang]: "" }), {}),
        designation: LANGUAGES.reduce((acc, lang) => ({ ...acc, [lang]: "" }), {}),
        bio: LANGUAGES.reduce((acc, lang) => ({ ...acc, [lang]: "" }), {}),
        image: null,
      });
    } catch (err) {
      console.error(err);
      toast.error("❌ Upload failed!");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Add New Faculty
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg max-w-3xl mx-auto space-y-6"
      >
        {/* ✅ Language Tabs */}
        <div className="flex justify-center gap-2">
          {LANGUAGES.map((lang) => (
            <button
              key={lang}
              type="button"
              onClick={() => setActiveLang(lang)}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                activeLang === lang
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>

        {/* ✅ Dynamic Inputs */}
        <div className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Name</label>
            <input
              type="text"
              placeholder={`Name (${activeLang.toUpperCase()})`}
              value={formData.name[activeLang]}
              onChange={(e) =>
                handleInputChange("name", activeLang, e.target.value)
              }
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Designation</label>
            <input
              type="text"
              placeholder={`Designation (${activeLang.toUpperCase()})`}
              value={formData.designation[activeLang]}
              onChange={(e) =>
                handleInputChange("designation", activeLang, e.target.value)
              }
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Bio</label>
            <textarea
              placeholder={`Bio (${activeLang.toUpperCase()})`}
              rows="4"
              value={formData.bio[activeLang]}
              onChange={(e) =>
                handleInputChange("bio", activeLang, e.target.value)
              }
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* ✅ Image Upload */}
        <div>
          <label className="block font-semibold mb-2">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mb-3"
          />
          {formData.image && (
            <div className="relative w-28 h-28">
              <img
                src={URL.createObjectURL(formData.image)}
                alt="Preview"
                className="w-full h-full object-cover rounded-xl border"
              />
              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({ ...prev, image: null }))
                }
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow"
              >
                ×
              </button>
            </div>
          )}
        </div>

        {/* ✅ Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          ➕ Add Faculty
        </button>
      </form>

      <ToastContainer position="top-center" />
    </div>
  );
};

export default AddFaculty;
