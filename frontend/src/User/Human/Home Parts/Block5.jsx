import React from "react";
import ProductsList from "../../../../utils/products";
import { useTranslation } from 'react-i18next';

const Block5 = () => {
  const { t } = useTranslation("home_parts");

  return (
    <div className="py-16 px-2 md:px-6 lg:px-8">
      {/* Heading */}
      <div className="flex flex-col items-center justify-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-red-700 mb-4">
          {t("block5.heading")}
        </h1>
      </div>

      {/* Cards */}
      <ProductsList
        apiUrl="/products/get"
        category="Personal care"
        limit={5}
        theme="Personal care"
        showHeading={false}
      />
    </div>
  );
};

export default Block5;
