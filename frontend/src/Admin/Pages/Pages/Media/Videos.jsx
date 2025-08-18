import React, { useState } from "react";
import axios from "../../../../../api/axios";
import { toast } from "react-toastify";

export default function VideoUpload({ onUploadSuccess }) {
  const [videoName, setVideoName] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    if (selectedFile.size > 30 * 1024 * 1024) {
      toast.error("Video size should be max 30MB ❌");
      return;
    }
    setFile(selectedFile);
  };

  const resetForm = () => {
    setVideoName("");
    setFile(null);
  };

  const handleUpload = async () => {
  if (!videoName || !file) {
    toast.error("Title and video are required ❌");
    return;
  }

  const formData = new FormData();
  formData.append("video", file);
  formData.append("title", videoName);

  try {
    setLoading(true);
    const res = await axios.post("/video/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (res.data?.success) {
      toast.success(res.data.message || "Video uploaded ✅");
      alert(`Video "${videoName}" uploaded successfully!`);
      setVideoName("");
      setFile(null);
      onUploadSuccess?.();
    } else {
      toast.error(res.data?.message || "Upload failed ❌");
    }
  } catch (err) {
    console.error(err);
    toast.error("Network error ❌");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="p-6 bg-white shadow-lg rounded-xl w-full max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Upload Video</h2>

      <input
        type="text"
        placeholder="Enter video name"
        value={videoName}
        onChange={(e) => setVideoName(e.target.value)}
        className="border p-2 rounded w-full mb-3"
      />

      <input
        type="file"
        accept="video/*"
        onChange={handleFileChange}
        className="mb-3"
      />
      {file && <p className="text-sm text-gray-500 mb-3">Selected: {file.name}</p>}

      <button
        onClick={handleUpload}
        disabled={loading}
        className={`w-full py-2 rounded text-white font-semibold transition ${
          loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Uploading..." : "Upload Video"}
      </button>
    </div>
  );
}
