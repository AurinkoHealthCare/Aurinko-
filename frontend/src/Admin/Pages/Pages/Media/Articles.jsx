import React, { useState } from "react";
import axios from "../../../../../api/axios";

const FileUpload = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    if (!file || !name) {
      return setMessage("Name and file are required");
    }

    const formData = new FormData();
    formData.append("files", file);
    formData.append("name", name);

    try {
      const res = await axios.post("/otherimage/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("Uploaded successfully");
      setFile(null);
      setName("");
      onUploadSuccess(); // refresh list
    } catch (err) {
      setMessage(err.response?.data?.message || "Upload failed");
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
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Upload
      </button>
      {message && <p className="mt-3 text-sm text-gray-600">{message}</p>}
    </div>
  );
};

export default FileUpload;
