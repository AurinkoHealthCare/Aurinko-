import React, { useEffect, useState } from "react";
import axios from "../../../api/axios";
import { Link } from "react-router-dom";

const Healthsupplement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/products2/all");
        setProducts(res.data);
      } catch (err) {
        console.error("❌ Error fetching products", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <p className="text-center">Loading products...</p>;

  // Group by category
  const categories = products.reduce((acc, product) => {
    const category = product.category || "Others";
    if (!acc[category]) acc[category] = [];
    acc[category].push(product);
    return acc;
  }, {});

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Health Supplements</h1>
      {Object.keys(categories).map((cat) => (
        <div key={cat} className="mb-8">
          <h2 className="text-xl font-semibold mb-2">{cat}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories[cat].map((product) => (
              <Link
                key={product._id}
                to={`/segment/${product.segment}`}
                className="border rounded p-3 hover:shadow-lg transition"
              >
                <img
                  src={product.productImage}
                  alt={product.name}
                  className="h-32 w-full object-cover rounded"
                />
                <p className="mt-2 font-medium">{product.name}</p>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Healthsupplement;
