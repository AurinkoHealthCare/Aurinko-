import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";

const Second_page = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

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

  const handleClick = (product) => {
    navigate(`/third/${product.productId}`, { state: { product } });
  };

  return (
    <div className="flex flex-wrap justify-center gap-6 p-8 min-h-screen bg-gray-100">
      {products.map((product) => (
        <div
          key={product.productId}
          className="w-64 h-72 p-4 bg-white rounded-2xl shadow-lg text-center cursor-pointer transition-transform duration-300 hover:scale-105"
          onClick={() => handleClick(product)}
        >
          <img
            src={product.productImage}
            alt={product.name}
            className="w-full h-40 object-cover rounded-xl mb-3"
          />
          <p className="text-sm font-medium text-gray-700">{product.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Second_page;
