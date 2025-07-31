import React from "react";
import ProductsList from "../../../../utils/products";

const Block2 = () => {

  return (
    <div className="py-3 px-2 ">
      {/* Heading */}
      <div className="flex flex-col items-center justify-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-red-800 mb-4">
          GLOBAL PROVIDER OF HUMAN PROBIOTICS AND NUTRACEUTICALS
        </h1>
      </div>
      <ProductsList category="English" theme="Health Supplements" showHeading={false} />
    </div>
  );
};

export default Block2;
