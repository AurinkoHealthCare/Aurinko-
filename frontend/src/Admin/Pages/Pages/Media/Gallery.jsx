// src/components/Gallerys.js
import React, { useState } from "react";
import axios from "../../../../../api/axios";
import {
  Upload,
  Loader2,
  CheckCircle2,
  XCircle,
} from "lucide-react";

const Gallerys = ({ onUploadSuccess }) => {
  const [files, setFiles] = useState(Array(6).fill(null));
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleFileChange = (index, file) => {
    const newFiles = [...files];
    newFiles[index] = file;
    setFiles(newFiles);
  };

  const triggerFileInput = (index) => {
    document.getElementById(`file-input-${index}`).click();
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
        err.response?.data?.message || err.message || "Something went wrong!",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-white shadow-xl rounded-2xl mb-8 border border-gray-200 relative">
      {/* ✅ Toast */}
      {toast && (
        <div
          className={`fixed top-6 right-6 px-5 py-3 rounded-lg shadow-lg text-white flex items-center gap-2 text-sm font-medium ${toast.type === "success" ? "bg-green-600" : "bg-red-600"
            }`}
        >
          {toast.type === "success" ? (
            <CheckCircle2 className="w-5 h-5" />
          ) : (
            <XCircle className="w-5 h-5" />
          )}
          {toast.message}
        </div>
      )}

      <h2 className="text-3xl font-extrabold mb-8 text-gray-900 text-center">
        Upload Images
      </h2>

      <form
        onSubmit={handleUpload}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
      >
        {files.map((file, index) => (
          <div
            key={index}
            onClick={() => triggerFileInput(index)}
            className="relative border-2 border-gray-300 rounded-2xl flex items-center justify-center bg-gray-50 hover:bg-indigo-50 cursor-pointer transition shadow-md hover:shadow-lg min-h-[180px] overflow-hidden"
          >
            {file ? (
              <img
                src={URL.createObjectURL(file)}
                alt={`Image ${index + 1}`}
                className="w-full h-full object-cover rounded-xl"
              />
            ) : (
              <span className="text-gray-500 font-semibold text-lg">
                Image {index + 1}
              </span>
            )}
            <input
              id={`file-input-${index}`}
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(index, e.target.files[0])}
              className="hidden"
            />
          </div>
        ))}

        <div className="col-span-full flex justify-center mt-6">
          <button
            type="submit"
            disabled={loading}
            className={`px-8 py-3 rounded-xl font-semibold flex items-center gap-2 transition shadow-lg text-white ${loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700"
              }`}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin w-5 h-5" /> Uploading...
              </>
            ) : (
              <>
                <Upload className="w-5 h-5" /> Upload All
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Gallerys;