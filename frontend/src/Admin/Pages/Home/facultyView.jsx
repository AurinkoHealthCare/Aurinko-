import React, { useEffect, useState } from "react";
import axios from "../../../../api/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LANGUAGES = ["en", "ar", "es", "fr", "ko"];

const ManageFaculty = () => {
  const [faculties, setFaculties] = useState([]);
  const [editingFaculty, setEditingFaculty] = useState(null);
  const [selectedLang, setSelectedLang] = useState("en");

  // Fetch faculties
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

  // Delete
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

  // Update
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

  const handleInputChange = (field, lang, value) => {
    setEditingFaculty((prev) => ({
      ...prev,
      [field]: { ...prev[field], [lang]: value },
    }));
  };

  const handleImageChange = (e) => {
    setEditingFaculty((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  return (
    <div className="p-4 sm:p-6 bg-white min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
        Manage Faculty
      </h1>

      {/* Language Selector */}
      <div className="mb-6 flex justify-center">
        <select
          value={selectedLang}
          onChange={(e) => setSelectedLang(e.target.value)}
          className="border rounded px-3 py-2 w-40 sm:w-48"
        >
          {LANGUAGES.map((lang) => (
            <option key={lang} value={lang}>
              {lang.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      {/* Faculty List */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {faculties.map((faculty) => (
          <div
            key={faculty._id}
            className="bg-white border shadow rounded-lg p-4 flex flex-col sm:flex-row gap-4 items-center sm:items-start"
          >
            {/* Left: Image */}
            {faculty.image?.url ? (
              <img
                src={faculty.image.url}
                alt="faculty"
                className="w-24 h-24 object-cover rounded-lg border"
              />
            ) : (
              <div className="w-24 h-24 flex items-center justify-center bg-gray-200 rounded-lg text-gray-500">
                No Image
              </div>
            )}

            {/* Right: Content */}
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-lg sm:text-xl font-bold">
                {faculty.name?.[selectedLang] || "No Name"}
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                {faculty.designation?.[selectedLang] || "No Designation"}
              </p>
              <p className="text-xs sm:text-sm text-gray-500 mt-1 line-clamp-3">
                {faculty.bio?.[selectedLang] || "No Bio"}
              </p>

              <div className="mt-4 flex gap-2 justify-center sm:justify-start">
                <button
                  onClick={() =>
                    setEditingFaculty({
                      ...faculty,
                      image: faculty.image?.url || null,
                    })
                  }
                  className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteFaculty(faculty._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingFaculty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-2">
          <form
            onSubmit={handleUpdate}
            className="bg-white p-4 sm:p-6 rounded-xl shadow-xl w-full max-w-3xl space-y-4 overflow-y-auto max-h-[90vh]"
          >
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">
              Edit Faculty
            </h2>

            {/* Language Selector */}
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setSelectedLang(lang)}
                  className={`px-3 py-1 rounded text-sm sm:text-base ${
                    selectedLang === lang
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Language-specific fields */}
            {Object.keys(editingFaculty)
              .filter(
                (key) =>
                  typeof editingFaculty[key] === "object" &&
                  key !== "image" &&
                  key !== "_id"
              )
              .map((field) => (
                <div key={field} className="space-y-2 border-b pb-2">
                  <h3 className="font-semibold text-sm sm:text-base">
                    {field.toUpperCase()}
                  </h3>
                  <input
                    type="text"
                    placeholder={`${field} (${selectedLang.toUpperCase()})`}
                    value={editingFaculty[field]?.[selectedLang] || ""}
                    onChange={(e) =>
                      handleInputChange(field, selectedLang, e.target.value)
                    }
                    className="w-full border rounded p-2 text-sm sm:text-base"
                  />
                </div>
              ))}

            {/* Image Upload */}
            <div>
              <label className="block font-semibold mb-2 text-sm sm:text-base">
                Faculty Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="text-sm"
              />
              {editingFaculty.image && (
                <div className="relative w-24 h-24 mt-2">
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
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
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
                className="bg-gray-400 text-white px-3 py-1 rounded text-sm sm:text-base"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-green-600 text-white px-3 py-1 rounded text-sm sm:text-base"
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
