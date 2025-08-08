import React, { useState, useEffect } from "react";
import axios from "../../api/axios";
import { useTranslation } from "react-i18next";

const tabs = [
  "General Info",
  "Composition",
  "Indications",
  "Usage",
  "Report",
  "Brochure",
  "Feedback",
];

const FullProductDetails = ({ segment }) => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("General Info");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/products2/all");
        const filtered = res.data.filter(
          (product) =>
            product?.generalInfo?.segment?.toLowerCase() ===
            segment?.toLowerCase()
        );
        setProducts(filtered);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchData();
  }, [segment]);

  const getTranslated = (product, key) =>
    product?.translations?.[currentLang]?.[key] ||
    product?.generalInfo?.[key] ||
    product?.[key.toLowerCase()] ||
    "";

  if (loading) return <p className="p-4">Loading...</p>;
  if (!products.length) return <p className="p-4 text-red-600">No product found.</p>;

  return (
    <div className="p-4 bg-white rounded shadow space-y-4">
      {products.map((product) => {
        const name = getTranslated(product, "name");
        const logo = getTranslated(product, "logo");
        const details = getTranslated(product, "details");
        const composition = getTranslated(product, "composition");
        const indications = getTranslated(product, "indications");
        const usage = getTranslated(product, "usage");
        const report = product?.report;
        const brochure = product?.brochure;
        const feedback = product?.feedback;
        const segment = getTranslated(product, "segment");
        const type = getTranslated(product, "type");
        const category = getTranslated(product, "category");
        const packing = getTranslated(product, "packing");

        return (
          <div
            key={product._id}
            className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-4"
          >
            {/* Left: Product Image */}
            <div className="flex justify-center items-start">
              {product.productImage && (
                <img
                  src={product.productImage}
                  alt="Product"
                  className="w-56 object-contain"
                />
              )}
            </div>

            {/* Right: Content */}
            <div className="space-y-2">
              {/* Logo */}
              {logo && (
                <img
                  src={logo}
                  alt="Logo"
                  className="h-10 object-contain mb-2"
                />
              )}

              {/* Tabs */}
              <div className="flex flex-wrap border-b border-gray-200">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 text-sm font-medium rounded-t ${
                      activeTab === tab
                        ? "bg-orange-600 text-white"
                        : "bg-transparent text-gray-700 hover:text-orange-600"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="mt-2 text-gray-800 text-sm max-h-[300px] overflow-y-auto pr-2">
                <h2 className="text-lg font-semibold text-orange-700 mb-1">
                  {name}
                </h2>

                {activeTab === "General Info" && (
                  <>
                    <p className="whitespace-pre-wrap">{details}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 mt-3">
                      <p>
                        <strong>Segment:</strong> {segment}
                      </p>
                      <p>
                        <strong>Type:</strong> {type}
                      </p>
                      <p>
                        <strong>Category:</strong> {category}
                      </p>
                      <p>
                        <strong>Packing:</strong> {packing}
                      </p>
                    </div>
                  </>
                )}

                {activeTab === "Composition" && (
                  <div
                    className="whitespace-pre-wrap"
                    dangerouslySetInnerHTML={{ __html: composition }}
                  />
                )}
                {activeTab === "Indications" && (
                  <div
                    className="whitespace-pre-wrap"
                    dangerouslySetInnerHTML={{ __html: indications }}
                  />
                )}
                {activeTab === "Usage" && (
                  <div
                    className="whitespace-pre-wrap"
                    dangerouslySetInnerHTML={{ __html: usage }}
                  />
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
                        View Report
                      </a>
                    ) : (
                      "No report available."
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
                        View Brochure
                      </a>
                    ) : (
                      "No brochure available."
                    )}
                  </p>
                )}
                {activeTab === "Feedback" && (
                  <p>{feedback || "No feedback available."}</p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FullProductDetails;
