import React from "react";
import ProductsList from "../../../../utils/products";

const Block5 = () => {

  return (
    <div className="py-16 px-2 md:px-6 lg:px-8">
      {/* Heading */}
      <div className="flex flex-col items-center justify-center mb-12">
        <h1 className="text-3xl lg:text-4xl font-bold text-center text-[#01421d] mb-4">
          GLOBAL PROVIDER OF PERSONAL CARE
        </h1>
      </div>

      {/* Cards */}
      <ProductsList category="Agri" theme="Agri" showHeading={false} />
    </div>
  );
};

export default Block5;
