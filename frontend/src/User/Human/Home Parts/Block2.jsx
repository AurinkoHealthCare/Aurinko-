import React from "react";
import ProductsList from "../../../../utils/products";
import { useTranslation } from 'react-i18next';

const Block2 = () => {
  const { t } = useTranslation("Human_home");

  return (
    <div className="py-3 px-2">
      {/* Heading */}
      <div className="flex flex-col items-center justify-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-red-800 mb-4">
          {t("block2.heading")}
        </h1>
      </div>

      {/* ✅ Sirf ek ProductsList - UI flip-card wala hi */}
      <ProductsList
        apiUrl="/products/get"
        category="Health Supplements"
        limit={5}
        theme="Health Supplements"
        showHeading={false}
      />
    </div>
  );
};

export default Block2;

