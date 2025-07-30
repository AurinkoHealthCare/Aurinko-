import React from "react";
import ProductsList from "../../../../utils/products";

const Block5 = () => {

  return (
    <div className="py-16 px-2 md:px-6 lg:px-8">
      {/* Heading */}
      <div className="flex flex-col items-center justify-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-red-700 mb-4">
          GLOBAL PROVIDER OF PERSONAL CARE
        </h1>
        <div
          className="h-1 w-64 rounded-full"
          style={{
            background: "linear-gradient(to right, #dc2626, #7f1d1d)",
          }}
        ></div>
      </div>

      {/* Cards */}
      <ProductsList category="Personal care" theme="Personal care" showHeading={false} />
    </div>
  );
};

export default Block5;
