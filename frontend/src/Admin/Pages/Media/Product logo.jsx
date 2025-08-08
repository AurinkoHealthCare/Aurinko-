import React, { useState, useEffect } from "react";
import axios from "../../../../api/axios";

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editProduct, setEditProduct] = useState(null);
  const [formData, setFormData] = useState(initialFormData());

  function initialFormData() {
    return {
      name: "",
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
        [name]: files[0], // agar file diya gaya ho toh overwrite kare
      }));
    }
  };

  const startEdit = (product) => {
    setEditProduct(product);
    setFormData({
      name: product.generalInfo?.name || "",
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
  };

  const cancelEdit = () => {
    setEditProduct(null);
    setFormData(initialFormData());
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

  if (loading) return <p className="text-center text-gray-600 text-sm">Loading products...</p>;

  return (
    <div className="max-w-6xl mx-auto px-3 py-6">
      <h1 className="text-2xl font-bold text-center text-green-700 mb-6">Multiple product management</h1>

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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
            {[
              "name", "segment", "type", "category", "packing",
              "composition", "indications", "usage", "feedback"
            ].map((field) => (
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

            {/* Report Field */}
            <div>
              <label className="block text-sm font-medium">Report</label>
              <input type="file" name="report" onChange={handleFileChange} />
              <input
                type="text"
                name="report"
                placeholder="Or enter report URL/text"
                value={typeof formData.report === "string" ? formData.report : ""}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-2 py-1 text-sm mt-1"
              />
              {editProduct?.report && (
                <a href={editProduct.report} target="_blank" className="text-xs text-blue-600 underline">
                  View current report
                </a>
              )}
            </div>

            {/* Brochure Field */}
            <div>
              <label className="block text-sm font-medium">Brochure</label>
              <input type="file" name="brochure" onChange={handleFileChange} />
              <input
                type="text"
                name="brochure"
                placeholder="Or enter brochure URL/text"
                value={typeof formData.brochure === "string" ? formData.brochure : ""}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded px-2 py-1 text-sm mt-1"
              />
              {editProduct?.brochure && (
                <a href={editProduct.brochure} target="_blank" className="text-xs text-blue-600 underline">
                  View current brochure
                </a>
              )}
            </div>
          </div>

          {["fr", "es", "ar", "ko"].map((langKey) => (
            <div key={langKey} className="mb-4 border-t pt-3">
              <h4 className="font-semibold text-sm mb-2">{langKey.toUpperCase()} Translation</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {["name", "segment", "type", "category", "packing", "composition", "indications", "usage"].map((field) => (
                  <div key={field}>
                    <label className="text-sm font-medium capitalize">{field}</label>
                    <input
                      type="text"
                      name={field}
                      value={formData.translations[langKey]?.[field] || ""}
                      onChange={(e) => handleTranslationChange(e, langKey)}
                      placeholder={`${field} (${langKey})`}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="flex gap-3 mt-4">
            <button type="submit" className="bg-green-600 text-white px-4 py-1.5 text-sm rounded hover:bg-green-700">
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

      {/* Table of Products */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold mb-3">All Products</h2>
        {products.length === 0 ? (
          <p className="text-gray-500 text-sm">No products available.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border border-gray-300">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="border p-2">ID</th>
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Category</th>
                  <th className="border p-2">Segment</th>
                  <th className="border p-2">Image</th>
                  <th className="border p-2">Logo</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p._id} className="hover:bg-gray-50">
                    <td className="border p-2">{p.productId}</td>
                    <td className="border p-2">{p.generalInfo?.name || "-"}</td>
                    <td className="border p-2">{p.generalInfo?.category || "-"}</td>
                    <td className="border p-2">{p.generalInfo?.segment || "-"}</td>
                    <td className="border p-2">
                      {p.productImage && (
                        <img
                          src={p.productImage}
                          alt="Product"
                          className="h-10 w-10 object-cover rounded"
                        />
                      )}
                    </td>
                    <td className="border p-2">
                      {p.productLogo && (
                        <img
                          src={p.productLogo}
                          alt="Logo"
                          className="h-10 w-10 object-contain"
                        />
                      )}
                    </td>
                    <td className="border p-2">
                      <button
                        onClick={() => startEdit(p)}
                        className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(p._id)}
                        className="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductManager;
