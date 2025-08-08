import React from "react";
import SingleProductCard from "./SingleProductCard";

const ProductCard = ({ products = [], segment, theme }) => {
  const filteredProducts = segment
    ? products.filter(
        (p) => p.generalInfo?.segment?.toLowerCase() === segment.toLowerCase()
      )
    : products;

  if (filteredProducts.length === 0) {
    return (
      <p className="text-center text-gray-600 text-sm">
        No products found for segment: {segment}
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
