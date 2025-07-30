import React, { useEffect, useState } from "react";
import axios from "../../../../api/axios";

// Render stars as ★★★☆☆
const renderStars = (rating) => {
  return "★".repeat(Number(rating)) + "☆".repeat(5 - Number(rating));
};

const Productimage = () => {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    details: "",
    image: null,
    preview: "",
    rating: 0, // added rating to formData
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/products/get");
      setProducts(data);
    } catch (err) {
      console.error("❌ Error fetching products:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`/products/delete/${id}`);
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      console.error("❌ Error deleting product:", err);
    }
  };

  const handleEdit = (product) => {
    setEditingId(product._id);
    setFormData({
      name: product.name,
      category: product.category,
      details: product.details,
      image: null,
      preview: product.image,
      rating: product.rating || 0, // get rating or default 0
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      image: file,
      preview: URL.createObjectURL(file),
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("category", formData.category);
      data.append("details", formData.details);
      data.append("rating", formData.rating); // append rating
      if (formData.image) data.append("image", formData.image);

      const res = await axios.put(`/products/update/${editingId}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setProducts(products.map((p) => (p._id === editingId ? res.data : p)));
      setEditingId(null);
      setFormData({
        name: "",
        category: "",
        details: "",
        image: null,
        preview: "",
        rating: 0,
      });
    } catch (err) {
      console.error("❌ Error updating product:", err);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-extrabold mb-8 text-center text-green-700">
        📦 Product Management Dashboard
      </h1>

      {/* Edit Form */}
      {editingId && (
        <form
          onSubmit={handleUpdate}
          className="border border-gray-200 rounded-2xl shadow-lg p-6 bg-white mb-10"
        >
          <h2 className="text-2xl font-semibold mb-4 text-blue-600">
            ✏️ Edit Product
          </h2>

          {formData.preview && (
            <img
              src={formData.preview}
              alt="Preview"
              className="w-40 h-40 object-cover mb-4 rounded-xl border shadow-md"
            />
          )}

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mb-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                       file:rounded-lg file:border-0 file:text-sm file:font-semibold
                       file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="w-full border p-3 rounded-lg mb-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category"
            className="w-full border p-3 rounded-lg mb-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <textarea
            name="details"
            value={formData.details}
            onChange={handleChange}
            placeholder="Product Details"
            className="w-full border p-3 rounded-lg mb-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows="3"
            required
          />

          {/* Rating dropdown */}
          <label className="block mb-2 font-semibold text-gray-700">Rating:</label>
          <select
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg mb-6 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value={0}>0 Stars</option>
            <option value={1}>1 Star</option>
            <option value={2}>2 Stars</option>
            <option value={3}>3 Stars</option>
            <option value={4}>4 Stars</option>
            <option value={5}>5 Stars</option>
          </select>

          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
            >
              ✅ Save Changes
            </button>
            <button
              type="button"
              onClick={() => setEditingId(null)}
              className="flex-1 bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition"
            >
              ❌ Cancel
            </button>
          </div>
        </form>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product._id}
            className="border rounded-2xl shadow-lg p-5 bg-white hover:shadow-2xl transition"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-xl mb-4"
            />
            <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-semibold">Category:</span> {product.category}
            </p>
            <p className="text-sm text-gray-700 mb-2">{product.details}</p>

            {/* Show stars */}
            <p className="text-yellow-500 text-lg font-semibold mb-4">
              {renderStars(product.rating)}{" "}
              <span className="text-gray-500 text-sm">({product.rating} Stars)</span>
            </p>

            <div className="flex justify-between">
              <button
                onClick={() => handleEdit(product)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => handleDelete(product._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                🗑 Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Productimage;
