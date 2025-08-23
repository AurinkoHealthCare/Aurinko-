import React, { useEffect, useState } from "react";
import axios from "../../../../api/axios";

const LANGUAGES = ["en", "fr", "es", "ar", "ko"];

const renderStars = (rating) => {
  return "★".repeat(Number(rating)) + "☆".repeat(5 - Number(rating));
};

const Global_Providers = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: LANGUAGES.reduce((acc, lang) => ({ ...acc, [lang]: "" }), {}),
    category: LANGUAGES.reduce((acc, lang) => ({ ...acc, [lang]: "" }), {}),
    details: LANGUAGES.reduce((acc, lang) => ({ ...acc, [lang]: "" }), {}),
    rating: 0,
    image: null,
    preview: "",
  });

  const [lang, setLang] = useState("en");
  const [activeLang, setActiveLang] = useState("en");

  useEffect(() => {
    fetchProducts();
  }, [lang]);

  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter(
          (p) => p.category?.toLowerCase() === selectedCategory.toLowerCase()
        )
      );
    }
  }, [selectedCategory, products]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/products/get?lang=${lang}`);
      setProducts(data);
      setFilteredProducts(data);

      const uniqueCategories = [
        ...new Set(data.map((p) => p.category).filter(Boolean)),
      ];
      setCategories(uniqueCategories);
    } catch (err) {
      alert("Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      setLoading(true);
      await axios.delete(`/products/delete/${productId}`);
      await fetchProducts();
      alert("✅ Product deleted successfully!");
    } catch (err) {
      console.error("❌ Error deleting product:", err);
      alert("Delete failed. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setEditingId(product.productId);

    setFormData({
      name: {
        en: product.name,
        ...Object.fromEntries(
          LANGUAGES.filter((l) => l !== "en").map((l) => [
            l,
            product.translations?.[l]?.name || "",
          ])
        ),
      },
      category: {
        en: product.category,
        ...Object.fromEntries(
          LANGUAGES.filter((l) => l !== "en").map((l) => [
            l,
            product.translations?.[l]?.category || "",
          ])
        ),
      },
      details: {
        en: product.details,
        ...Object.fromEntries(
          LANGUAGES.filter((l) => l !== "en").map((l) => [
            l,
            product.translations?.[l]?.details || "",
          ])
        ),
      },
      rating: product.rating || 0,
      image: null,
      preview: product.image,
    });
    setActiveLang("en");
  };

  const handleInputChange = (field, langKey, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: { ...prev[field], [langKey]: value },
    }));
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
      setLoading(true);
      const data = new FormData();
      data.append("name", JSON.stringify(formData.name));
      data.append("category", JSON.stringify(formData.category));
      data.append("details", JSON.stringify(formData.details));
      data.append("rating", formData.rating);
      if (formData.image) data.append("image", formData.image);

      await axios.put(`/products/update/${editingId}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      await fetchProducts();
      setEditingId(null);
      setFormData({
        name: LANGUAGES.reduce((acc, lang) => ({ ...acc, [lang]: "" }), {}),
        category: LANGUAGES.reduce((acc, lang) => ({ ...acc, [lang]: "" }), {}),
        details: LANGUAGES.reduce((acc, lang) => ({ ...acc, [lang]: "" }), {}),
        rating: 0,
        image: null,
        preview: "",
      });
      alert("✅ Product updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Update failed. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-extrabold mb-8 text-center text-green-700">
        📦 GLOBAL PROVIDER LIST
      </h1>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap justify-center gap-4">
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          className="border p-2 rounded-lg shadow-sm"
        >
          {LANGUAGES.map((l) => (
            <option key={l} value={l}>
              {l.toUpperCase()}
            </option>
          ))}
        </select>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border p-2 rounded-lg shadow-sm"
        >
          <option value="all">All Categories</option>
          {categories.map((cat, i) => (
            <option key={i} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {loading && (
        <p className="text-center text-blue-600 mb-6">⏳ Loading...</p>
      )}

      {/* Edit Form */}
      {editingId && (
        <form
          onSubmit={handleUpdate}
          className="border border-gray-200 rounded-2xl shadow-lg p-6 bg-white mb-10"
        >
          <h2 className="text-xl font-bold mb-4 text-blue-700">
            ✏️ Edit Product
          </h2>

          {/* ✅ Language Tabs */}
          <div className="flex gap-2 mb-6">
            {LANGUAGES.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setActiveLang(l)}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  activeLang === l
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          {/* ✅ Dynamic Inputs */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                value={formData.name[activeLang]}
                onChange={(e) =>
                  handleInputChange("name", activeLang, e.target.value)
                }
                placeholder={`Name (${activeLang.toUpperCase()})`}
                className="w-full border p-2 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <input
                type="text"
                value={formData.category[activeLang]}
                onChange={(e) =>
                  handleInputChange("category", activeLang, e.target.value)
                }
                placeholder={`Category (${activeLang.toUpperCase()})`}
                className="w-full border p-2 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Details</label>
              <textarea
                value={formData.details[activeLang]}
                onChange={(e) =>
                  handleInputChange("details", activeLang, e.target.value)
                }
                placeholder={`Details (${activeLang.toUpperCase()})`}
                rows="4"
                className="w-full border p-2 rounded-lg"
              />
            </div>
          </div>

          {/* Rating */}
          <div className="mt-4">
            <label className="block text-sm font-medium mb-1">Rating</label>
            <input
              type="number"
              name="rating"
              min="0"
              max="5"
              value={formData.rating}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, rating: e.target.value }))
              }
              className="w-full border p-2 rounded-lg"
            />
          </div>

          {/* Image Upload */}
          <div className="mt-4">
            <label className="block text-sm font-medium mb-1">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full"
            />
            {formData.preview && (
              <img
                src={formData.preview}
                alt="Preview"
                className="mt-2 h-32 object-contain rounded-lg border"
              />
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={() => setEditingId(null)}
              className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
            >
              ✅ Update
            </button>
          </div>
        </form>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product, index) => {
          const productId = product.productId;

          const displayData =
            lang === "en"
              ? product
              : {
                  ...product,
                  name: product.translations?.[lang]?.name || product.name,
                  category:
                    product.translations?.[lang]?.category || product.category,
                  details:
                    product.translations?.[lang]?.details || product.details,
                };

          return (
            <div
              key={productId || index}
              className="border rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 p-4 flex flex-col"
            >
              <div className="relative h-64 w-full mb-4 overflow-hidden rounded-xl">
                <img
                  src={product.image}
                  alt={displayData.name}
                  className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
                />
              </div>

              <h3 className="text-lg font-bold text-gray-800 mb-1">
                {displayData.name}
              </h3>
              <p className="text-sm text-gray-500 mb-1">
                <span className="font-semibold text-gray-600">Category:</span>{" "}
                {displayData.category}
              </p>
              <div className="text-sm text-gray-700 mb-3 h-30 overflow-y-auto rounded-md p-2 no-scrollbar">
                {displayData.details}
              </div>

              <p className="text-yellow-500 text-lg font-medium mb-4">
                {renderStars(product.rating)}{" "}
                <span className="text-gray-500 text-sm ml-1">
                  ({product.rating} Stars)
                </span>
              </p>

              <div className="mt-auto flex justify-between gap-3">
                <button
                  onClick={() => handleEdit(product)}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(productId)}
                  className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
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

export default Global_Providers;
