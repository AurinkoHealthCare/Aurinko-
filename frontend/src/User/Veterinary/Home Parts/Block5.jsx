import React from "react";
import ProductsList from "../../../../utils/products";

const Block5 = () => {

  return (
    <div className="py-16 px-2 md:px-6 lg:px-8">
      {/* Heading */}
      <div className="flex flex-col items-center justify-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-green-800 mb-4">
          GLOBAL PROVIDER OF PET
        </h1>
      </div>

      {/* Cards */}
      <ProductsList category="Pet" theme="Pet" showHeading={false} />
    </div>
  );
};

export default Block5;
