import React, { useState } from "react";
import axios from "../../../../../api/axios";
import { toast } from "react-toastify";

const LANG_OPTIONS = [
  { code: "en", label: "English" },
  { code: "ar", label: "Arabic" },
  { code: "fr", label: "French" },
  { code: "es", label: "Spanish" },
  { code: "ko", label: "Korean" },
];

const PageBanner = ({ onUploadSuccess }) => {
  const [name, setName] = useState("");
  const [selectedLang, setSelectedLang] = useState("en");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!name || !file || !selectedLang) {
      toast.error("Name, language & file are required ❌");
      return;
    }

    const formData = new FormData();
    formData.append("files", file); // backend expects "files"
    formData.append("name", name);
    formData.append("lang", selectedLang); // 👈 language key for backend to place it in images.<lang>

    try {
      setLoading(true);

      const res = await axios.post("/otherimage/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        validateStatus: () => true,
      });

      if (res.data?.success) {
        toast.success(res.data?.message || "Upload successful ✅");
        setFile(null);
        setName("");
        if (onUploadSuccess) onUploadSuccess();
      } else {
        toast.error(res.data?.message || "Upload failed ❌");
      }
    } catch (err) {
      console.error("Upload Error:", err);
      toast.error("Network error ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl mb-6 w-full max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Upload Multilingual Image</h2>

      <input
        type="text"
        placeholder="Enter image name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 rounded w-full mb-3"
      />

      <select
        value={selectedLang}
        onChange={(e) => setSelectedLang(e.target.value)}
        className="border p-2 rounded w-full mb-3"
      >
        <option value="" disabled>Select Language</option>
        {LANG_OPTIONS.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.label}
          </option>
        ))}
      </select>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="mb-3"
      />

      <button
        onClick={handleUpload}
        disabled={loading}
        className={`w-full py-2 rounded text-white transition ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
};

export default PageBanner;
