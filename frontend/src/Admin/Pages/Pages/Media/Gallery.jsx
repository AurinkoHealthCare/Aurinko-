import React, { useState, useEffect } from "react";
import axios from "../../../../../api/axios";
import { Upload, Loader2, CheckCircle2, XCircle, ImagePlus } from "lucide-react";

const Gallerys = ({ onUploadSuccess }) => {
  const [files, setFiles] = useState(Array(6).fill(null));
  const [selectedCategories, setSelectedCategories] = useState(Array(6).fill(""));
  const [newCategories, setNewCategories] = useState(Array(6).fill(""));
  const [existingCategories, setExistingCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  // ✅ Toast
  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // ✅ Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get("/gallery/all");
      const uniqueCategories = [
        ...new Set(res.data.data.map((img) => img.category)),
      ];
      setExistingCategories(uniqueCategories);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleFileChange = (index, file) => {
    const newFiles = [...files];
    newFiles[index] = file;
    setFiles(newFiles);
  };

  const handleCategoryChange = (index, value) => {
    const newCats = [...selectedCategories];
    newCats[index] = value;
    setSelectedCategories(newCats);
  };

  const handleNewCategoryChange = (index, value) => {
    const newCats = [...newCategories];
    newCats[index] = value;
    setNewCategories(newCats);
  };

  const triggerFileInput = (index) => {
    document.getElementById(`file-input-${index}`).click();
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    const selectedFiles = files.filter((f) => f !== null);
    if (selectedFiles.length === 0) {
      showToast("Please select at least 1 image", "error");
      return;
    }

    const formData = new FormData();
    files.forEach((file, index) => {
      if (file) {
        formData.append("images", file);

        let finalCategory =
          selectedCategories[index] === "__new"
            ? newCategories[index]
            : selectedCategories[index];

        if (!finalCategory || finalCategory.trim() === "") {
          finalCategory = "Uncategorized";
        }

        formData.append("categories", finalCategory.trim());
      }
    });

    setLoading(true);
    try {
      const response = await axios.post("/gallery/multiple", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 201 || response.status === 200) {
        showToast("✅ Images uploaded successfully!");
        setFiles(Array(6).fill(null));
        setSelectedCategories(Array(6).fill(""));
        setNewCategories(Array(6).fill(""));

        if (onUploadSuccess) onUploadSuccess();
        fetchCategories();
      } else {
        showToast(response.data?.message || "Upload failed!", "error");
      }
    } catch (err) {
      console.error("Upload Error:", err);
      showToast(
        err.response?.data?.message || err.message || "Something went wrong!",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-gradient-to-br from-indigo-50 via-white to-blue-50 shadow-2xl rounded-3xl mb-8 border border-gray-200 relative backdrop-blur-md">
      {/* ✅ Toast */}
      {toast && (
        <div
          className={`fixed top-6 right-6 px-5 py-3 rounded-xl shadow-lg text-white flex items-center gap-2 text-sm font-medium ${
            toast.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle2 className="w-5 h-5" />
          ) : (
            <XCircle className="w-5 h-5" />
          )}
          {toast.message}
        </div>
      )}

      <h2 className="text-3xl font-extrabold mb-10 text-gray-900 text-center">
        📸 Upload Your Gallery Images
      </h2>

      <form
        onSubmit={handleUpload}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
      >
        {files.map((file, index) => (
          <div
            key={index}
            className="relative border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-between bg-white/70 hover:bg-indigo-50 transition shadow-lg hover:shadow-xl min-h-[240px] overflow-hidden p-3 backdrop-blur-sm"
          >
            {/* Image Preview / Placeholder */}
            <div
              onClick={() => triggerFileInput(index)}
              className="w-full h-[160px] flex items-center justify-center cursor-pointer overflow-hidden rounded-xl group"
            >
              {file ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Image ${index + 1}`}
                  className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition"
                />
              ) : (
                <div className="flex flex-col items-center text-gray-400">
                  <ImagePlus className="w-10 h-10 mb-2" />
                  <span className="font-medium">Click to add</span>
                </div>
              )}
            </div>

            {/* Hidden File Input */}
            <input
              id={`file-input-${index}`}
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(index, e.target.files[0])}
              className="hidden"
            />

            {/* Category Input */}
            <div className="mt-3 w-full">
              <select
                value={selectedCategories[index]}
                onChange={(e) => handleCategoryChange(index, e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">-- Select Category --</option>
                {existingCategories.map((cat, i) => (
                  <option key={i} value={cat}>
                    {cat}
                  </option>
                ))}
                <option value="__new">➕ New Category</option>
              </select>

              {/* Show input if "__new" selected */}
              {selectedCategories[index] === "__new" && (
                <input
                  type="text"
                  placeholder="Enter new category"
                  className="mt-2 w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500"
                  value={newCategories[index]}
                  onChange={(e) =>
                    handleNewCategoryChange(index, e.target.value)
                  }
                />
              )}
            </div>
          </div>
        ))}

        {/* Upload Button */}
        <div className="col-span-full flex justify-center mt-6">
          <button
            type="submit"
            disabled={loading}
            className={`px-10 py-3 rounded-2xl font-semibold flex items-center gap-2 transition shadow-lg text-white ${
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
                <Upload className="w-5 h-5" /> Upload All
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Gallerys;
