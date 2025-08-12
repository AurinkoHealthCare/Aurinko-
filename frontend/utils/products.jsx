import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { useTranslation } from "react-i18next";

const StarRating = ({ rating }) => (
  <div className="flex justify-center">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.962a1 1 0 00.95.69h4.166c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.961c.3.922-.755 1.688-1.54 1.118L10 13.347l-3.37 2.448c-.785.57-1.84-.196-1.54-1.118l1.287-3.961a1 1 0 00-.364-1.118L3.642 9.39c-.783-.57-.38-1.81.588-1.81h4.166a1 1 0 00.95-.69l1.286-3.962z" />
      </svg>
    ))}
  </div>
);

const ProductsList = ({ apiUrl = "/products/get", category, limit, theme, showHeading = true }) => {
  const [products, setProducts] = useState([]);
  const { i18n } = useTranslation();

  const themeClasses = {
    "Health Supplements": "text-red-800 border-red-300 bg-white",
    "Personal care": "text-red-800 border-red-300 bg-white",
    Veterinary: "text-blue-800 border-blue-300 bg-white",
    Pet: "text-blue-800 border-blue-300 bg-white",
    Agriculture: "text-green-800 border-green-300 bg-white",
    Agri: "text-green-800 border-green-300 bg-white",
    default: "bg-white text-gray-800 border-gray-200",
  };

  const appliedTheme = themeClasses[theme] || themeClasses.default;

  useEffect(() => {
    fetchProducts();
  }, [category, i18n.language]);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(apiUrl, { params: { category } });
      let filtered = data;
      if (limit) filtered = filtered.slice(0, limit);
      setProducts(filtered);
    } catch (err) {
      console.error("❌ Error fetching products:", err);
    }
  };

  if (products.length === 0) {
    return <p className="text-center text-gray-500 py-20">No products found.</p>;
  }

  return (
    <div>
      {showHeading && (
        <div className="flex flex-col items-center justify-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
            {category?.toUpperCase()} PRODUCTS
          </h1>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {products.map((product) => (
          <div key={product.productId} className="flip-card w-full max-w-xs mx-auto">
            <div className="flip-card-inner">
              {/* Front */}
              <div className={`flip-card-front shadow-lg rounded-xl overflow-hidden border transition duration-300 ${appliedTheme}`}>
                <img src={product.image} alt={product.name} className="w-full h-72 object-cover" />
                <div className="flex flex-col items-center p-3 text-center">
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <StarRating rating={product.rating} />
                  <span className="mt-3 text-xs font-medium px-3 py-1 rounded-full border">
                    {product.category}
                  </span>
                </div>
              </div>

              {/* Back */}
              <div className={`flip-card-back p-4 shadow-xl flex flex-col justify-center items-center text-center border ${appliedTheme}`}>
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="mt-3 text-sm max-h-60 overflow-y-auto no-scrollbar">{product.details}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>
        {`
        .flip-card {
          perspective: 1000px;
          height: 420px;
        }
        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.8s;
          transform-style: preserve-3d;
        }
        .flip-card:hover .flip-card-inner {
          transform: rotateY(180deg);
        }
        .flip-card-front,
        .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 0.75rem;
        }
        .flip-card-back {
          transform: rotateY(180deg);
        }
      `}
      </style>
    </div>
  );
};

export default ProductsList;
