import React from "react";
import ProductsList from "../../../../utils/products";
import { useTranslation } from 'react-i18next';

const Block2 = () => {
  const { t } = useTranslation("home_parts");

  return (
    <div className="py-16 px-2 md:px-6 lg:px-8">
      {/* Heading */}
      <div className="flex flex-col items-center justify-center mb-12">
        <h1 className="text-3xl lg:text-4xl font-bold text-center text-[#01421d] mb-4">
          {t("block2.heading3")}
        </h1>
      </div>

      {/* Cards */}
       <ProductsList
        apiUrl="/products/get"
        category="Agriculture"
        limit={5}
        theme="Agriculture"
        showHeading={false}
      />
    </div>
  );
};

export default Block2;
