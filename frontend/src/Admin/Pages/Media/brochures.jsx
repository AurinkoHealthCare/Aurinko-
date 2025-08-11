import React, { useEffect, useState } from "react";
import axios from "../../../../api/axios";

const Brochure_view = () => {
  const [images, setImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [editingImage, setEditingImage] = useState(null);
  const [editName, setEditName] = useState("");
  const [editFile, setEditFile] = useState(null);
  const [editPreview, setEditPreview] = useState(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/brochures/all");
      const arr = Array.isArray(res.data) ? res.data : res.data.data || [];
      setImages(arr);
    } catch (err) {
      console.error("Error fetching images", err);
      setImages([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/brochures/${id}`);
      setImages((prev) => prev.filter((img) => img._id !== id));
    } catch (err) {
      console.error("Error deleting image", err);
    }
  };

  const handleEdit = (image) => {
    setEditingImage(image._id);
    setEditName(image.name || "");
    setEditPreview(image.url);
    setEditFile(null);
  };

  const saveEdit = async () => {
    try {
      const formData = new FormData();
      formData.append("name", editName);
      if (editFile) {
        formData.append("image", editFile);
      }

      await axios.put(`/brochures/${editingImage}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setImages((prev) =>
        prev.map((img) =>
          img._id === editingImage
            ? {
                ...img,
                name: editName,
                url: editFile ? URL.createObjectURL(editFile) : img.url,
              }
            : img
        )
      );

      setEditingImage(null);
      setEditName("");
      setEditFile(null);
      setEditPreview(null);
    } catch (err) {
      console.error("Error updating image", err);
    }
  };

  const filteredImages =
    selectedCategory === "all"
      ? images
      : images.filter(
          (img) => img.category?.toLowerCase() === selectedCategory.toLowerCase()
        );

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Brochures Gallery</h2>

        {/* Category Dropdown */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-gray-300 p-2 rounded-lg"
        >
          <option value="all">All Categories</option>
          <option value="Human">Human</option>
          <option value="Veterinary">Veterinary</option>
          <option value="Agriculture">Agriculture</option>
        </select>
      </div>

      {filteredImages.length === 0 ? (
        <div>No images found</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredImages.map((image) => (
            <div
              key={image._id}
              className="border rounded-lg shadow p-4 flex flex-col items-center bg-white"
            >
              {editingImage === image._id ? (
                <div className="w-full">
                  {/* Clickable Image */}
                  <label className="block cursor-pointer">
                    <img
                      src={editPreview}
                      alt="preview"
                      className="w-full h-40 object-cover rounded hover:opacity-80 transition"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          setEditFile(file);
                          setEditPreview(URL.createObjectURL(file));
                        }
                      }}
                      className="hidden"
                    />
                  </label>

                  {/* Name Input */}
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="border p-2 w-full rounded mt-3"
                    placeholder="Enter image name"
                  />

                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={saveEdit}
                      className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingImage(null)}
                      className="bg-gray-400 text-white px-3 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <img
                    src={image.url}
                    alt={image.name}
                    className="w-full h-48 object-cover rounded"
                  />
                  <div className="mt-3 text-center w-full">
                    <p className="font-medium">{image.name || "No Name"}</p>
                    <p className="text-sm text-gray-500">{image.category}</p>
                    <div className="flex gap-2 justify-center mt-2">
                      <button
                        onClick={() => handleEdit(image)}
                        className="bg-blue-500 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(image._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Brochure_view;
