import React, { useEffect, useState } from "react";
import axios from "../../../../api/axios";

// Render stars as ★★★☆☆
const renderStars = (rating) => {
  return "★".repeat(Number(rating)) + "☆".repeat(5 - Number(rating));
};

const Productimage = () => {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    details: "",
    image: null,
    preview: "",
    rating: 0,
    translations: { fr: {}, es: {}, ar: {}, ko: {} },
  });
  const [lang, setLang] = useState("en");

  useEffect(() => {
    fetchProducts();
  }, [lang]);

  // ✅ Fetch Products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/products/get?lang=${lang}`);
      setProducts(data);
    } catch (err) {
      console.error("❌ Error fetching products:", err);
      alert("Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete Product
  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      setLoading(true);
      await axios.delete(`/products/delete/${productId}`);
      setProducts(products.filter((p) => p.productId !== productId));
      alert("✅ Product deleted successfully!");
    } catch (err) {
      console.error("❌ Error deleting product:", err);
      alert("Delete failed. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Start Editing Product
  const handleEdit = (product) => {
    setEditingId(product.productId);
    setFormData({
      name: product.name,
      category: product.category,
      details: product.details,
      image: null,
      preview: product.image,
      rating: product.rating || 0,
      translations: product.translations || { fr: {}, es: {}, ar: {}, ko: {} },
    });
  };

  // ✅ Handle Basic Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle Translations
  const handleTranslationChange = (e, langKey) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      translations: {
        ...prev.translations,
        [langKey]: { ...prev.translations[langKey], [name]: value },
      },
    }));
  };

  // ✅ Handle Image Upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      image: file,
      preview: URL.createObjectURL(file),
    }));
  };

  // ✅ Update Product
 // ✅ Update Product
const handleUpdate = async (e) => {
  e.preventDefault();
  try {
    setLoading(true);
    const data = new FormData();
    data.append("name", formData.name);
    data.append("category", formData.category);
    data.append("details", formData.details);
    data.append("rating", formData.rating);
    data.append("translations", JSON.stringify(formData.translations));
    if (formData.image) data.append("image", formData.image);

    // 🐞 Debug log
    console.log("📤 Sending Update:", [...data.entries()]);

    const res = await axios.put(`/products/update/${editingId}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setProducts(
      products.map((p) => (p.productId === editingId ? res.data : p))
    );
    setEditingId(null);
    setFormData({
      name: "",
      category: "",
      details: "",
      image: null,
      preview: "",
      rating: 0,
      translations: { fr: {}, es: {}, ar: {}, ko: {} },
    });
    alert("✅ Product updated successfully!");
  } catch (err) {
    console.error("❌ Error updating product:", err.response || err);
    alert("Update failed. Check console for details.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-extrabold mb-8 text-center text-green-700">
        📦 Product Management Dashboard
      </h1>

      {/* Language Selector */}
      <div className="mb-6 flex justify-center">
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          className="border p-2 rounded-lg shadow-sm"
        >
          <option value="en">English</option>
          <option value="fr">French</option>
          <option value="es">Spanish</option>
          <option value="ar">Arabic</option>
          <option value="ko">Korean</option>
        </select>
      </div>

      {/* Loading Indicator */}
      {loading && <p className="text-center text-blue-600 mb-6">⏳ Loading...</p>}

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

          <label className="block mb-2 font-semibold text-gray-700">Rating:</label>
          <select
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg mb-6 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            {[0, 1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num} {num === 1 ? "Star" : "Stars"}
              </option>
            ))}
          </select>

          {["fr", "es", "ar", "ko"].map((langKey) => (
            <div key={langKey} className="mb-6">
              <h3 className="font-semibold mb-2 text-gray-700">
                {langKey.toUpperCase()} Translation
              </h3>
              <input
                type="text"
                name="name"
                value={formData.translations[langKey]?.name || ""}
                onChange={(e) => handleTranslationChange(e, langKey)}
                placeholder={`Name (${langKey.toUpperCase()})`}
                className="w-full border p-2 rounded mb-2"
              />
              <input
                type="text"
                name="category"
                value={formData.translations[langKey]?.category || ""}
                onChange={(e) => handleTranslationChange(e, langKey)}
                placeholder={`Category (${langKey.toUpperCase()})`}
                className="w-full border p-2 rounded mb-2"
              />
              <textarea
                name="details"
                value={formData.translations[langKey]?.details || ""}
                onChange={(e) => handleTranslationChange(e, langKey)}
                placeholder={`Details (${langKey.toUpperCase()})`}
                className="w-full border p-2 rounded"
                rows="2"
              />
            </div>
          ))}

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
        {products.map((product, index) => {
          console.log("Rendering Product:", product);
          const productId = product.productId;

          return (
            <div
              key={productId || index}
              className="border rounded-2xl shadow-lg p-5 bg-white hover:shadow-2xl transition"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {product.name}
              </h3>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-semibold">Category:</span>{" "}
                {product.category}
              </p>
              <p className="text-sm text-gray-700 mb-2">{product.details}</p>

              <p className="text-yellow-500 text-lg font-semibold mb-4">
                {renderStars(product.rating)}{" "}
                <span className="text-gray-500 text-sm">
                  ({product.rating} Stars)
                </span>
              </p>

              <div className="flex justify-between">
                <button
                  onClick={() => handleEdit(product)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(productId)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Productimage;
