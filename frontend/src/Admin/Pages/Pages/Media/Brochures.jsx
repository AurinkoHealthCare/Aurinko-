import React, { useState } from "react";
import axios from "../../../../../api/axios";

export default function SixImageUploader() {
  const [files, setFiles] = useState(Array(6).fill(null));
  const [previews, setPreviews] = useState(Array(6).fill(null));
  const [names, setNames] = useState(Array(6).fill(""));
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    const formData = new FormData();
    files.forEach((file, i) => {
      if (file) {
        formData.append("images", file);
        formData.append("names", names[i]);
      }
    });
    try {
      const res = await axios.post("/brochures/all", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Upload successful");
      console.log(res.data);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-2xl shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Upload 6 Images</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="border border-gray-300 p-4 rounded-xl flex flex-col items-center bg-gray-50 shadow-sm hover:shadow-md transition"
          >
            <div className="w-28 h-28 flex items-center justify-center mb-3">
              {previews[index] ? (
                <img
                  src={previews[index]}
                  alt={`Preview ${index}`}
                  className="w-28 h-28 object-cover rounded-lg"
                />
              ) : (
                <div className="w-28 h-28 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-sm">
                  No Image
                </div>
              )}
            </div>
            <label className="cursor-pointer bg-blue-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-600 mb-3">
              Choose File
              <input
                type="file"
                onChange={(e) => handleFileChange(index, e.target.files[0])}
                className="hidden"
              />
            </label>
            <input
              type="text"
              placeholder="Type image name"
              value={names[index]}
              onChange={(e) => handleNameChange(index, e.target.value)}
              className="border border-gray-300 rounded-lg p-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        ))}
      </div>
      <button
        onClick={handleUpload}
        disabled={loading}
        className="mt-6 w-full bg-green-500 text-white py-3 rounded-lg text-lg font-medium hover:bg-green-600 transition"
      >
        {loading ? "Uploading..." : "Upload All"}
      </button>
    </div>
  );
}
