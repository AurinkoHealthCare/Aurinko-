import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "../../../../../api/axios";
import ProductCard from "../../../../../utils/ProductCard.jsx";
import { useTranslation } from 'react-i18next';

const Neunaparticles = () => {
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
          src="/Assets/Nano-biotechnology Compounds/Neuna Particles.webp"
          alt="Health supplements"
          className="w-full"
        />
      </div>
      <div className="flex flex-col w-full p-4">
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-4">
          <ProductCard products={products} segment="Neunaparticles" theme="Human" />
        </div>
      </div>
    </div>
  );
};

export default Neunaparticles;
