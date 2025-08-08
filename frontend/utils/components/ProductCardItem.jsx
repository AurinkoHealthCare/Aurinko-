import React from "react";
import { Link } from "react-router-dom";

const ProductCardItem = ({ product }) => {
  return (
    <Link to={`/product/${product._id}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 p-4 flex flex-col items-center border border-gray-200">
        <img
          src={product.productImage}
          alt="Product"
          className="h-40 w-40 object-cover rounded-md"
        />
        <img
          src={product.productLogo}
          alt="Logo"
          className="h-12 w-36 object-contain mt-3"
        />
      </div>
    </Link>
  );
};

export default ProductCardItem;
