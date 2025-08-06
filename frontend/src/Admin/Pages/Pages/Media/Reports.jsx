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

function Report({ onUpload }) {
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
    <div className="max-w-lg mx-auto mt-10 bg-white shadow-xl rounded-3xl overflow-hidden transition-all duration-500">
      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-700 via-blue-600 to-blue-500 p-6 text-center rounded-b-3xl">
        <FileText className="w-12 h-12 text-white mx-auto mb-3" />
        <h3 className="text-2xl font-bold text-white">Upload a PDF</h3>
        <p className="text-indigo-200 text-sm mt-1">
          Effortlessly upload and manage your documents
        </p>
      </div>

      {/* Form */}
      <div className="p-7">
        <form onSubmit={handleUpload} className="space-y-6">
          {/* Title input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              PDF Title
            </label>
            <input
              type="text"
              placeholder="Enter a title for the PDF"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-gray-300 p-3 rounded-xl w-full focus:ring-2 focus:ring-indigo-500 outline-none shadow-inner bg-gray-50"
              disabled={loading}
            />
          </div>

          {/* Category dropdown */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-gray-300 p-3 rounded-xl w-full focus:ring-2 focus:ring-indigo-500 outline-none shadow-inner bg-gray-50"
              disabled={loading}
            >
              <option value="Reports">Reports</option>
              <option value="Articles">Articles</option>
            </select>
          </div>

          {/* File input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              PDF File
            </label>
            <div
              className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-indigo-600 hover:bg-indigo-50 transition-all"
              onClick={() => fileInputRef.current.click()}
            >
              <Upload className="w-9 h-9 mx-auto text-indigo-500 mb-2" />
              <p className="text-sm text-gray-600">
                {file ? (
                  <span className="font-medium text-gray-800">
                    📂 {file.name}
                  </span>
                ) : (
                  "Click to browse and select a PDF"
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
            className={`w-full py-3 px-4 rounded-xl text-white font-semibold flex justify-center items-center gap-2 transition-all duration-300 shadow-md ${
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
            className={`text-center mt-5 text-base font-semibold ${
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

export default Report;
