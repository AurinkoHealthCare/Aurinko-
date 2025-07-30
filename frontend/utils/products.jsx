import React, { useEffect, useState } from "react";
import axios from "../api/axios";

const ProductsList = ({ category, limit }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/products/get");

      let filtered = category
        ? data.filter((p) => p.category === category)
        : data;

      if (limit) filtered = filtered.slice(0, limit);

      setProducts(filtered);
    } catch (err) {
      console.error("❌ Error fetching products:", err);
    }
  };

  if (products.length === 0) {
    return (
      <p className="text-center text-gray-500">
        No products found {category ? `in ${category}` : ""}.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div
          key={product._id}
          className="border rounded-lg shadow hover:shadow-lg transition p-4 bg-white"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-40 object-cover rounded mb-3"
          />
          <h3 className="font-bold text-lg">{product.name}</h3>
          <p className="text-sm text-gray-600">{product.category}</p>
          <p className="text-gray-700 mt-2 text-sm">{product.details}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductsList;
