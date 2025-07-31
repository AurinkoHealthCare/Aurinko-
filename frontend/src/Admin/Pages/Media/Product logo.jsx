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
    } catch (error) {
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
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
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
        } else if (val) {
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
      alert("❌ " + (err.response?.data?.message || "Error updating product"));
    }
  };

  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`/products2/delete/${productId}`);
      alert("✅ Product deleted!");
      fetchProducts();
    } catch (err) {
      alert("❌ Error deleting product");
    }
  };

  if (loading) return <p className="text-center text-gray-600">Loading products...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center text-green-800">
        Product Manager
      </h1>

      {editProduct && (
        <form onSubmit={handleUpdateProduct} className="mb-8 border p-6 rounded shadow bg-white">
          <h2 className="text-xl font-semibold mb-4">✏️ Edit Product</h2>

          {["name", "segment", "type", "category", "packing", "composition", "indications", "usage", "report", "brochure", "feedback"].map((field) => (
            <div key={field} className="mb-3">
              <label className="block font-semibold mb-1">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleInputChange}
                className="border p-2 rounded w-full"
                required={["name", "category"].includes(field)}
              />
            </div>
          ))}

          <div className="mb-3">
            <label className="block font-semibold mb-1">Product Image</label>
            <input type="file" name="productImage" onChange={handleFileChange} accept="image/*" />
          </div>
          <div className="mb-3">
            <label className="block font-semibold mb-1">Product Logo</label>
            <input type="file" name="productLogo" onChange={handleFileChange} accept="image/*" />
          </div>

          {["fr", "es", "ar", "ko"].map((langKey) => (
            <div key={langKey} className="mb-4 border-t pt-3">
              <h4 className="font-medium text-gray-700">
                🌐 {langKey.toUpperCase()} Translation
              </h4>
              {["name", "segment", "type", "category", "packing", "composition", "indications", "usage"].map((field) => (
                <input
                  key={field}
                  type="text"
                  name={field}
                  value={formData.translations[langKey]?.[field] || ""}
                  onChange={(e) => handleTranslationChange(e, langKey)}
                  placeholder={`${field.charAt(0).toUpperCase() + field.slice(1)} (${langKey.toUpperCase()})`}
                  className="w-full border p-2 rounded mb-2"
                />
              ))}
            </div>
          ))}

          <div className="mt-4 flex gap-4">
            <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
              ✅ Update
            </button>
            <button type="button" onClick={cancelEdit} className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700">
              ❌ Cancel
            </button>
          </div>
        </form>
      )}

      <div>
        <h2 className="text-xl font-semibold mb-4">📋 All Products</h2>
        {products.length === 0 ? (
          <p className="text-gray-600">No products found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200 text-left">
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
                  <tr key={p._id}>
                    <td className="border p-2">{p.productId}</td>
                    <td className="border p-2">{p.generalInfo?.name || "-"}</td>
                    <td className="border p-2">{p.generalInfo?.category || "-"}</td>
                    <td className="border p-2">{p.generalInfo?.segment || "-"}</td>
                    <td className="border p-2">
                      {p.productImage && <img src={p.productImage} alt="Product" className="h-12" />}
                    </td>
                    <td className="border p-2">
                      {p.productLogo && <img src={p.productLogo} alt="Logo" className="h-12" />}
                    </td>
                    <td className="border p-2">
                      <button
                        onClick={() => startEdit(p)}
                        className="mr-2 bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(p._id)}
                        className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700"
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
