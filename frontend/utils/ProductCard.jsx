import React from "react";
import SingleProductCard from "./SingleProductCard";
import { useTranslation } from "react-i18next";

const ProductCard = ({ products = [], segment, theme }) => {
  const { i18n } = useTranslation();
  const filteredProducts = segment
    ? products.filter(
        (p) => p.generalInfo?.segment?.toLowerCase() === segment.toLowerCase()
      )
    : products;

  if (filteredProducts.length === 0) {
    return (
      <p className="text-center text-gray-600 text-sm">
        Comming soon {segment}
      </p>
    );
  }

  return (
    <div className="space-y-8">
      {filteredProducts.map((product, index) => (
        <SingleProductCard
          key={product._id || index}
          product={product}
          theme={theme}
        />
      ))}
    </div>
  );
};

export default ProductCard;
