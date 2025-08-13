import React, { useState } from "react";
import axios from "../../../../../api/axios";
import { toast } from "react-toastify";
import { Upload, Image as ImageIcon, Languages, FolderOpen } from "lucide-react";

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
    formData.append("name", form.name);
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
    <div className="p-8 bg-white/80 backdrop-blur-md shadow-2xl rounded-2xl mb-6 w-full max-w-xl mx-auto border border-gray-200 transition-all hover:shadow-[0_10px_40px_rgba(0,0,0,0.15)]">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        <Upload className="w-6 h-6 text-blue-600" /> Upload Multilingual Image
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Image Name</label>
          <input
            type="text"
            placeholder="Enter image name"
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            className="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 p-3 rounded-lg w-full outline-none transition"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
          <div className="relative">
            <FolderOpen className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <select
              value={form.category}
              onChange={(e) => updateField("category", e.target.value)}
              className="pl-10 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 p-3 rounded-lg w-full outline-none transition"
            >
              <option value="" disabled>Select Category</option>
              {CATEGORY_OPTIONS.map((cat) => (
                <option key={cat.code} value={cat.code}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Language</label>
          <div className="relative">
            <Languages className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <select
              value={form.lang}
              onChange={(e) => updateField("lang", e.target.value)}
              className="pl-10 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 p-3 rounded-lg w-full outline-none transition"
            >
              <option value="" disabled>Select Language</option>
              {LANG_OPTIONS.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Select File</label>
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer p-6 hover:border-blue-400 hover:bg-blue-50 transition">
            <ImageIcon className="w-10 h-10 text-gray-400 mb-2" />
            <span className="text-gray-500 text-sm">{form.file ? form.file.name : "Click to select image"}</span>
            <input
              type="file"
              onChange={(e) => updateField("file", e.target.files?.[0] || null)}
              className="hidden"
            />
          </label>
        </div>
      </div>

      <button
        onClick={handleUpload}
        disabled={loading}
        className={`mt-6 w-full py-3 rounded-xl text-white flex justify-center items-center gap-2 font-semibold shadow-lg transition-transform transform hover:scale-[1.02] ${
          loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading && (
          <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></span>
        )}
        {loading ? "Uploading..." : "Upload Image"}
      </button>
    </div>
  );
}
