import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const rawTabs = [
  "General Info",
  "Composition",
  "Indications",
  "Usage",
  "Report",
  "Brochure",
  "Feedback",
];

const themeClasses = {
  "Human OTC": {
    active: "bg-red-800 text-white border-l-4 border-red-400",
    inactive: "bg-red-700 text-white hover:bg-red-600",
  },
  Livestock: {
    active: "bg-blue-800 text-blue-400 border-l-4 border-blue-400",
    inactive: "bg-blue-700 text-white hover:bg-blue-600",
  },
  Agriculture: {
    active: "bg-green-800 text-green-400 border-l-4 border-green-400",
    inactive: "bg-green-700 text-white hover:bg-green-600",
  },
  default: {
    active: "bg-gray-800 text-gray-300 border-l-4 border-gray-400",
    inactive: "bg-gray-700 text-white hover:bg-gray-600",
  },
};

const getTabColorClasses = (theme, isActive) => {
  const themeKey = theme?.trim();
  const colors = themeClasses[themeKey] || themeClasses.default;
  return isActive ? colors.active : colors.inactive;
};

const SingleProductCard = ({ product, theme }) => {
  const [activeTab, setActiveTab] = useState("General Info");
  const { t } = useTranslation("productcart");

  const tabs = rawTabs.map((key) => ({ key, label: t(key) }));

  return (
    <div className="flex flex-col md:flex-row w-full max-w-full bg-white border border-neutral-300 overflow-hidden rounded shadow-md">
      {/* Product Image */}
      <div className="md:w-1/3 w-full p-3 flex justify-center">
        <img
          src={product.productImage}
          alt="Product"
          className="h-64 w-64 md:h-80 md:w-80 object-cover rounded-lg"
        />
      </div>

      {/* Product Content */}
      <div className="md:w-2/3 w-full p-4 flex flex-col border-l border-neutral-300">
        {/* Logo */}
        <img
          src={product.productLogo}
          alt="Product Logo"
          className="h-16 w-64 md:h-20 md:w-72 rounded-lg mb-3 object-contain"
        />

        {/* Tabs */}
        <div className="flex flex-wrap border-b border-neutral-300 pb-2">
          {tabs.map(({ key, label }) => (
            <button
              key={key}
              className={`px-3 py-1 text-xs md:text-sm lg:text-base transition duration-300 ${getTabColorClasses(
                theme,
                activeTab === key
              )}`}
              onClick={() => setActiveTab(key)}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mt-4 text-base text-gray-700 overflow-y-auto max-h-[60vh] p-2 whitespace-pre-wrap">
          {activeTab === "General Info" && (
            <>
              <h1 className="text-lg font-semibold">
                {product.generalInfo?.name}
              </h1>
              <p className="mt-2">{product.generalInfo?.details}</p>
              <p className="mt-2">
                <strong>{t("Segment")}:</strong> {product.generalInfo?.segment}
              </p>
              <p>
                <strong>{t("Type")}:</strong> {product.generalInfo?.type}
              </p>
              <p>
                <strong>{t("Category")}:</strong> {product.generalInfo?.category}
              </p>
              <p>
                <strong>{t("Packing")}:</strong> {product.generalInfo?.packing}
              </p>
            </>
          )}
          {activeTab === "Composition" && (
            <div dangerouslySetInnerHTML={{ __html: product.composition || "" }} />
          )}
          {activeTab === "Indications" && (
            <div dangerouslySetInnerHTML={{ __html: product.indications || "" }} />
          )}
          {activeTab === "Usage" && (
            <div dangerouslySetInnerHTML={{ __html: product.usage || "" }} />
          )}
          {activeTab === "Report" && (
            <div dangerouslySetInnerHTML={{ __html: product.report || "" }} />
          )}
          {activeTab === "Brochure" && product.brochure && (
            <iframe
              src={product.brochure}
              title="Brochure"
              className="w-full h-[60vh] border rounded"
            />
          )}
          {activeTab === "Feedback" && (
            <div dangerouslySetInnerHTML={{ __html: product.feedback || "" }} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleProductCard;
