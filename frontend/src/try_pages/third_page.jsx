import React from "react";
import { useLocation, useParams } from "react-router-dom";
import SingleProductCard from "../../utils/SingleProductCard";

const Third_page = () => {
  const { state } = useLocation();
  const { productId } = useParams();
  const product = state?.product;

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500">❌ No product details found for ID {productId}</p>
      </div>
    );
  }

  return (
    <div className="p-6 flex justify-center">
      <SingleProductCard product={product} theme={product.segment} />
    </div>
  );
};

export default Third_page;
