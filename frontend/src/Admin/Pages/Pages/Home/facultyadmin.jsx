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

      toast.success("Faculty added successfully!");
      setFormData({
        name: LANGUAGES.reduce((acc, lang) => ({ ...acc, [lang]: "" }), {}),
        designation: LANGUAGES.reduce((acc, lang) => ({ ...acc, [lang]: "" }), {}),
        bio: LANGUAGES.reduce((acc, lang) => ({ ...acc, [lang]: "" }), {}),
        image: null,
      });
    } catch (err) {
      console.error(err);
      toast.error("Upload failed!");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">Add New Faculty</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md max-w-3xl mx-auto space-y-4"
      >
        {["name", "designation", "bio"].map((field) => (
          <div key={field} className="space-y-2 border-b pb-2">
            <h3 className="font-semibold">{field.toUpperCase()}</h3>
            {LANGUAGES.map((lang) => (
              <input
                key={lang}
                type="text"
                placeholder={`${field} (${lang.toUpperCase()})`}
                value={formData[field][lang]}
                onChange={(e) => handleInputChange(field, lang, e.target.value)}
                className="w-full border rounded p-2"
              />
            ))}
          </div>
        ))}

        {/* Single Image Upload */}
        <div>
          <label className="block font-semibold mb-2">Upload Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} className="mb-2" />
          {formData.image && (
            <div className="relative w-24 h-24">
              <img
                src={URL.createObjectURL(formData.image)}
                alt="Preview"
                className="w-full h-full object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, image: null }))}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
              >
                X
              </button>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Add Faculty
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddFaculty;
