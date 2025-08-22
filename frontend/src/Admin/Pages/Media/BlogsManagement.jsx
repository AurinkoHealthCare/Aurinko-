import React, { useEffect, useState } from "react";
import axios from "../../../../api/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LANGUAGES = ["en", "ar", "es", "fr", "ko"];

const BlogsManagement = () => {
  const [blogs, setBlogs] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null);
  const [formData, setFormData] = useState({
    image: null,
    headings: [],
    paragraphs: [],
    category: "",
  });

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("/blog/get");
      setBlogs(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch blogs");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const initializeLangFields = (existing) => existing || LANGUAGES.reduce((acc, lang) => ({ ...acc, [lang]: "" }), {});

  const startEdit = (blog) => {
    setEditingBlog(blog._id);
    setFormData({
      image: null,
      headings: blog.headings || [initializeLangFields()],
      paragraphs: blog.paragraphs || [initializeLangFields()],
      category: blog.category || "",
      existingImageUrl: blog.imageUrl || "",
    });
  };

  const handleInputChange = (type, index, lang, value) => {
    const updated = { ...formData };
    updated[type][index][lang] = value;
    setFormData(updated);
  };

  const handleCategoryChange = (e) => {
    setFormData({ ...formData, category: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const addHeadingParagraph = () => {
    setFormData((prev) => ({
      ...prev,
      headings: [...prev.headings, initializeLangFields()],
      paragraphs: [...prev.paragraphs, initializeLangFields()],
    }));
  };

  const handleUpdate = async () => {
    try {
      const data = new FormData();
      if (formData.image) data.append("image", formData.image);
      data.append("category", formData.category || "");
      data.append("headings", JSON.stringify(formData.headings));
      data.append("paragraphs", JSON.stringify(formData.paragraphs));

      await axios.put(`/blog/${editingBlog}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Blog updated successfully!");
      setEditingBlog(null);
      fetchBlogs();
    } catch (err) {
      console.error(err);
      toast.error("Update failed!");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await axios.delete(`/blog/${id}`);
      toast.success("Blog deleted!");
      fetchBlogs();
    } catch (err) {
      console.error(err);
      toast.error("Delete failed!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Manage Blogs</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div key={blog._id} className="bg-white shadow-md rounded-xl p-4 flex flex-col gap-3">
            {blog.imageUrl && (
              <img
                src={blog.imageUrl}
                alt="Blog"
                className="h-40 w-full object-contain rounded-lg"
              />
            )}
            <div className="flex-1">
              {blog.category && (
                <p className="font-semibold text-indigo-600 mb-2">Category: {blog.category}</p>
              )}
              {blog.headings?.map((h, i) =>
                LANGUAGES.map((lang) => (
                  <div key={i + lang} className="mb-1">
                    <p className="font-semibold text-sm">{lang.toUpperCase()}: {h[lang]}</p>
                    <p className="text-gray-600 text-xs">{blog.paragraphs[i]?.[lang]}</p>
                  </div>
                ))
              )}
            </div>
            <div className="flex justify-between mt-2">
              <button
                onClick={() => startEdit(blog)}
                className="bg-indigo-500 text-white px-3 py-1 rounded hover:bg-indigo-600 transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(blog._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingBlog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Edit Blog</h2>
            <div className="space-y-4">
              {formData.image ? (
                <img src={URL.createObjectURL(formData.image)} alt="Preview" className="h-32 w-full object-cover rounded-lg mb-2" />
              ) : formData.existingImageUrl ? (
                <img src={formData.existingImageUrl} alt="Existing" className="h-32 w-full object-cover rounded-lg mb-2" />
              ) : null}

              <div>
                <label className="block font-semibold mb-1">Category</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={handleCategoryChange}
                  className="w-full border rounded p-2 mb-3"
                  placeholder="Enter category"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Upload New Image</label>
                <input type="file" accept="image/*" onChange={handleImageChange} />
              </div>

              {formData.headings.map((heading, index) => (
                <div key={index} className="space-y-2 border-t pt-2">
                  {LANGUAGES.map((lang) => (
                    <div key={lang}>
                      <label className="block text-sm font-medium">{lang.toUpperCase()} Heading</label>
                      <input
                        type="text"
                        value={heading[lang] || ""}
                        onChange={(e) => handleInputChange("headings", index, lang, e.target.value)}
                        className="w-full border rounded p-1"
                      />
                      <label className="block text-sm font-medium mt-1">{lang.toUpperCase()} Paragraph</label>
                      <textarea
                        rows={2}
                        value={formData.paragraphs[index][lang] || ""}
                        onChange={(e) => handleInputChange("paragraphs", index, lang, e.target.value)}
                        className="w-full border rounded p-1"
                      />
                    </div>
                  ))}
                </div>
              ))}

              <button
                type="button"
                onClick={addHeadingParagraph}
                className="mt-2 bg-indigo-500 text-white px-4 py-1 rounded hover:bg-indigo-600 transition"
              >
                + Add Heading & Paragraph
              </button>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => setEditingBlog(null)}
                  className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default BlogsManagement;
