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

const CATEGORY_OPTIONS = [
  { code: "human", label: "Human" },
  { code: "veterinary", label: "Veterinary" },
  { code: "agriculture", label: "Agriculture" },
];

export default function PageBanner({ onUploadSuccess }) {
  const [form, setForm] = useState({
    name: "",
    lang: "en",
    category: "",
    file: null,
  });
  const [loading, setLoading] = useState(false);

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const resetForm = () => {
    setForm({ name: "", lang: "en", category: "", file: null });
  };

  const handleUpload = async () => {
    if (!form.name || !form.file || !form.lang || !form.category) {
      toast.error("Name, category, language & file are required ❌");
      return;
    }

    const formData = new FormData();
    formData.append("files", form.file);
    formData.append("name", form.name); // 👈 input se liya hua name
    formData.append("lang", form.lang);
    formData.append("category", form.category);

    try {
      setLoading(true);
      const res = await axios.post("/otherimage/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        validateStatus: () => true,
      });

      if (res.data?.success) {
        toast.success(res.data?.message || "Image uploaded successfully ✅");
        alert(`Image "${form.name}" uploaded successfully! ✅`);
        resetForm();
        onUploadSuccess?.();
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
        value={form.name}
        onChange={(e) => updateField("name", e.target.value)}
        className="border p-2 rounded w-full mb-3"
      />

      <select
        value={form.category}
        onChange={(e) => updateField("category", e.target.value)}
        className="border p-2 rounded w-full mb-3"
      >
        <option value="" disabled>Select Category</option>
        {CATEGORY_OPTIONS.map((cat) => (
          <option key={cat.code} value={cat.code}>
            {cat.label}
          </option>
        ))}
      </select>

      <select
        value={form.lang}
        onChange={(e) => updateField("lang", e.target.value)}
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
        onChange={(e) => updateField("file", e.target.files?.[0] || null)}
        className="mb-3"
      />
      {form.file && (
        <p className="text-sm text-gray-500 mb-3">Selected: {form.file.name}</p>
      )}

      <button
        onClick={handleUpload}
        disabled={loading}
        className={`w-full py-2 rounded text-white flex justify-center items-center gap-2 transition ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading && (
          <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"></span>
        )}
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}
