import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "../../../../../api/axios";
import ProductCard from "../../../../../utils/ProductCard.jsx";
import { useTranslation } from 'react-i18next';

const SoilMinerals = () => {
  const { t } = useTranslation("home_parts");
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [headerImage, setHeaderImage] = useState(null);
  const [loadingHeader, setLoadingHeader] = useState(false);

  const [searchParams] = useSearchParams();
  const segment = searchParams.get("segment");
  const theme = searchParams.get("theme");

  // Fetch header image
  const fetchHeaderImage = async () => {
    try {
      setLoadingHeader(true);
      const res = await axios.get("/otherimage/all");
      const arr = Array.isArray(res.data) ? res.data : res.data?.data || [];
      const selected = arr.find(
        (img) => img.imageName?.toLowerCase() === "soil minerals"
      );
      setHeaderImage(selected || null);
    } catch (err) {
      console.error("Failed to fetch header image ❌", err);
    } finally {
      setLoadingHeader(false);
    }
  };

  // Fetch products
  const fetchProducts = async () => {
    try {
      setLoadingProducts(true);
      const res = await axios.get("/products2/all");
      const filtered = segment
        ? res.data.filter(
          (item) => item.segment?.toLowerCase() === segment.toLowerCase()
        )
        : res.data;
      setProducts(filtered);
    } catch {
      alert("❌ Error fetching products");
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    fetchHeaderImage();
    fetchProducts();
  }, [segment]);

  return (
    <div className={`font-sans ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      {/* Header Section */}
      <div className="relative w-full">
        {loadingHeader ? (
          <div className="w-full h-64 flex items-center justify-center bg-gray-100">
            <p className="text-gray-500">Loading header image...</p>
          </div>
        ) : headerImage ? (
          <div className="relative w-full">
            <img
              src={headerImage.url}
              alt={headerImage.imageName}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-full h-64 flex items-center justify-center bg-gray-100">
            <p className="text-gray-500">No "Soil Minerals" image found</p>
          </div>
        )}
      </div>

      <div className="flex flex-col w-full p-4">
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-4">
          <ProductCard products={products} segment="Soil Minerals" theme="Agriculture" />
        </div>
      </div>
    </div>
  );
};

export default SoilMinerals;
