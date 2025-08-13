import React, { useState, useRef } from "react";
import axios from "../../../../../api/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FileText, Loader2, Upload } from "lucide-react";

const MAX_FILE_SIZE_MB = 10;

const initialForm = {
  title: "",
  details: "",
  category: "Reports",
  type: "",
};

const handleAxiosError = (err) => {
  if (err.response) {
    toast.error(
      `❌ [${err.response.status}] ${err.response.data?.error || "Something went wrong!"}`
    );
  } else if (err.request) {
    toast.error("❌ No response from server. Please try again!");
  } else {
    toast.error(`❌ Request error: ${err.message}`);
  }
};

function Report({ onUpload }) {
  const [form, setForm] = useState(initialForm);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    if (selected.type !== "application/pdf") {
      toast.warn("⚠️ Only PDF files are allowed!");
      return;
    }

    if (selected.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      toast.warn(`⚠️ File must be less than ${MAX_FILE_SIZE_MB} MB`);
      return;
    }

    setFile(selected);
  };

  const resetForm = () => {
    setForm(initialForm);
    setFile(null);
    fileInputRef.current && (fileInputRef.current.value = "");
    setStatusMsg("");
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!form.title.trim() || !form.type.trim() || !file) {
      toast.warn("⚠️ Title, Type and PDF are required!");
      setStatusMsg("⚠️ Please fill all required fields!");
      return;
    }

    const formData = new FormData();
    Object.keys(form).forEach((key) => formData.append(key, form[key].trim()));
    formData.append("pdf", file);

    try {
      setLoading(true);
      setStatusMsg("⏳ Uploading...");

      await axios.post("/pdf/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("✅ PDF uploaded successfully!");
      setStatusMsg("✅ PDF uploaded successfully!");
      resetForm();

      typeof onUpload === "function" && onUpload();
    } catch (err) {
      console.error("Upload Error:", err);
      handleAxiosError(err);
      setStatusMsg("❌ Upload failed. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-xl rounded-3xl overflow-hidden transition-all duration-500">
      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-700 via-blue-600 to-blue-500 p-5 text-center rounded-b-3xl">
        <FileText className="w-12 h-12 text-white mx-auto mb-3" />
        <h3 className="text-2xl font-bold text-white">Upload a PDF</h3>
        <p className="text-indigo-200 text-sm mt-1">
          Effortlessly upload and manage your documents
        </p>
      </div>

      {/* Form */}
      <div className="p-7">
        <form onSubmit={handleUpload} className="space-y-6">
          {/* Title */}
          <InputField
            label="PDF Title"
            required
            name="title"
            value={form.title}
            onChange={handleChange}
            disabled={loading}
            placeholder="Enter a title"
          />

          {/* Type */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              PDF Type <span className="text-red-500">*</span>
            </label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              disabled={loading}
              className="border border-gray-300 p-3 rounded-xl w-full focus:ring-2 focus:ring-indigo-500 outline-none shadow-inner bg-gray-50"
            >
              <option value="">Select Type</option>
              <option value="Human">Human</option>
              <option value="Veterinary">Veterinary</option>
              <option value="Agriculture">Agriculture</option>
            </select>
          </div>

          {/* Details */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              PDF Details
            </label>
            <textarea
              name="details"
              placeholder="Optional details about PDF"
              value={form.details}
              onChange={handleChange}
              rows="3"
              className="border border-gray-300 p-3 rounded-xl w-full focus:ring-2 focus:ring-indigo-500 outline-none shadow-inner bg-gray-50 resize-none"
              disabled={loading}
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded-xl w-full focus:ring-2 focus:ring-indigo-500 outline-none shadow-inner bg-gray-50"
              disabled={loading}
            >
              <option value="Reports">Reports</option>
              <option value="Articles">Articles</option>
            </select>
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              PDF File <span className="text-red-500">*</span>
            </label>
            <div
              className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-indigo-600 hover:bg-indigo-50 transition-all"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-9 h-9 mx-auto text-indigo-500 mb-2" />
              <p className="text-sm text-gray-600">
                {file ? (
                  <span className="font-medium text-gray-800">
                    📂 {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                  </span>
                ) : (
                  `Click to select a PDF file (Max ${MAX_FILE_SIZE_MB} MB)`
                )}
              </p>
            </div>
            <input
              type="file"
              accept="application/pdf"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              disabled={loading}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-xl text-white font-semibold flex justify-center items-center gap-2 transition-all duration-300 shadow-md ${loading
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

        {/* Status Message */}
        {statusMsg && (
          <p
            className={`text-center mt-5 text-base font-semibold ${statusMsg.includes("✅")
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

// Reusable input
function InputField({ label, name, value, onChange, placeholder, disabled, required }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="border border-gray-300 p-3 rounded-xl w-full focus:ring-2 focus:ring-indigo-500 outline-none shadow-inner bg-gray-50"
      />
    </div>
  );
}

export default Report;
