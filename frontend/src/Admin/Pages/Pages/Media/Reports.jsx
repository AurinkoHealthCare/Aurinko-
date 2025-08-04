import React, { useState, useRef } from "react";
import axios from "../../../../../api/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FileText, Loader2, Upload } from "lucide-react";

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

      setTitle("");
      setFile(null);
      setCategory("Reports");
      if (fileInputRef.current) fileInputRef.current.value = "";

      toast.success("✅ PDF uploaded successfully!");
      setStatusMsg("✅ PDF uploaded successfully!");

      if (typeof onUpload === "function") onUpload();
    } catch (err) {
      console.error("Error uploading PDF:", err);
      handleAxiosError(err);
      setStatusMsg("❌ Upload failed. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-5 text-center">
        <FileText className="w-10 h-10 text-white mx-auto mb-2" />
        <h3 className="text-xl font-bold text-white">Upload a PDF</h3>
        <p className="text-indigo-200 text-sm">Easily upload and manage your documents</p>
      </div>

      {/* Form */}
      <div className="p-6">
        <form onSubmit={handleUpload} className="space-y-5">
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
              className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm"
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
              className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm"
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
            <div
              className="border-2 border-dashed border-gray-300 rounded-xl p-5 text-center cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition"
              onClick={() => fileInputRef.current.click()}
            >
              <Upload className="w-8 h-8 mx-auto text-indigo-500 mb-2" />
              <p className="text-sm text-gray-600">
                {file ? (
                  <span className="font-medium text-gray-800">
                    📂 {file.name}
                  </span>
                ) : (
                  "Click to select a PDF file"
                )}
              </p>
            </div>
            <input
              type="file"
              accept="application/pdf"
              ref={fileInputRef}
              onChange={(e) => setFile(e.target.files[0])}
              className="hidden"
              disabled={loading}
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg text-white font-semibold flex justify-center items-center gap-2 transition-all shadow-md ${
              loading
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
                <Upload className="w-5 h-5" /> Upload PDF
              </>
            )}
          </button>
        </form>

        {/* Status message */}
        {statusMsg && (
          <p
            className={`text-center mt-5 font-medium ${
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
    </div>
  );
}

export default PdfUpload;
