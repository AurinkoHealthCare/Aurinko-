import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "../../../../../api/axios";
import ProductCard from "../../../../../utils/ProductCard.jsx";

const Healthsupplements = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/products2/all");
        setProducts(res.data);
      } catch {
        alert("❌ Error fetching products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="font-sans">
      <div className="relative">
        <img
          src="/Assets/Human/Health supplements.webp"
          alt="Health supplements"
          className="w-full"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex flex-col items-center text-white p-8">
          <h1 className="lg:text-4xl font-bold">Health Supplements</h1>
        </div>
      </div>
      <div className="flex flex-col min-h-screen w-full p-4">
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-4">
          <ProductCard products={products} category={"Health Supplement"} />
        </div>
      </div>
    </div>
  );
};

export default Healthsupplements;
