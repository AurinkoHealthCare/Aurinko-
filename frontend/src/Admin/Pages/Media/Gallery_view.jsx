import React, { useEffect, useState } from "react";
import axios from "../../../../api/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Gallery_view = () => {
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [newFile, setNewFile] = useState({});
  const [editMode, setEditMode] = useState({});
  const [categorySelection, setCategorySelection] = useState({}); // ✅ dropdown selected value
  const [customCategory, setCustomCategory] = useState({}); // ✅ custom category text input

  // ✅ Fetch all images
  const fetchImages = async () => {
    try {
      const { data } = await axios.get("/gallery/all");
      setImages(data.data);

      const uniqueCats = [...new Set(data.data.map((img) => img.category))];
      setCategories(uniqueCats);
    } catch (err) {
      toast.error("❌ Failed to fetch images");
      console.error("Failed to fetch images:", err);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // ✅ Delete function
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/gallery/delete/${id}`);
      toast.success("🗑️ Image deleted successfully");
      fetchImages();
    } catch (err) {
      toast.error("❌ Failed to delete image");
      console.error("Failed to delete image:", err);
    }
  };

  // ✅ Update function
  const handleUpdate = async (id) => {
    const formData = new FormData();

    if (newFile[id]) {
      formData.append("image", newFile[id]);
    }

    // ✅ category logic
    let finalCategory = null;
    if (categorySelection[id] === "new") {
      if (!customCategory[id]) {
        toast.warning("⚠️ Please enter a category name.");
        return;
      }
      finalCategory = customCategory[id];
    } else if (categorySelection[id]) {
      finalCategory = categorySelection[id];
    }

    if (finalCategory) {
      formData.append("category", finalCategory);
    }

    if (!newFile[id] && !finalCategory) {
      toast.warning("⚠️ Please select a file or category to update.");
      return;
    }

    try {
      await axios.put(`/gallery/update/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setNewFile((prev) => ({ ...prev, [id]: null }));
      setCategorySelection((prev) => ({ ...prev, [id]: null }));
      setCustomCategory((prev) => ({ ...prev, [id]: "" }));
      setEditMode((prev) => ({ ...prev, [id]: false }));

      // ✅ अगर नई category थी तो उसे categories list में जोड़ दो
      if (finalCategory && !categories.includes(finalCategory)) {
        setCategories((prev) => [...prev, finalCategory]);
      }

      toast.success("✅ Image/Category updated successfully");
      fetchImages();
    } catch (err) {
      toast.error("❌ Failed to update");
      console.error("Failed to update:", err);
    }
  };

  // ✅ filter images
  const filteredImages =
    selectedCategory === "all"
      ? images
      : images.filter((img) => img.category === selectedCategory);

  return (
    <div className="p-6 bg-gradient-to-br from-indigo-50 via-white to-blue-50 shadow-xl rounded-3xl">
      <ToastContainer position="top-right" autoClose={3000} />

      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        📸 Image List
      </h2>

      {/* Category Filter */}
      <div className="flex justify-center mb-6">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          <option value="all">All Categories</option>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {filteredImages.length === 0 ? (
        <p className="text-gray-500 text-center">No images found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredImages.map((img) => (
            <div
              key={img._id}
              className="border rounded-2xl overflow-hidden bg-white shadow hover:shadow-lg transition flex flex-col"
            >
              <img
                src={img.url}
                alt="gallery"
                className="w-full h-48 object-contain"
              />

              <div className="p-4 flex flex-col gap-3">
                <p className="text-sm font-medium text-gray-600">
                  Category:{" "}
                  <span className="font-bold text-indigo-600">
                    {img.category}
                  </span>
                </p>

                {!editMode[img._id] ? (
                  <div className="flex justify-between gap-2">
                    <button
                      onClick={() =>
                        setEditMode((prev) => ({ ...prev, [img._id]: true }))
                      }
                      className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(img._id)}
                      className="flex-1 bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Category Select */}
                    <select
                      value={categorySelection[img._id] || ""}
                      onChange={(e) =>
                        setCategorySelection({
                          ...categorySelection,
                          [img._id]: e.target.value,
                        })
                      }
                      className="px-3 py-2 rounded-lg border border-gray-300 text-sm"
                    >
                      <option value="">-- Change Category --</option>
                      {categories.map((cat, idx) => (
                        <option key={idx} value={cat}>
                          {cat}
                        </option>
                      ))}
                      <option value="new">➕ Add New Category</option>
                    </select>

                    {categorySelection[img._id] === "new" && (
                      <input
                        type="text"
                        placeholder="Enter new category"
                        value={customCategory[img._id] || ""}
                        onChange={(e) =>
                          setCustomCategory({
                            ...customCategory,
                            [img._id]: e.target.value,
                          })
                        }
                        className="border p-2 rounded-lg text-sm"
                      />
                    )}

                    {/* File Upload */}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setNewFile({ ...newFile, [img._id]: e.target.files[0] })
                      }
                      className="block w-full text-sm text-gray-600 file:mr-3 file:py-2 file:px-4 
                                 file:rounded-lg file:border-0 file:text-sm file:font-semibold 
                                 file:bg-indigo-600 file:text-white hover:file:bg-indigo-700"
                    />

                    <div className="flex justify-between gap-2">
                      <button
                        onClick={() => handleUpdate(img._id)}
                        className="flex-1 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition"
                      >
                        Save
                      </button>
                      <button
                        onClick={() =>
                          setEditMode((prev) => ({ ...prev, [img._id]: false }))
                        }
                        className="flex-1 bg-gray-500 text-white px-3 py-2 rounded-lg hover:bg-gray-600 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                )}
              </div> 
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery_view;
