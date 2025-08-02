import React, { useState, useRef } from "react";
import axios from "../../../../../api/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const handleAxiosError = (err) => {
  if (err.response) {
    toast.error(
      `❌ [${err.response.status}] ${
        err.response.data?.message || "Something went wrong!"
      }`
    );
  } else if (err.request) {
    toast.error("❌ No response from server. Please try again!");
  } else {
    toast.error(`❌ Request error: ${err.message}`);
  }
};

function PdfUpload({ onUpload }) {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("Reports");
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const fileInputRef = useRef(null);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!title.trim() || !file) {
      toast.warn("⚠️ Please enter a title and select a PDF!");
      setStatusMsg("⚠️ Please enter a title and select a PDF!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title.trim());
    formData.append("category", category);
    formData.append("pdf", file);

    try {
      setLoading(true);
      setStatusMsg("⏳ Uploading...");

      await axios.post("/pdf/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Reset form
      setTitle("");
      setFile(null);
      setCategory("Reports");
      if (fileInputRef.current) fileInputRef.current.value = "";

      toast.success("✅ PDF uploaded successfully!");
      setStatusMsg("✅ PDF uploaded successfully!");

      if (typeof onUpload === "function") {
        onUpload(); // refresh list after upload
      }
    } catch (err) {
      console.error("Error uploading PDF:", err);
      handleAxiosError(err);
      setStatusMsg("❌ Upload failed. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6">
      <h3 className="text-xl font-bold mb-5 text-gray-800 text-center">
        📄 Upload a PDF
      </h3>
      <form onSubmit={handleUpload} className="space-y-4">
        {/* Title input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            placeholder="Enter PDF Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 p-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none"
            disabled={loading}
          />
        </div>

        {/* Category dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 p-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none"
            disabled={loading}
          >
            <option value="Reports">Reports</option>
            <option value="Articles">Articles</option>
          </select>
        </div>

        {/* File input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select PDF
          </label>
          <input
            type="file"
            accept="application/pdf"
            ref={fileInputRef}
            onChange={(e) => setFile(e.target.files[0])}
            className="border border-gray-300 p-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none"
            disabled={loading}
          />
          {file && (
            <p className="text-sm text-gray-500 mt-1">📂 {file.name}</p>
          )}
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded-lg text-white font-semibold transition-colors ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Uploading..." : "Upload PDF"}
        </button>
      </form>

      {/* Status message */}
      {statusMsg && (
        <p
          className={`text-center mt-4 font-medium ${
            statusMsg.includes("✅")
              ? "text-green-600"
              : statusMsg.includes("⚠️")
              ? "text-yellow-600"
              : statusMsg.includes("❌")
              ? "text-red-600"
              : "text-gray-700"
          }`}
        >
          {statusMsg}
        </p>
      )}
    </div>
  );
}

export default PdfUpload;
