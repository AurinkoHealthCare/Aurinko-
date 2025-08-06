import React, { useState } from "react";
import axios from "../../../../../api/axios";
import { toast } from "react-toastify";

const FileUpload = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file || !name) {
      return toast.error("Name and file are required ❌");
    }

    const formData = new FormData();
    formData.append("files", file);
    formData.append("name", name);

    try {
      setLoading(true);

      const res = await axios.post("/otherimage/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        validateStatus: () => true, // error handle manual
      });

      console.log("Upload Response:", res.data);

      if (res.data?.success) {
        toast.success(res.data.message || "Uploaded successfully ✅");
        setFile(null);
        setName("");
        if (onUploadSuccess) onUploadSuccess();
      } else {
        toast.error(res.data?.message || "Upload failed ❌");
      }
    } catch (err) {
      console.error("Axios Error:", err);
      toast.error("Network error ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl mb-6 w-full max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Upload New File</h2>
      <input
        type="text"
        placeholder="Enter file name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 rounded w-full mb-3"
      />
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-3"
      />
      <button
        onClick={handleUpload}
        disabled={loading}
        className={`px-4 py-2 rounded text-white ${
          loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
};

export default FileUpload;