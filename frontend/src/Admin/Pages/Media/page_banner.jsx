import React, { useEffect, useState } from "react";
import axios from "../../../../api/axios";

export default function ImageManager() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editFields, setEditFields] = useState({ imageName: "", category: "" });

  // Fetch all images
  const fetchImages = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/otherimage/all");
      const arr = Array.isArray(res.data)
        ? res.data
        : res.data?.data || [];
      setImages(arr);
    } catch {
      alert("Failed to fetch images ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // Start editing a card
  const startEdit = (img) => {
    setEditId(img._id);
    setEditFields({ imageName: img.imageName, category: img.category });
  };

  // Handle input change
  const handleChange = (key, value) => {
    setEditFields(prev => ({ ...prev, [key]: value }));
  };

  // Save edited data
  const saveEdit = async (id) => {
    if (!editFields.imageName || !editFields.category) {
      alert("Name and category are required ❌");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("imageName", editFields.imageName);
      formData.append("category", editFields.category);

      const res = await axios.put(`/otherimage/update/${id}`, formData);

      if (res.data?.message) {
        setImages(prev =>
          prev.map(img =>
            img._id === id
              ? { ...img, imageName: editFields.imageName, category: editFields.category }
              : img
          )
        );
        alert("Image updated successfully ✅");
        setEditId(null); // ✅ Reset to default card view
      } else {
        alert("Update failed ❌");
      }
    } catch {
      alert("Network error ❌");
    }
  };

  // Cancel editing
  const cancelEdit = () => setEditId(null);

  // Delete image
  const deleteImage = async (id) => {
    if (!window.confirm("Are you sure you want to delete this image? ❌")) return;
    try {
      const res = await axios.delete(`/otherimage/delete/${id}`);
      if (res.data?.message) {
        setImages(prev => prev.filter(img => img._id !== id));
        alert("Image deleted successfully ✅");
      } else {
        alert("Delete failed ❌");
      }
    } catch {
      alert("Network error ❌");
    }
  };

  return (
    <div className="p-6 bg-white shadow-xl rounded-xl w-full max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Manage Uploaded Images</h2>

      {loading && <p className="text-gray-500 text-center">Loading images...</p>}
      {!loading && images.length === 0 && <p className="text-gray-500 text-center">No images found.</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map(img => (
          <div key={img._id} className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition p-3">
            <img src={img.url} alt={img.imageName} className="w-full h-40 object-cover rounded" />

            {editId === img._id ? (
              <div className="mt-3 space-y-2">
                <input
                  type="text"
                  value={editFields.imageName}
                  onChange={e => handleChange("imageName", e.target.value)}
                  placeholder="Image Name"
                  className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                  value={editFields.category}
                  onChange={e => handleChange("category", e.target.value)}
                  className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Category</option>
                  <option value="human">Human</option>
                  <option value="veterinary">Veterinary</option>
                  <option value="agriculture">Agriculture</option>
                </select>
                <div className="flex gap-2">
                  <button
                    onClick={() => saveEdit(img._id)}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded flex-1"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded flex-1"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-3">
                <p className="font-semibold text-lg">{img.imageName}</p>
                <p className="text-sm text-gray-500">{img.category}</p>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => deleteImage(img._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded flex-1"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => startEdit(img)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded flex-1"
                  >
                    Edit
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
