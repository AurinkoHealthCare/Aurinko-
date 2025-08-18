import React, { useEffect, useState } from "react";
import axios from "../../../../api/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Banner = () => {
  const [images, setImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState({});
  const [loading, setLoading] = useState({});
  const [category, setCategory] = useState("Human");
  const [lang, setLang] = useState("en");
  const [isFetching, setIsFetching] = useState(false);

  const fetchImages = async () => {
    setIsFetching(true);
    try {
      const res = await axios.get(`/sliderimage/${category}/${lang}`);
      const imageArray = Array.isArray(res.data.images)
        ? res.data.images
        : [];
      setImages(imageArray);
    } catch (err) {
      console.error("Error fetching images:", err);
      setImages([]);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [category, lang]);

  const handleFileChange = (e, id) => {
    setSelectedFiles((prev) => ({
      ...prev,
      [id]: e.target.files[0],
    }));
  };

  const handleDelete = async (id) => {
    setLoading((prev) => ({ ...prev, [id]: "deleting" }));
    try {
      await axios.delete(`/sliderimage/${id}`);
      toast.success(`Image deleted successfully`);
      fetchImages();
    } catch (err) {
      toast.error(`Failed to delete image`);
      console.error("Delete error:", err);
    } finally {
      setLoading((prev) => ({ ...prev, [id]: null }));
    }
  };

  const handleUpdate = async (id) => {
    const file = selectedFiles[id];
    if (!file) {
      toast.warning("Please select an image to update.");
      return;
    }

    setLoading((prev) => ({ ...prev, [id]: "updating" }));
    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.put(`/sliderimage/${id}`, formData);
      toast.success("Image updated successfully");
      fetchImages();
    } catch (err) {
      toast.error("Failed to update image");
      console.error("Update error:", err);
    } finally {
      setLoading((prev) => ({ ...prev, [id]: null }));
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <ToastContainer position="top-right" autoClose={2000} />
      <h2 className="text-3xl font-bold mb-10 text-center text-blue-700">
        Banner Image Manager
      </h2>

      {/* Category & Language Select */}
      <div className="flex flex-col md:flex-row gap-6 justify-center mb-10">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-3 rounded-xl border border-gray-300 text-gray-700 focus:ring-2 focus:ring-blue-500"
        >
          <option value="Human">Human</option>
          <option value="Veterinary">Veterinary</option>
          <option value="Agriculture">Agriculture</option>
        </select>

        <select
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          className="px-4 py-3 rounded-xl border border-gray-300 text-gray-700 focus:ring-2 focus:ring-blue-500"
        >
          <option value="en">English</option>
          <option value="fr">French</option>
          <option value="ar">Arabic</option>
          <option value="es">Spanish</option>
          <option value="ko">Korean</option>
        </select>
      </div>

      {/* Loading State */}
      {isFetching ? (
        <p className="text-center text-gray-500">Loading images...</p>
      ) : images.length === 0 ? (
        <p className="text-center text-gray-500">
          No images found for this category & language.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {images.map((img) => (
            <div
              key={img._id}
              className="bg-white rounded-xl p-5 shadow-lg flex flex-col items-center border border-gray-200 hover:shadow-xl transition-all duration-300"
            >
              <p className="text-sm font-medium text-gray-600 mb-2">
                Image #{img.no}
              </p>

              {/* Image Preview */}
              <label
                htmlFor={`file-${img._id}`}
                className="relative w-full h-40 rounded overflow-hidden cursor-pointer group border bg-gray-50 mb-3"
              >
                <img
                  src={img.url}
                  alt={`Image ${img.no}`}
                  className="w-full h-full object-contain transition-transform duration-200 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-10 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs font-semibold">
                  Click to change
                </div>
              </label>

              <input
                id={`file-${img._id}`}
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, img._id)}
                className="hidden"
              />

              {selectedFiles[img._id] && (
                <p className="text-xs text-gray-500 mb-2 truncate w-full text-center">
                  {selectedFiles[img._id].name}
                </p>
              )}

              <div className="flex gap-3 w-full justify-center mt-auto">
                <button
                  onClick={() => handleUpdate(img._id)}
                  disabled={loading[img._id]}
                  className={`w-full px-3 py-1.5 text-sm font-medium rounded-lg transition duration-200 text-white ${
                    loading[img._id] === "updating"
                      ? "bg-blue-600 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {loading[img._id] === "updating" ? "Updating..." : "Update"}
                </button>

                <button
                  onClick={() => handleDelete(img._id)}
                  disabled={loading[img._id]}
                  className={`w-full px-3 py-1.5 text-sm font-medium rounded-lg transition duration-200 text-white ${
                    loading[img._id] === "deleting"
                      ? "bg-red-400 cursor-not-allowed"
                      : "bg-red-600 hover:bg-red-700"
                  }`}
                >
                  {loading[img._id] === "deleting" ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Banner;
