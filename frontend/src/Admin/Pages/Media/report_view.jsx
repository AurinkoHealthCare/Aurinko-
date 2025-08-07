import React, { useEffect, useState } from "react";
import axios from "../../../../api/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MAX_FILE_SIZE_MB = 10;

function Report_view() {
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("Reports");
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    details: "",
    category: "Reports",
    file: null,
  });

  // Fetch PDFs
  const fetchPdfs = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/pdf/${category}`);
      setPdfs(res.data.data || []);
    } catch (err) {
      console.error("Error fetching PDFs:", err);
      toast.error("❌ Failed to fetch PDFs!");
      setPdfs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPdfs();
  }, [category]);

  // Delete PDF
  const handleDelete = async (id) => {
    if (!window.confirm("⚠️ Are you sure you want to delete this PDF?")) return;

    try {
      await axios.delete(`/pdf/${id}`);
      toast.success("✅ PDF deleted!");
      fetchPdfs();
    } catch (err) {
      console.error("Error deleting PDF:", err);
      toast.error("❌ Failed to delete PDF!");
    }
  };

  // Start editing
  const handleEdit = (pdf) => {
    setEditingId(pdf._id);
    setEditForm({
      title: pdf.title,
      details: pdf.details || "",
      category: pdf.category,
      file: null,
    });
  };

  // File validation
  const validateFile = (file) => {
    if (!file) return true;
    if (file.type !== "application/pdf") {
      toast.warn("⚠️ Only PDF files are allowed!");
      return false;
    }
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      toast.warn(`⚠️ File size must be under ${MAX_FILE_SIZE_MB} MB`);
      return false;
    }
    return true;
  };

  // Save update
  const handleUpdate = async (id) => {
    if (!editForm.title.trim()) {
      toast.warn("⚠️ Title is required!");
      return;
    }
    if (editForm.file && !validateFile(editForm.file)) return;

    try {
      const formData = new FormData();
      formData.append("title", editForm.title.trim());
      formData.append("details", editForm.details.trim());
      formData.append("category", editForm.category);
      if (editForm.file) formData.append("pdf", editForm.file);

      await axios.put(`/pdf/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("✅ PDF updated!");
      setEditingId(null);
      fetchPdfs();
    } catch (err) {
      console.error("Error updating PDF:", err);
      toast.error("❌ Failed to update PDF!");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-6 mt-6">
      <h3 className="text-xl font-bold mb-5 text-gray-800 text-center">
        📑 PDF List
      </h3>

      {/* Category filter */}
      <div className="flex justify-center mb-4">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="Reports">Reports</option>
          <option value="Articles">Articles</option>
        </select>
      </div>

      {loading ? (
        <p className="text-center text-gray-600">⏳ Loading PDFs...</p>
      ) : !Array.isArray(pdfs) || pdfs.length === 0 ? (
        <p className="text-center text-gray-500">No PDFs found.</p>
      ) : (
        <ul className="space-y-3">
          {pdfs.map((pdf) => (
            <li
              key={pdf._id}
              className="border rounded-lg p-4 flex justify-between items-start"
            >
              {editingId === pdf._id ? (
                <div className="flex-1 mr-4 space-y-2">
                  {/* Title */}
                  <input
                    type="text"
                    value={editForm.title}
                    onChange={(e) =>
                      setEditForm({ ...editForm, title: e.target.value })
                    }
                    className="border border-gray-300 p-2 rounded-lg w-full"
                  />
                  {/* Details */}
                  <textarea
                    value={editForm.details}
                    onChange={(e) =>
                      setEditForm({ ...editForm, details: e.target.value })
                    }
                    rows="2"
                    placeholder="Enter PDF details"
                    className="border border-gray-300 p-2 rounded-lg w-full resize-none"
                  />
                  {/* Category */}
                  <select
                    value={editForm.category}
                    onChange={(e) =>
                      setEditForm({ ...editForm, category: e.target.value })
                    }
                    className="border border-gray-300 p-2 rounded-lg w-full"
                  >
                    <option value="Reports">Reports</option>
                    <option value="Articles">Articles</option>
                  </select>
                  {/* File */}
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) =>
                      setEditForm({ ...editForm, file: e.target.files[0] })
                    }
                    className="border border-gray-300 p-2 rounded-lg w-full"
                  />
                  {/* Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdate(pdf._id)}
                      disabled={loading}
                      className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 disabled:opacity-50"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="bg-gray-400 text-white px-3 py-1 rounded-lg hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex-1 mr-4">
                  <p className="font-semibold">{pdf.title}</p>
                  {pdf.details && (
                    <p className="text-sm text-gray-600 italic">{pdf.details}</p>
                  )}
                  <p className="text-sm text-gray-500">{pdf.category}</p>
                  <a
                    href={pdf.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm"
                  >
                    View PDF
                  </a>
                </div>
              )}

              {editingId !== pdf._id && (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(pdf)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(pdf._id)}
                    disabled={loading}
                    className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 disabled:opacity-50"
                  >
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Report_view;
