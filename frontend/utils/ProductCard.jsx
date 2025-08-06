import React, { useState } from "react";

const tabs = [
  "General Info",
  "Composition",
  "Indications",
  "Usage",
  "Report",
  "Brochure",
  "Feedback",
];

const ProductCard = ({ product }) => {
  const [activeTab, setActiveTab] = useState("General Info");

  return (
    <div className="flex flex-col md:flex-row w-full max-w-full max-h-full bg-white border overflow-hidden">
      <div className="md:w-1/3 h-full w-full p-2 flex justify-center ">
        <img
          src={product.Productimg}
          alt="Product Image"
          className="h-64 w-64 md:h-80 md:w-80 object-cover rounded-lg"
        />
      </div>
      <div className="md:w-2/3 w-full p-3 flex flex-col border">
        <img
          src={product.Productname}
          alt="Product Thumbnail"
          className="h-16 w-64 md:h-20 md:w-72 rounded-lg mb-2 object-contain"
        />
        <div className="flex flex-wrap border-b pb-2">
          {tabs.map((label) => (
            <button
              key={label}
              className={`px-3 py-1 text-sm md:text-lg transition duration-300 ${activeTab === label
                ? "bg-green-800 text-orange-500 border-l-4 border-orange-500"
                : "bg-green-700 text-white hover:bg-green-600"
                }`}
              onClick={() => setActiveTab(label)}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="mt-3 text-base text-gray-700 overflow-y-auto max-h-[60vh]">
          {activeTab === "General Info" && (
            <>
              <h1 className="text-lg font-semibold">{product.name}</h1>
              <p>{product.description}</p>
              <h2 className="mt-2 font-semibold">Segment: <span className="font-normal">{product.segment}</span></h2>
              <h2 className="font-semibold">Type: <span className="font-normal">{product.type}</span></h2>
              <h2 className="font-semibold">Category: <span className="font-normal">{product.category}</span></h2>
              <h2 className="font-semibold">Packaging: <span className="font-normal">{product.packaging}</span></h2>
            </>
          )}
          {activeTab === "Composition" && (
            <ul className="pl-5">
              {product.composition.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
          {activeTab === "Indications" && (
            <ul className="pl-5">
              {product.indications.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
          {activeTab === "Usage" && (
            <ul className="pl-5">
              {product.usage.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
          {activeTab === "Report" && <p>{product.report}</p>}
          {activeTab === "Brochure" && product.brochure && (
            <iframe
              src={product.brochure}
              title="Brochure"
              className="w-full h-[500px] border"
            />
          )}
          {activeTab === "Feedback" && <p>{product.feedback}</p>}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
