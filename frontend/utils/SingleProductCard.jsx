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
  "Human": {
    active: "bg-red-800 text-white border-l-4 border-red-400",
    inactive: "bg-red-700 text-white hover:bg-red-600",
  },
  Veterinary: {
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

// Helper to get translated product field
const getTranslated = (product, lang, key) =>
  product?.translations?.[lang]?.[key] ||
  product?.generalInfo?.[key] ||
  product?.[key.toLowerCase()] ||
  "";

const SingleProductCard = ({ product, theme }) => {
  const [activeTab, setActiveTab] = useState("General Info");
  const { t, i18n } = useTranslation("productcart");
  const currentLang = i18n.language;

  const tabs = rawTabs.map((key) => ({ key, label: t(key) }));

  // Translated product fields
  const name = getTranslated(product, currentLang, "name");
  const details = getTranslated(product, currentLang, "details");
  const composition = getTranslated(product, currentLang, "composition");
  const indications = getTranslated(product, currentLang, "indications");
  const usage = getTranslated(product, currentLang, "usage");
  const report = product?.report;
  const brochure = product?.brochure;
  const feedback = product?.feedback;
  const segment = getTranslated(product, currentLang, "segment");
  const type = getTranslated(product, currentLang, "type");
  const category = getTranslated(product, currentLang, "category");
  const packing = getTranslated(product, currentLang, "packing");

  return (
    <div className="flex flex-col md:flex-row w-full max-w-full bg-white border border-neutral-300 overflow-hidden rounded shadow-md">
      {/* Product Image */}
      <div className="md:w-1/3 w-full p-3 flex justify-center">
        {product.productImage && (
          <img
            src={product.productImage}
            alt="Product"
            className="h-64 w-64 md:h-80 md:w-80 object-cover rounded-lg"
          />
        )}
      </div>

      {/* Product Content */}
      <div className="md:w-2/3 w-full p-4 flex flex-col border-l border-neutral-300">
        {/* Logo */}
        {product.productLogo && (
          <img
            src={product.productLogo}
            alt="Product Logo"
            className="h-16 w-64 md:h-20 md:w-72 rounded-lg mb-3 object-contain"
          />
        )}

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
              <h1 className="text-lg font-semibold">{name}</h1>
              <p className="mt-2">{details}</p>
              <p className="mt-2">
                <strong>{t("Segment")}:</strong> {segment}
              </p>
              <p>
                <strong>{t("Type")}:</strong> {type}
              </p>
              <p>
                <strong>{t("Category")}:</strong> {category}
              </p>
              <p>
                <strong>{t("Packing")}:</strong> {packing}
              </p>
            </>
          )}
          {activeTab === "Composition" && (
            <div dangerouslySetInnerHTML={{ __html: composition || "" }} />
          )}
          {activeTab === "Indications" && (
            <div dangerouslySetInnerHTML={{ __html: indications || "" }} />
          )}
          {activeTab === "Usage" && (
            <div dangerouslySetInnerHTML={{ __html: usage || "" }} />
          )}
          {activeTab === "Report" && (
            <p>
              {report ? (
                <a
                  href={report}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline"
                >
                  {t("View Report")}
                </a>
              ) : (
                t("No report available.")
              )}
            </p>
          )}
          {activeTab === "Brochure" && (
            <p>
              {brochure ? (
                <a
                  href={brochure}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline"
                >
                  {t("View Brochure")}
                </a>
              ) : (
                t("No brochure available.")
              )}
            </p>
          )}
          {activeTab === "Feedback" && (
            <p>{feedback || t("No feedback available.")}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleProductCard;
