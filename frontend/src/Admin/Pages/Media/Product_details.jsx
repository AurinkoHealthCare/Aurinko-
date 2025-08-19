import React, { useState, useEffect } from "react";
import axios from "../../../../api/axios";

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editProduct, setEditProduct] = useState(null);
  const [formData, setFormData] = useState(initialFormData());
  const [segmentFilter, setSegmentFilter] = useState("");
  const [activeLang, setActiveLang] = useState("en"); // ✅ For language tabs

  function initialFormData() {
    return {
      name: "",
      details: "",
      segment: "",
      type: "",
      category: "",
      packing: "",
      composition: "",
      indications: "",
      usage: "",
      report: "",
      brochure: "",
      feedback: "",
      productImage: null,
      productLogo: null,
      translations: { fr: {}, es: {}, ar: {}, ko: {} },
    };
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/products2/all");
      setProducts(res.data);
    } catch {
      alert("❌ Error fetching products");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    }
  };

  const startEdit = (product) => {
    setEditProduct(product);
    setFormData({
      name: product.generalInfo?.name || "",
      details: product.generalInfo?.details || "",
      segment: product.generalInfo?.segment || "",
      type: product.generalInfo?.type || "",
      category: product.generalInfo?.category || "",
      packing: product.generalInfo?.packing || "",
      composition: product.composition || "",
      indications: product.indications || "",
      usage: product.usage || "",
      report: product.report || "",
      brochure: product.brochure || "",
      feedback: product.feedback || "",
      productImage: null,
      productLogo: null,
      translations: product.translations || { fr: {}, es: {}, ar: {}, ko: {} },
    });
    setActiveLang("en"); // ✅ reset to English tab
  };

  const cancelEdit = () => {
    setEditProduct(null);
    setFormData(initialFormData());
    setActiveLang("en");
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      Object.entries(formData).forEach(([key, val]) => {
        if (key === "translations") {
          fd.append("translations", JSON.stringify(val));
        } else if (val instanceof File) {
          fd.append(key, val);
        } else if (typeof val === "string" && val.trim() !== "") {
          fd.append(key, val);
        }
      });

      await axios.put(`/products2/update/${editProduct._id}`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("✅ Product updated successfully!");
      cancelEdit();
      fetchProducts();
    } catch (err) {
      const message = err.response?.data?.message || "Error updating product";
      alert("❌ " + message);
    }
  };

  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`/products2/delete/${productId}`);
      alert("✅ Product deleted!");
      fetchProducts();
    } catch {
      alert("❌ Error deleting product");
    }
  };

  // ✅ Filtered products
  const filteredProducts = segmentFilter
    ? products.filter((p) => p.generalInfo?.segment === segmentFilter)
    : products;

  // ✅ Unique segments for dropdown
  const uniqueSegments = [...new Set(products.map((p) => p.generalInfo?.segment).filter(Boolean))];

  if (loading) return <p className="text-center text-gray-600 text-sm">Loading products...</p>;

  return (
    <div className="max-w-6xl mx-auto px-3 py-6">
      <h1 className="text-2xl font-bold text-center text-green-700 mb-6">
        Multiple product management
      </h1>

      {/* ✅ Filter Dropdown */}
      <div className="mb-4 flex gap-3 items-center">
        <label className="text-sm font-medium">Filter by Segment:</label>
        <select
          value={segmentFilter}
          onChange={(e) => setSegmentFilter(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 text-sm"
        >
          <option value="">All</option>
          {uniqueSegments.map((seg) => (
            <option key={seg} value={seg}>
              {seg}
            </option>
          ))}
        </select>
      </div>

      {/* ✅ Edit Form */}
      {editProduct && (
        <form
          onSubmit={handleUpdateProduct}
          className="mb-8 bg-white p-4 rounded-lg shadow-sm border border-gray-200"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            <div>
              <label className="block text-sm font-medium">Product Image</label>
              <input type="file" name="productImage" onChange={handleFileChange} />
            </div>
            <div>
              <label className="block text-sm font-medium">Product Logo</label>
              <input type="file" name="productLogo" onChange={handleFileChange} />
            </div>
          </div>

          <h2 className="text-lg font-semibold mb-3 text-green-800">Edit Product</h2>

          {/* ✅ Language Tabs */}
          <div className="flex gap-2 mb-4">
            {["en", "fr", "es", "ar", "ko"].map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => setActiveLang(lang)}
                className={`px-3 py-1.5 rounded text-sm font-medium ${
                  activeLang === lang ? "bg-green-600 text-white" : "bg-gray-200"
                }`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>

          {/* ✅ English Form */}
          {activeLang === "en" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
              {["name", "segment", "type", "category", "packing", "feedback"].map((field) => (
                <div key={field}>
                  <label className="text-sm font-medium capitalize">{field}</label>
                  <input
                    type="text"
                    name={field}
                    value={formData[field]}
                    onChange={handleInputChange}
                    required={field === "name" || field === "category"}
                    className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                  />
                </div>
              ))}

              {["details", "composition", "indications", "usage"].map((field) => (
                <div key={field} className="md:col-span-2">
                  <label className="text-sm font-medium capitalize">{field}</label>
                  <textarea
                    name={field}
                    rows={4}
                    value={formData[field]}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded px-2 py-2 text-sm"
                  />
                </div>
              ))}
            </div>
          )}

          {/* ✅ Translations */}
          {["fr", "es", "ar", "ko"].map((langKey) =>
            activeLang === langKey ? (
              <div key={langKey} className="mb-4">
                <h4 className="font-semibold text-sm mb-2">{langKey.toUpperCase()} Translation</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                  {["name", "segment", "type", "category", "packing", "feedback"].map((field) => (
                    <div key={field}>
                      <label className="text-sm font-medium capitalize">{field}</label>
                      <input
                        type="text"
                        name={field}
                        value={formData.translations[langKey][field] || ""}
                        onChange={(e) => handleTranslationChange(e, langKey)}
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                      />
                    </div>
                  ))}

                  {["details", "composition", "indications", "usage"].map((field) => (
                    <div key={field} className="md:col-span-2">
                      <label className="text-sm font-medium capitalize">{field}</label>
                      <textarea
                        name={field}
                        rows={4}
                        value={formData.translations[langKey][field] || ""}
                        onChange={(e) => handleTranslationChange(e, langKey)}
                        className="w-full border border-gray-300 rounded px-2 py-2 text-sm"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : null
          )}

          <div className="flex gap-3 mt-4">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-1.5 text-sm rounded hover:bg-green-700"
            >
              Update
            </button>
            <button
              type="button"
              onClick={cancelEdit}
              className="bg-gray-500 text-white px-4 py-1.5 text-sm rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* ✅ Product Cards */}
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-3">All Products</h2>
        {filteredProducts.length === 0 ? (
          <p className="text-gray-500 text-sm">No products available.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
            {filteredProducts.map((p) => (
              <div
                key={p._id}
                className="border bg-white border-gray-300 rounded-lg p-3 shadow hover:shadow-md transition"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-gray-500 font-mono">ID: {p.productId}</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="items-center">
                    {p.productImage && (
                      <img
                        src={p.productImage}
                        alt="Product"
                        className="object-cover h-40 m-2"
                      />
                    )}
                    {p.productLogo && (
                      <img src={p.productLogo} alt="Logo" className="h-10 object-contain" />
                    )}
                  </div>
                </div>
                <h3 className="text-base font-semibold text-gray-800 mb-1">
                  {p.generalInfo?.name || "-"}
                </h3>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Category:</span> {p.generalInfo?.category || "-"}
                </p>
                <p className="text-sm text-gray-600 mb-3">
                  <span className="font-medium">Segment:</span> {p.generalInfo?.segment || "-"}
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => startEdit(p)}
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="flex-1 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductManager;
