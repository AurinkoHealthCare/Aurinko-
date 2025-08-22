import { useState, useEffect, useRef } from "react";
import api from "../../api/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// base64 placeholder
const noImage =
  "data:image/svg+xml;base64," +
  btoa(
    `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" style="background:#f9fafb"><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="14" fill="#9ca3af">No Image</text></svg>`
  );

export default function LogoUploader() {
  const [logos, setLogos] = useState([]);
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  // fetch all logos
  const fetchLogos = async () => {
    try {
      const res = await api.get("/logo/logos");
      setLogos(res.data);
    } catch (err) {
      toast.error("Failed to fetch logos");
      console.error("Fetch logos error:", err);
    }
  };

  useEffect(() => {
    fetchLogos();
  }, []);

  // upload max 4 logos
  const handleUpload = async () => {
    if (files.length === 0) return toast.warning("Select at least one file");
    if (files.length > 4) return toast.warning("You can upload max 4 logos");

    const formData = new FormData();
    files.forEach((file) => formData.append("images", file));

    try {
      await api.post("/logo/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setFiles([]);
      if (fileInputRef.current) fileInputRef.current.value = "";
      toast.success("Logos uploaded successfully!");
      fetchLogos();
    } catch (err) {
      toast.error("Upload failed");
      console.error("Upload error:", err);
    }
  };

  // update logo
  const handleUpdate = async (id, file) => {
    const formData = new FormData();
    formData.append("image", file);
    try {
      await api.put(`/logo/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Logo updated!");
      fetchLogos();
    } catch (err) {
      toast.error("Update failed");
      console.error("Update error:", err);
    }
  };

  // delete logo
  const handleDelete = async (id) => {
    try {
      await api.delete(`/logo/${id}`);
      toast.success("Logo deleted!");
      fetchLogos();
    } catch (err) {
      toast.error("Delete failed");
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">🎨 Logo Manager</h1>

      {/* Upload Section */}
      <div className="border-2 border-dashed border-gray-400 rounded-xl p-6 mb-10 text-center bg-gray-50 hover:bg-gray-100 transition">
        <input
          type="file"
          multiple
          accept="image/*"
          ref={fileInputRef}
          onChange={(e) => setFiles(Array.from(e.target.files))}
          className="hidden"
          id="fileInput"
        />
        <label
          htmlFor="fileInput"
          className="cursor-pointer px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
        >
          Select Logos
        </label>
        <p className="text-sm text-gray-500 mt-2">
          (You can upload up to 4 logos at once)
        </p>

        {files.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-3">Preview</h2>
            <div className="flex flex-wrap gap-4 justify-center">
              {files.map((file, idx) => (
                <div
                  key={idx}
                  className="w-28 h-28 border rounded-lg overflow-hidden shadow-sm"
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt="preview"
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}
            </div>
            <button
              onClick={handleUpload}
              className="mt-6 px-5 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
            >
              Upload Selected Logos
            </button>
          </div>
        )}
      </div>

      {/* Logos List */}
      <h2 className="text-xl font-semibold mb-4">Uploaded Logos</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {logos.length > 0 ? (
          logos.map((logo) => (
            <div
              key={logo._id}
              className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center hover:shadow-lg transition"
            >
              <img
                src={logo?.url || noImage}
                alt={logo?.imageName || "Logo"}
                className="w-28 h-28 object-contain mb-3"
                onError={(e) => (e.target.src = noImage)}
              />
              <p className="text-sm text-center truncate w-full mb-3">
                {logo.imageName}
              </p>

              <div className="flex gap-2">
                {/* Update */}
                <label className="cursor-pointer bg-yellow-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-yellow-600">
                  Edit
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) =>
                      e.target.files.length > 0 &&
                      handleUpdate(logo._id, e.target.files[0])
                    }
                  />
                </label>

                {/* Delete */}
                <button
                  onClick={() => handleDelete(logo._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            No logos uploaded yet
          </p>
        )}
      </div>

      {/* Toast container */}
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
    </div>
  );
}
