import React, { useState, useEffect } from "react";
import axios from "../../../../api/axios";

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editProduct, setEditProduct] = useState(null); // product being edited

  // Form state for editing only
  const [formData, setFormData] = useState({
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
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("/products2/get2");
      setProducts(res.data);
    } catch (error) {
      alert("Error fetching products");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    setFormData((prev) => ({ ...prev, [name]: e.target.files[0] }));
  };

  // Start editing a product: populate form with product data
  const startEdit = (product) => {
    setEditProduct(product);
    setFormData({
      name: product.generalInfo.name || "",
      segment: product.generalInfo.segment || "",
      type: product.generalInfo.type || "",
      category: product.generalInfo.category || "",
      packing: product.generalInfo.packing || "",
      composition: product.composition || "",
      indications: product.indications || "",
      usage: product.usage || "",
      report: product.report || "",
      brochure: product.brochure || "",
      feedback: product.feedback || "",
      productImage: null, // no file pre-loaded
      productLogo: null,
    });
  };

  const cancelEdit = () => {
    setEditProduct(null);
    setFormData({
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
    });
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      Object.entries(formData).forEach(([key, val]) => {
        if (val) fd.append(key, val);
      });
      await axios.put(`/products2/update2/${editProduct._id}`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Product updated successfully!");
      cancelEdit();
      fetchProducts();
    } catch (err) {
      alert(err.response?.data?.message || "Error updating product");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`/products2/delete2/${id}`);
      alert("Product deleted!");
      fetchProducts();
    } catch (err) {
      alert("Error deleting product");
    }
  };

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center text-green-800">Product Manager</h1>

      {/* Edit form only visible when editing */}
      {editProduct && (
        <form
          onSubmit={handleUpdateProduct}
          className="mb-8 border p-6 rounded shadow"
        >
          <h2 className="text-xl font-semibold mb-4">Edit Product</h2>

          {/* Text Inputs */}
          {[
            { label: "Name", name: "name" },
            { label: "Segment", name: "segment" },
            { label: "Type", name: "type" },
            { label: "Category", name: "category" },
            { label: "Packing", name: "packing" },
            { label: "Composition", name: "composition" },
            { label: "Indications", name: "indications" },
            { label: "Usage", name: "usage" },
            { label: "Report", name: "report" },
            { label: "Brochure", name: "brochure" },
            { label: "Feedback", name: "feedback" },
          ].map(({ label, name }) => (
            <div key={name} className="mb-3">
              <label className="block font-semibold mb-1">{label}</label>
              <input
                type="text"
                name={name}
                value={formData[name]}
                onChange={handleInputChange}
                className="border p-2 rounded w-full"
                required={name === "name" || name === "category"}
              />
            </div>
          ))}

          {/* File Inputs */}
          <div className="mb-3">
            <label className="block font-semibold mb-1">Product Image</label>
            <input type="file" name="productImage" onChange={handleFileChange} accept="image/*" />
          </div>

          <div className="mb-3">
            <label className="block font-semibold mb-1">Product Logo</label>
            <input type="file" name="productLogo" onChange={handleFileChange} accept="image/*" />
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
          >
            Update Product
          </button>

          <button
            type="button"
            onClick={cancelEdit}
            className="ml-4 bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700"
          >
            Cancel
          </button>
        </form>
      )}

      {/* Products List */}
      <div>
        <h2 className="text-xl font-semibold mb-4">All Products</h2>
        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">Name</th>
                <th className="border border-gray-300 p-2">Category</th>
                <th className="border border-gray-300 p-2">Segment</th>
                <th className="border border-gray-300 p-2">Image</th>
                <th className="border border-gray-300 p-2">Logo</th>
                <th className="border border-gray-300 p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id}>
                  <td className="border border-gray-300 p-2">{p.generalInfo.name}</td>
                  <td className="border border-gray-300 p-2">{p.generalInfo.category}</td>
                  <td className="border border-gray-300 p-2">{p.generalInfo.segment}</td>
                  <td className="border border-gray-300 p-2">
                    {p.productImage && <img src={p.productImage} alt="Product" className="h-12" />}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {p.productLogo && <img src={p.productLogo} alt="Logo" className="h-12" />}
                  </td>
                  <td className="border border-gray-300 p-2">
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
        )}
      </div>
    </div>
  );
};

export default ProductManager;
