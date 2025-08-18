import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const First_page = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products") // tumhari backend API
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-10 p-10 min-h-screen bg-gray-100">
      {products.map((product, index) => (
        <Link
          to={`/product/${product.id}`}
          key={index}
          className="w-64 h-72 p-5 bg-white rounded-2xl shadow-md text-center cursor-pointer 
                     transition-transform duration-300 hover:scale-105 border"
        >
          <img
            src={product.productImage}
            alt={product.name}
            className="w-full h-40 object-cover rounded-xl mb-4"
          />
          <p className="text-base font-medium text-gray-700">{product.name}</p>
        </Link>
      ))}
    </div>
  );
};

export default First_page;
