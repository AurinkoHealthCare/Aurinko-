import React, { useState, useEffect } from "react";
import axios from "axios";

export default function OtherImages() {
  const [images, setImages] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editFields, setEditFields] = useState({
    _id: "",
    imageName: "",
    category: "",
    lang: "en",
    no: 1,
    newFile: null,
    previewUrl: "",
  });

  const fetchImages = async () => {
    try {
      const res = await axios.get("/otherimage/get");
      setImages(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const startEdit = (img) => {
    setEditId(img._id);
    setEditFields({
      _id: img._id,
      imageName: img.imageName,
      category: img.category,
      lang: img.lang || "en",
      no: img.no || 1,
      newFile: null,
      previewUrl: img.url,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setEditFields({
      ...editFields,
      newFile: file,
      previewUrl: file ? URL.createObjectURL(file) : editFields.previewUrl,
    });
  };

  const saveEdit = async () => {
    try {
      const formData = new FormData();
      if (editFields.newFile) {
        formData.append("files", editFields.newFile);
      }
      formData.append("imageName", editFields.imageName);
      formData.append("category", editFields.category);
      formData.append("lang", editFields.lang);
      formData.append("no", editFields.no);

      const res = await axios.put(
        `/otherimage/update/${editFields._id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setImages((prev) =>
        prev.map((img) =>
          img._id === editFields._id ? res.data.data : img
        )
      );

      setEditId(null);
    } catch (err) {
      console.error(err);
      alert("Update failed ❌");
    }
  };

  const deleteImage = async (id) => {
    if (!window.confirm("Delete this image?")) return;
    try {
      await axios.delete(`/otherimage/delete/${id}`);
      setImages((prev) => prev.filter((img) => img._id !== id));
    } catch (err) {
      console.error(err);
      alert("Delete failed ❌");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Other Images</h2>
      <div className="grid grid-cols-3 gap-4">
        {images.map((img) => (
          <div key={img._id} className="border p-2 rounded shadow">
            {editId === img._id ? (
              <div>
                <img
                  src={editFields.previewUrl}
                  alt="Preview"
                  className="w-full h-40 object-cover mb-2"
                />
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="mb-2 w-full"
                />
                <input
                  type="text"
                  value={editFields.imageName}
                  onChange={(e) =>
                    setEditFields({ ...editFields, imageName: e.target.value })
                  }
                  placeholder="Image Name"
                  className="border p-1 w-full mb-2"
                />
                <input
                  type="text"
                  value={editFields.category}
                  onChange={(e) =>
                    setEditFields({ ...editFields, category: e.target.value })
                  }
                  placeholder="Category"
                  className="border p-1 w-full mb-2"
                />
                <input
                  type="text"
                  value={editFields.lang}
                  onChange={(e) =>
                    setEditFields({ ...editFields, lang: e.target.value })
                  }
                  placeholder="Language"
                  className="border p-1 w-full mb-2"
                />
                <input
                  type="number"
                  value={editFields.no}
                  onChange={(e) =>
                    setEditFields({ ...editFields, no: e.target.value })
                  }
                  placeholder="No"
                  className="border p-1 w-full mb-2"
                />
                <div className="flex gap-2">
                  <button
                    onClick={saveEdit}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditId(null)}
                    className="bg-gray-500 text-white px-3 py-1 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <img
                  src={img.url}
                  alt={img.imageName}
                  className="w-full h-40 object-cover mb-2"
                />
                <p className="font-semibold">{img.imageName}</p>
                <p className="text-sm text-gray-600">{img.category}</p>
                <p className="text-xs text-gray-500">Lang: {img.lang}</p>
                <p className="text-xs text-gray-500">No: {img.no}</p>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => startEdit(img)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteImage(img._id)}
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
    </div>
  );
}
