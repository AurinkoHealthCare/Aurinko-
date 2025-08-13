import React, { useState } from "react";
import axios from "../../../../../api/axios";

const SixImageUploader = () => {
  const [category, setCategory] = useState("");
  const [files, setFiles] = useState(Array(6).fill(null));
  const [names, setNames] = useState(Array(6).fill(""));
  const [previews, setPreviews] = useState(Array(6).fill(null));
  const [loading, setLoading] = useState(false);

  const categories = [
    { value: "", label: "Select Category" },
    { value: "Human", label: "Human" },
    { value: "Veterinary", label: "Veterinary" },
    { value: "Agriculture", label: "Agriculture" },
  ];

  const handleFileChange = (index, file) => {
    const updatedFiles = [...files];
    updatedFiles[index] = file;
    setFiles(updatedFiles);

    const updatedPreviews = [...previews];
    updatedPreviews[index] = file ? URL.createObjectURL(file) : null;
    setPreviews(updatedPreviews);
  };

  const handleNameChange = (index, value) => {
    const updatedNames = [...names];
    updatedNames[index] = value;
    setNames(updatedNames);
  };

  const handleUpload = async () => {
    if (!category) {
      alert("Please select a category first.");
      return;
    }

    setLoading(true);
    const formData = new FormData();

    files.forEach((file, i) => {
      if (file) {
        formData.append("files", file);
        formData.append("names", names[i] || file.name); // ✅ Backend match
        formData.append("categories", category); // ✅ Backend match
      }
    });

    try {
      const res = await axios.post("/brochures/all", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("✅ Upload successful");
      console.log(res.data);

      setCategory("");
      setFiles(Array(6).fill(null));
      setPreviews(Array(6).fill(null));
      setNames(Array(6).fill(""));
    } catch (err) {
      console.error(err);
      alert("❌ Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h2 className="text-3xl font-extrabold mb-8 text-gray-800 text-center tracking-tight">
        📂 Add Images
      </h2>

      <div className="mb-8">
        <label className="block mb-2 text-base font-semibold text-gray-700">
          Select Category
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 rounded-xl p-3 w-full focus:outline-none focus:ring-4 focus:ring-blue-300 bg-white shadow-sm"
        >
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-2xl p-4 bg-white shadow-md flex flex-col items-center gap-3"
          >
            <label className="w-full h-32 flex items-center justify-center overflow-hidden cursor-pointer bg-gray-100 border border-gray-300">
              {previews[index] ? (
                <img
                  src={previews[index]}
                  alt={`Preview ${index}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-400 text-sm text-center px-2">
                  Click to Upload
                </span>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(index, e.target.files[0])}
                className="hidden"
              />
            </label>

            <input
              type="text"
              placeholder="Enter image name"
              value={names[index]}
              onChange={(e) => handleNameChange(index, e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
        ))}
      </div>

      <button
        onClick={handleUpload}
        disabled={loading}
        className="mt-8 p-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-4 rounded-xl text-lg font-semibold transition-all shadow-lg disabled:opacity-50"
      >
        {loading ? "Uploading..." : "✅ Upload"}
      </button>
    </div>
  );
};

export default SixImageUploader;
