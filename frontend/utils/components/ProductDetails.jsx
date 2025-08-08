import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";

const tabs = [
  "General Info",
  "Composition",
  "Indications",
  "Usage",
  "Report",
  "Brochure",
  "Feedback",
];

const getTabColorClasses = (category, isActive) => {
  const categoryKey = category?.toLowerCase();

  const colorThemes = {
    "Health Supplement": {
      active: "bg-red-800 text-red-400 border-l-4 border-red-400",
      inactive: "bg-red-700 text-white hover:bg-red-600",
    },
     "Personal care": {
      active: "bg-red-800 text-red-400 border-l-4 border-red-400",
      inactive: "bg-red-700 text-white hover:bg-red-600",
    },
    livestock: {
      active: "bg-blue-800 text-blue-400 border-l-4 border-blue-400",
      inactive: "bg-blue-700 text-white hover:bg-blue-600",
    },
    agriculture: {
      active: "bg-green-800 text-green-400 border-l-4 border-green-400",
      inactive: "bg-green-700 text-white hover:bg-green-600",
    },
    default: {
      active: "bg-gray-800 text-gray-300 border-l-4 border-gray-400",
      inactive: "bg-gray-700 text-white hover:bg-gray-600",
    },
  };

  const theme = colorThemes[categoryKey] || colorThemes.default;
  return isActive ? theme.active : theme.inactive;
};

const ProductDetails = ({ products }) => {
  const { id } = useParams();
  const product = products.find((p) => p._id === id);
  const [activeTab, setActiveTab] = useState("General Info");

  if (!product) {
    return (
      <div className="text-center text-red-500 mt-10">Product not found</div>
    );
  }

  const productCategory = product.generalInfo?.category;

  return (
    <div className="p-4">
      <Link to="/" className="text-blue-600 underline mb-4 inline-block">
        ← Back to Products
      </Link>

      <div className="flex flex-col md:flex-row w-full max-w-full max-h-full bg-white border border-neutral-300 overflow-hidden">
        {/* Image */}
        <div className="md:w-1/3 h-full w-full p-2 flex justify-center">
          <img
            src={product.productImage}
            alt="Product"
            className="h-64 w-64 md:h-80 md:w-80 object-cover rounded-lg"
          />
        </div>

        {/* Content */}
        <div className="md:w-2/3 w-full p-3 flex flex-col border border-neutral-300">
          <img
            src={product.productLogo}
            alt="Product Logo"
            className="h-16 w-64 md:h-20 md:w-72 rounded-lg mb-2 object-contain"
          />

          {/* Tabs */}
          <div className="flex flex-wrap border-b border-neutral-300 pb-2">
            {tabs.map((label) => (
              <button
                key={label}
                className={`px-3 py-1 text-sm md:text-lg transition duration-300 ${getTabColorClasses(
                  productCategory,
                  activeTab === label
                )}`}
                onClick={() => setActiveTab(label)}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="mt-3 text-base text-gray-700 overflow-y-auto max-h-[60vh]">
            {activeTab === "General Info" && (
              <>
                <h1 className="text-lg font-semibold">
                  {product.generalInfo?.name}
                </h1>
                <h2 className="mt-2 font-semibold">
                  Segment:{" "}
                  <span className="font-normal">
                    {product.generalInfo?.segment}
                  </span>
                </h2>
                <h2 className="font-semibold">
                  Type:{" "}
                  <span className="font-normal">
                    {product.generalInfo?.type}
                  </span>
                </h2>
                <h2 className="font-semibold">
                  Category:{" "}
                  <span className="font-normal">
                    {product.generalInfo?.category}
                  </span>
                </h2>
                <h2 className="font-semibold">
                  Packing:{" "}
                  <span className="font-normal">
                    {product.generalInfo?.packing}
                  </span>
                </h2>
              </>
            )}
            {activeTab === "Composition" && (
              <div dangerouslySetInnerHTML={{ __html: product.composition }} />
            )}
            {activeTab === "Indications" && (
              <div dangerouslySetInnerHTML={{ __html: product.indications }} />
            )}
            {activeTab === "Usage" && (
              <div dangerouslySetInnerHTML={{ __html: product.usage }} />
            )}
            {activeTab === "Report" && (
              <div dangerouslySetInnerHTML={{ __html: product.report }} />
            )}
            {activeTab === "Brochure" && product.brochure && (
              <iframe
                src={product.brochure}
                title="Brochure"
                className="w-full h-[500px] border"
              />
            )}
            {activeTab === "Feedback" && (
              <div dangerouslySetInnerHTML={{ __html: product.feedback }} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
