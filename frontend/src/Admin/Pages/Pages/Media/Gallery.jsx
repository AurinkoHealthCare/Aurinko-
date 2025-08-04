// src/components/ImageUpload.js
import React, { useState } from "react";
import axios from "../../../../../api/axios";

export default function ImageUpload({ onUploadSuccess }) {
  const [files, setFiles] = useState(Array(6).fill(null));
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null); // ✅ Toast state

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000); // 3 सेकंड बाद हटेगा
  };

  const handleFileChange = (index, file) => {
    const newFiles = [...files];
    newFiles[index] = file;
    setFiles(newFiles);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    const selectedFiles = files.filter((f) => f !== null);
    if (selectedFiles.length === 0) {
      showToast("Please select at least 1 image", "error");
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach((file) => formData.append("images", file));

    setLoading(true);
    try {
      const response = await axios.post("/gallery/multiple", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 201 || response.status === 200) {
        showToast("Images uploaded successfully!", "success");
        setFiles(Array(6).fill(null));
        if (onUploadSuccess) onUploadSuccess();
      } else {
        showToast(response.data?.message || "Upload failed!", "error");
      }
    } catch (err) {
      console.error("Upload Error:", err);
      showToast(
        err.response?.data?.message ||
          err.message ||
          "Something went wrong during upload!",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-2xl mb-8 relative">
      {/* ✅ Toast UI */}
      {toast && (
        <div
          className={`fixed top-5 right-5 px-4 py-2 rounded shadow-lg text-white ${
            toast.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {toast.message}
        </div>
      )}

      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        Upload Up to 6 Images
      </h2>
      <form
        onSubmit={handleUpload}
        className="grid grid-cols-2 md:grid-cols-3 gap-6"
      >
        {files.map((file, index) => (
          <div
            key={index}
            className="border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center text-center bg-gray-50"
          >
            {file ? (
              <img
                src={URL.createObjectURL(file)}
                alt="preview"
                className="w-full h-32 object-cover rounded mb-3"
              />
            ) : (
              <span className="text-gray-500">Choose Image {index + 1}</span>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(index, e.target.files[0])}
              className="text-sm mt-2"
            />
          </div>
        ))}
        <div className="col-span-full flex justify-center mt-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
          >
            {loading ? "Uploading..." : "Upload All"}
          </button>
        </div>
      </form>
    </div>
  );
}
