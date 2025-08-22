import React, { useEffect, useState } from "react";
import axios from "../../../../api/axios";
import ProductsList from "../../../../utils/products";
import { useTranslation } from "react-i18next";

const Block5 = () => {
  const { t } = useTranslation("home_parts");
  const [headerImage, setHeaderImage] = useState(null);
  const [loadingHeader, setLoadingHeader] = useState(false);

  // Fetch header image
  const fetchHeaderImage = async () => {
    try {
      setLoadingHeader(true);
      const res = await axios.get("/otherimage/all");
      const arr = Array.isArray(res.data) ? res.data : res.data?.data || [];
      const selected = arr.find(
        (img) => img.imageName?.toLowerCase() === "ayush"
      ); // ✅ backend imageName must be "Ayush"
      setHeaderImage(selected || null);
    } catch (err) {
      console.error("❌ Failed to fetch Ayush header image", err);
    } finally {
      setLoadingHeader(false);
    }
  };

  useEffect(() => {
    fetchHeaderImage();
  }, []);

  return (
    <div>
      {/* Show header image + heading only if image is found */}
      {headerImage && (
        <>
          <div className="relative w-full">
            <img
              src={headerImage.url}
              alt={headerImage.imageName}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col items-center justify-center my-12">
            <h1 className="text-3xl lg:text-4xl font-bold text-center text-red-700 mb-4">
              {t("block5.heading")}
            </h1>
          </div>
        </>
      )}

      {/* Cards */}
      <div className="py-16 px-2 md:px-6 lg:px-8">
        <ProductsList
          apiUrl="/products/get"
          category="Ayush"
          limit={5}
          theme="Personal care"
          showHeading={false}
        />
      </div>
    </div>
  );
};

export default Block5;
