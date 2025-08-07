import React from "react";
import { useTranslation } from "react-i18next";

const Block4 = () => {
  const { t } = useTranslation("home_parts");

  return (
    <div className="relative w-full mx-auto"> 
      <img
        src="/Assets/banner/aurinko banner.jpg"
        alt={t("productTypes")}
        className="w-full h-full object-cover"
        loading="eager"
      />
    </div>
  );
};

export default Block4;
