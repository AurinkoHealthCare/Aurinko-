import React from "react";
import ProductCardItem from "./ProductCardItem";

const ProductCardGrid = ({ products = [] }) => {
  if (products.length === 0) {
    return (
      <p className="text-center text-gray-500 text-sm mt-10">
        No products available.
      </p>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
        Our Products
      </h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCardItem key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductCardGrid;
