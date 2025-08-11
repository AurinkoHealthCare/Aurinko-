import React, { useEffect, useState } from "react";
import axios from "../../../../api/axios";

export default function BrochuresGallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingImage, setEditingImage] = useState(null);
  const [editName, setEditName] = useState("");

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
  };

  const saveEdit = async () => {
    try {
      await axios.put(`/brochures/${editingImage}`, { name: editName });
      setImages((prev) =>
        prev.map((img) =>
          img._id === editingImage ? { ...img, name: editName } : img
        )
      );
      setEditingImage(null);
      setEditName("");
    } catch (err) {
      console.error("Error updating image", err);
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Brochures Gallery</h2>
      {images.length === 0 ? (
        <div>No images found</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {images.map((image) => (
            <div
              key={image._id}
              className="border rounded-lg shadow p-4 flex flex-col items-center"
            >
              <img
                src={image.url}
                alt={image.name}
                className="w-full h-48 object-cover rounded"
              />
              {editingImage === image._id ? (
                <div className="mt-3 w-full">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="border p-2 w-full rounded"
                    placeholder="Enter image name"
                  />
                  <div className="flex gap-2 mt-2">
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
                <div className="mt-3 text-center w-full">
                  <p className="font-medium">{image.name || "No Name"}</p>
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
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
