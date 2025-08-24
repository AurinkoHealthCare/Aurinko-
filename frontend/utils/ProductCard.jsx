import React, { useState, useEffect } from "react";
import SingleProductCard from "./SingleProductCard";
import { useTranslation } from "react-i18next";

const themeColors = {
  Human: "from-red-500 to-red-700 border-red-500",
  Veterinary: "from-blue-500 to-blue-700 border-blue-500",
  Agriculture: "from-green-500 to-green-700 border-green-500",
  Default: "from-gray-400 to-gray-600 border-gray-400",
};

const ProductCard = ({ products = [], segment, theme = "Default" }) => {
  const { t, i18n } = useTranslation(); // ✅ t add kiya
  const [selectedCategory, setSelectedCategory] = useState(null);

  // ✅ Refresh hone ke baad bhi category remember rahegi
  useEffect(() => {
    const savedCategory = localStorage.getItem("selectedCategory");
    if (savedCategory) setSelectedCategory(savedCategory);
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      localStorage.setItem("selectedCategory", selectedCategory);
    } else {
      localStorage.removeItem("selectedCategory");
    }
  }, [selectedCategory]);

  // ✅ Segment ke hisaab se filter
  const segmentFiltered = segment
    ? products.filter(
        (p) =>
          p.generalInfo?.segment?.toLowerCase() === segment.toLowerCase()
      )
    : products;

  // ✅ Category list nikalna
  const categories = Array.from(
    new Set(segmentFiltered.map((p) => p.generalInfo?.category).filter(Boolean))
  ).map((Category) => {
    const catProducts = segmentFiltered.filter(
      (p) => p.generalInfo?.category === Category
    );
    const images = catProducts.map((p) => p.productImage).filter((img) => img);
    return { name: Category, images };
  });

  // ✅ Agar category select hai to uske products
  const filteredProducts = selectedCategory
    ? segmentFiltered.filter(
        (p) => p.generalInfo?.category === selectedCategory
      )
    : [];

  // ✅ Category Card Component
  const CategoryCard = ({ Category }) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
      if (!Category.images || Category.images.length <= 1) return;
      const interval = setInterval(() => {
        setIndex((prev) => (prev + 1) % Category.images.length);
      }, 3000);
      return () => clearInterval(interval);
    }, [Category.images]);

    const themeClass = themeColors[theme] || themeColors.Default;

    return (
      <div
        onClick={() => setSelectedCategory(Category.name)}
        className={`cursor-pointer rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition relative border-2 ${themeClass}`}
      >
        {Category.images && Category.images.length > 0 ? (
          <div className="relative group">
            <img
              src={Category.images[index]}
              alt={Category.name}
              className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        ) : (
          <div className="h-44 flex items-center justify-center bg-gray-200 text-gray-500">
            No Image
          </div>
        )}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/90 px-4 py-1 rounded-full text-sm font-semibold shadow">
          {t(Category.name)}
        </div>
      </div>
    );
  };

  // ✅ Agar segment me product hi nahi
  if (segmentFiltered.length === 0) {
    return (
      <p className="text-center text-gray-600 text-sm">
        Coming soon {segment}
      </p>
    );
  }

  return (
    <div className="w-full">
      {/* Category list */}
      {!selectedCategory && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
          {categories.map((Category, index) => (
            <CategoryCard key={index} Category={Category} />
          ))}
        </div>
      )}

      {/* Selected Category ke products */}
      {selectedCategory && (
        <div className="p-4">
          <button
            onClick={() => setSelectedCategory(null)}
            className="mb-6 px-5 py-2 bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-lg shadow hover:opacity-90"
          >
            ← Back to Categories
          </button>
          <div>
            {filteredProducts.map((product, index) => (
              <SingleProductCard
                key={product._id || index}
                product={product}
                theme={theme}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
