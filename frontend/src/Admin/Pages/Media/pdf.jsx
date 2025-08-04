import React, { useEffect, useState } from "react";
import axios from "../../../../api/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PdfList() {
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("Reports");
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editFile, setEditFile] = useState(null);

  // Fetch PDFs
  const fetchPdfs = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/pdf/${category}`);
      // ✅ Ensure array from backend response
      setPdfs(res.data.data || []);
    } catch (err) {
      console.error("Error fetching PDFs:", err);
      toast.error("❌ Failed to fetch PDFs!");
      setPdfs([]); // fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPdfs();
  }, [category]);

  // Delete PDF
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this PDF?")) return;

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
    setEditTitle(pdf.title);
    setEditCategory(pdf.category);
    setEditFile(null);
  };

  // Save update
  const handleUpdate = async (id) => {
    try {
      const formData = new FormData();
      formData.append("title", editTitle);
      formData.append("category", editCategory);
      if (editFile) formData.append("pdf", editFile);

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

  // PDF URL creator (to handle Windows path like C:\Users\...)
  const getPdfUrl = (filePath) => {
    if (!filePath) return "#";
    // Backend serve कर रहा है uploads folder से
    return `http://localhost:2026/${filePath
      .replace(/\\/g, "/")
      .split("backend/")[1]}`;
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-6 mt-6">
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
              className="border rounded-lg p-4 flex justify-between items-center"
            >
              {editingId === pdf._id ? (
                <div className="flex-1 mr-4 space-y-2">
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="border border-gray-300 p-2 rounded-lg w-full"
                  />
                  <select
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                    className="border border-gray-300 p-2 rounded-lg w-full"
                  >
                    <option value="Reports">Reports</option>
                    <option value="Articles">Articles</option>
                  </select>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => setEditFile(e.target.files[0])}
                    className="border border-gray-300 p-2 rounded-lg w-full"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdate(pdf._id)}
                      className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700"
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
                  <p className="text-sm text-gray-500">{pdf.category}</p>
                  <a
                    href={getPdfUrl(pdf.filePath)}
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
                    className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700"
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

export default PdfList;
