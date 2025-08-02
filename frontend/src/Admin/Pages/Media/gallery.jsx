import React, { useEffect, useState } from "react";
import axios from "../../../../api/axios";

export default function ImageList() {
  const [images, setImages] = useState([]);
  const [newFile, setNewFile] = useState({});

  // सभी images लाना
  const fetchImages = async () => {
    try {
      const { data } = await axios.get("/gallery/all");
      setImages(data.data);
    } catch (err) {
      console.error("Failed to fetch images:", err);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // delete function
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this image?")) return;
    try {
      await axios.delete(`/gallery/delete/${id}`);
      fetchImages(); // refresh list
    } catch (err) {
      console.error("Failed to delete image:", err);
    }
  };

  // update function
  const handleUpdate = async (id) => {
    if (!newFile[id]) return alert("Please select a file to update.");

    const formData = new FormData();
    formData.append("image", newFile[id]);

    try {
      await axios.put(`/gallery/update/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setNewFile((prev) => ({ ...prev, [id]: null }));
      fetchImages(); // refresh list
    } catch (err) {
      console.error("Failed to update image:", err);
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-2xl">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Image List</h2>
      {images.length === 0 ? (
        <p className="text-gray-500 text-center">No images found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((img) => (
            <div
              key={img._id}
              className="border rounded-xl overflow-hidden shadow hover:shadow-lg transition"
            >
              <img
                src={img.url}
                alt="gallery"
                className="w-full h-48 object-cover"
              />
              <div className="p-3 flex flex-col gap-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setNewFile({ ...newFile, [img._id]: e.target.files[0] })
                  }
                />
                <div className="flex justify-between">
                  <button
                    onClick={() => handleUpdate(img._id)}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(img._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
