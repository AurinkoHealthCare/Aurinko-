import React, { useState } from "react";
import axios from "../../../../../api/axios";

const Product_List = () => {
  const [items, setItems] = useState([
    {
      productImage: null,
      productLogo: null,
      name: "",
      details: "",
      segment: "",
      type: "",
      category: "",
      packing: "",
      composition: "",
      indications: "",
      usage: "",
      report: "",
      brochure: "",
      feedback: "",
      translations: { fr: {}, es: {}, ar: {}, ko: {} },
      reportType: "text",
      brochureType: "text",
      previewImage: "",
      previewLogo: ""
    }
  ]);

  const [activeLang, setActiveLang] = useState({});

  const handleFileChange = (e, index, field) => {
    const file = e.target.files[0];
    const newItems = [...items];
    newItems[index][field] = file;
    newItems[index][`preview${field.charAt(0).toUpperCase() + field.slice(1)}`] =
      file && field.includes("product") ? URL.createObjectURL(file) : "";
    setItems(newItems);
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const newItems = [...items];
    newItems[index][name] = value;
    setItems(newItems);
  };

  const handleTranslationChange = (e, index, langKey) => {
    const { name, value } = e.target;
    const newItems = [...items];
    if (!newItems[index].translations[langKey]) {
      newItems[index].translations[langKey] = {};
    }
    newItems[index].translations[langKey][name] = value;
    setItems(newItems);
  };

  const handleAddMore = () => {
    if (items.length >= 5) {
      alert("❌ Maximum 5 items allowed");
      return;
    }
    setItems([
      ...items,
      {
        productImage: null,
        productLogo: null,
        name: "",
        details: "",
        segment: "",
        type: "",
        category: "",
        packing: "",
        composition: "",
        indications: "",
        usage: "",
        report: "",
        brochure: "",
        feedback: "",
        translations: { fr: {}, es: {}, ar: {}, ko: {} },
        reportType: "text",
        brochureType: "text",
        previewImage: "",
        previewLogo: ""
      }
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      for (const item of items) {
        const formData = new FormData();
        if (item.productImage) formData.append("productImage", item.productImage);
        if (item.productLogo) formData.append("productLogo", item.productLogo);

        formData.append("name", item.name);
        formData.append("details", item.details);
        formData.append("segment", item.segment);
        formData.append("type", item.type);
        formData.append("category", item.category);
        formData.append("packing", item.packing);
        formData.append("composition", item.composition);
        formData.append("indications", item.indications);
        formData.append("usage", item.usage);
        formData.append("feedback", item.feedback);
        formData.append("translations", JSON.stringify(item.translations));

        if (item.reportType === "file" && item.report instanceof File) {
          formData.append("report", item.report);
        } else {
          formData.append("report", item.report);
        }

        if (item.brochureType === "file" && item.brochure instanceof File) {
          formData.append("brochure", item.brochure);
        } else {
          formData.append("brochure", item.brochure);
        }

        const res = await axios.post("/products2/add", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        console.log("✅ Added:", res.data);
      }
      alert("✅ All products added successfully!");
      setItems([items[0]]);
    } catch (err) {
      console.error("❌ Error:", err);
      alert("❌ Error adding products: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto font-sans text-sm text-gray-800">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-700 uppercase tracking-wide">
        🌍 Global Provider of Animal Feed Supplements
      </h2>

      <form onSubmit={handleSubmit}>
        {items.map((item, idx) => (
          <div key={idx} className="border border-gray-200 rounded-lg p-5 mb-8 bg-white shadow-md">
            <h3 className="font-semibold text-lg text-blue-700 mb-5">📦 Product {idx + 1}</h3>

            <div className="flex flex-wrap gap-6 mb-6">
              <div className="flex flex-col items-center">
                {item.previewImage && (
                  <img src={item.previewImage} alt="Preview" className="w-24 h-24 object-cover rounded border mb-2" />
                )}
                <label className="text-sm font-semibold">Product Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, idx, "productImage")}
                  required
                  className="mt-1 text-xs border border-gray-300 rounded px-3 py-2 w-52"
                />
              </div>
              <div className="flex flex-col items-center">
                {item.previewLogo && (
                  <img src={item.previewLogo} alt="Logo Preview" className="w-24 h-24 object-contain rounded border mb-2" />
                )}
                <label className="text-sm font-semibold">Product Logo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, idx, "productLogo")}
                  required
                  className="mt-1 text-xs border border-gray-300 rounded px-3 py-2 w-52"
                />
              </div>
            </div>

            {/* Product Fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {["name", "segment", "type", "category", "packing", "feedback", "details", "composition", "indications", "usage"].map((field) => (
                <div key={field}>
                  <label className="text-sm font-semibold capitalize">{field}</label>
                  {["composition", "usage", "details", "indications"].includes(field) ? (
                    <textarea
                      name={field}
                      value={item[field]}
                      onChange={(e) => handleChange(e, idx)}
                      placeholder={`Enter ${field}`}
                      rows={3}
                      className="border p-2 rounded w-full resize-y focus:ring-2 focus:ring-blue-300"
                      required
                    />
                  ) : (
                    <input
                      type="text"
                      name={field}
                      value={item[field]}
                      onChange={(e) => handleChange(e, idx)}
                      placeholder={`Enter ${field}`}
                      className="border p-2 rounded w-full focus:ring-2 focus:ring-blue-300"
                      required
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Report and Brochure */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {["report", "brochure"].map((typeKey) => (
                <div key={typeKey}>
                  <label className="text-sm font-semibold capitalize">{typeKey}</label>
                  <select
                    value={item[`${typeKey}Type`]}
                    onChange={(e) => {
                      const newItems = [...items];
                      newItems[idx][`${typeKey}Type`] = e.target.value;
                      newItems[idx][typeKey] = "";
                      setItems(newItems);
                    }}
                    className="border p-2 rounded w-full mb-2"
                  >
                    <option value="text">Text</option>
                    <option value="file">PDF File</option>
                  </select>
                  {item[`${typeKey}Type`] === "text" ? (
                    <input
                      type="text"
                      name={typeKey}
                      value={item[typeKey]}
                      onChange={(e) => handleChange(e, idx)}
                      className="border p-2 rounded w-full"
                      placeholder={`Enter ${typeKey}`}
                    />
                  ) : (
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => handleFileChange(e, idx, typeKey)}
                      className="border p-2 rounded w-full"
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Language Translations */}
            <div className="mt-6">
              <p className="mb-2 text-sm font-semibold">🌐 Add Translations:</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {["fr", "es", "ar", "ko"].map((langKey) => (
                  <button
                    key={langKey}
                    type="button"
                    onClick={() =>
                      setActiveLang((prev) => ({
                        ...prev,
                        [idx]: prev[idx] === langKey ? null : langKey,
                      }))
                    }
                    className={`px-3 py-1 rounded text-sm font-semibold border ${activeLang[idx] === langKey
                      ? "bg-green-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                  >
                    {langKey.toUpperCase()}
                  </button>
                ))}
              </div>

              {["fr", "es", "ar", "ko"].map(
                (langKey) =>
                  activeLang[idx] === langKey && (
                    <div key={langKey} className="mb-5 p-4 border rounded-md bg-gray-50 shadow-inner">
                      <h4 className="font-semibold text-gray-700 mb-3">
                        {langKey.toUpperCase()} Translation Fields
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {["name", "segment", "type", "category", "packing", "details", "composition", "indications", "usage"].map((field) => (
                          <div key={field}>
                            <label className="text-sm font-medium capitalize">{field}</label>
                            {["composition", "usage", "details", "indications"].includes(field) ? (
                              <textarea
                                name={field}
                                value={item.translations[langKey][field] || ""}
                                onChange={(e) => handleTranslationChange(e, idx, langKey)}
                                placeholder={`${field.charAt(0).toUpperCase() + field.slice(1)} (${langKey.toUpperCase()})`}
                                rows={3}
                                className="border p-2 rounded w-full resize-y focus:ring-2 focus:ring-blue-300"
                              />
                            ) : (
                              <input
                                type="text"
                                name={field}
                                value={item.translations[langKey][field] || ""}
                                onChange={(e) => handleTranslationChange(e, idx, langKey)}
                                placeholder={`${field.charAt(0).toUpperCase() + field.slice(1)} (${langKey.toUpperCase()})`}
                                className="border p-2 rounded w-full focus:ring-2 focus:ring-blue-300"
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )
              )}
            </div>
          </div>
        ))}

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={handleAddMore}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded shadow transition duration-200"
          >
            ➕ Add Product
          </button>
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded shadow transition duration-200"
          >
            ✅ Submit All
          </button>
        </div>
      </form>
    </div>

  );
};

export default Product_List;
