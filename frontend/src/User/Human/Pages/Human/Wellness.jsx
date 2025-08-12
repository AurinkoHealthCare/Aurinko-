import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "../../../../../api/axios";
import ProductCard from "../../../../../utils/ProductCard.jsx";
import { useTranslation } from 'react-i18next';

const Wellness = () => {
  const { t } = useTranslation("home_parts");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  const segment = searchParams.get("segment");
  const theme = searchParams.get("theme");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/products2/all");
        const filtered = segment
          ? res.data.filter((item) => item.segment?.toLowerCase() === segment.toLowerCase())
          : res.data;
        setProducts(filtered);
      } catch {
        alert("❌ Error fetching products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [segment]);

  return (
    <div className={`font-sans ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      <div className="relative">
        <img
          src="/Assets/Human/Health supplements.webp"
          alt="Health supplements"
          className="w-full"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex flex-col items-center text-white p-8">
          <h1 className="lg:text-4xl font-bold">Wellness</h1>
        </div>
      </div>
      <div className="flex flex-col w-full p-4">
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-4">
          <ProductCard products={products} segment="Wellness" theme="Human" />
        </div>
      </div>
    </div>
  );
};

export default Wellness;
