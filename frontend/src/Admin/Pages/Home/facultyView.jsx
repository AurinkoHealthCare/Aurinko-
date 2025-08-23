import React, { useEffect, useState } from "react";
import axios from "../../../../api/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LANGUAGES = ["en", "ar", "es", "fr", "ko"];

const ManageFaculty = () => {
  const [faculties, setFaculties] = useState([]);
  const [editingFaculty, setEditingFaculty] = useState(null);

  // Fetch all faculties
  const fetchFaculties = async () => {
    try {
      const { data } = await axios.get("/faculty/get");
      setFaculties(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load faculty!");
    }
  };

  useEffect(() => {
    fetchFaculties();
  }, []);

  // Delete faculty
  const deleteFaculty = async (id) => {
    if (!window.confirm("Are you sure to delete this faculty?")) return;
    try {
      await axios.delete(`/faculty/${id}`);
      toast.success("Faculty deleted!");
      setFaculties((prev) => prev.filter((f) => f._id !== id));
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete!");
    }
  };

  // Update faculty
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("name", JSON.stringify(editingFaculty.name));
      data.append("designation", JSON.stringify(editingFaculty.designation));
      data.append("bio", JSON.stringify(editingFaculty.bio));

      if (editingFaculty.image instanceof File) {
        data.append("image", editingFaculty.image);
      }

      await axios.put(`/faculty/${editingFaculty._id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Faculty updated!");
      setEditingFaculty(null);
      fetchFaculties();
    } catch (err) {
      console.error(err);
      toast.error("Update failed!");
    }
  };

  // Handle form text change
  const handleInputChange = (field, lang, value) => {
    setEditingFaculty((prev) => ({
      ...prev,
      [field]: { ...prev[field], [lang]: value },
    }));
  };

  // Handle image change
  const handleImageChange = (e) => {
    setEditingFaculty((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Manage Faculty</h1>

      {/* Faculty List */}
      <div className="grid gap-4 md:grid-cols-2">
        {faculties.map((faculty) => (
          <div
            key={faculty._id}
            className="bg-white border shadow rounded-lg p-4"
          >
            <h2 className="text-xl font-bold">{faculty.name?.en || "No Name"}</h2>
            <p className="text-gray-600">
              {faculty.designation?.en || "No Designation"}
            </p>
            {faculty.image?.url && (
              <img
                src={faculty.image.url}
                alt="faculty"
                className="w-24 h-24 object-cover rounded mt-2"
              />
            )}
            <div className="mt-4 flex gap-2">
              <button
                onClick={() =>
                  setEditingFaculty({
                    ...faculty,
                    image: faculty.image?.url || null,
                  })
                }
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => deleteFaculty(faculty._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingFaculty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <form
            onSubmit={handleUpdate}
            className="bg-white p-6 rounded-xl shadow-xl w-full max-w-3xl space-y-4 overflow-y-auto max-h-[90vh]"
          >
            <h2 className="text-2xl font-bold mb-4 text-center">Edit Faculty</h2>

            {["name", "designation", "bio"].map((field) => (
              <div key={field} className="space-y-2 border-b pb-2">
                <h3 className="font-semibold">{field.toUpperCase()}</h3>
                {LANGUAGES.map((lang) => (
                  <input
                    key={lang}
                    type="text"
                    placeholder={`${field} (${lang.toUpperCase()})`}
                    value={editingFaculty[field][lang] || ""}
                    onChange={(e) => handleInputChange(field, lang, e.target.value)}
                    className="w-full border rounded p-2"
                  />
                ))}
              </div>
            ))}

            {/* Image Upload */}
            <div>
              <label className="block font-semibold mb-2">Faculty Image</label>
              <input type="file" accept="image/*" onChange={handleImageChange} />
              {editingFaculty.image && (
                <div className="relative w-28 h-28 mt-2">
                  <img
                    src={
                      editingFaculty.image instanceof File
                        ? URL.createObjectURL(editingFaculty.image)
                        : editingFaculty.image
                    }
                    alt="preview"
                    className="w-full h-full object-cover rounded-lg border"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setEditingFaculty((prev) => ({ ...prev, image: null }))
                    }
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                  >
                    X
                  </button>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setEditingFaculty(null)}
                className="bg-gray-400 text-white px-3 py-1 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default ManageFaculty;
