import React, { useState } from "react";
import axios from "../../../../../api/axios";

const Product_List = () => {
  const [items, setItems] = useState([
    {
      productImage: null,
      productLogo: null,
      name: "",
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
      previewImage: "",
      previewLogo: ""
    }
  ]);

  const handleFileChange = (e, index, field) => {
    const file = e.target.files[0];
    const newItems = [...items];
    newItems[index][field] = file;
    newItems[index][`preview${field.charAt(0).toUpperCase() + field.slice(1)}`] =
      file ? URL.createObjectURL(file) : "";
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
        formData.append("segment", item.segment);
        formData.append("type", item.type);
        formData.append("category", item.category);
        formData.append("packing", item.packing);
        formData.append("composition", item.composition);
        formData.append("indications", item.indications);
        formData.append("usage", item.usage);
        formData.append("report", item.report);
        formData.append("brochure", item.brochure);
        formData.append("feedback", item.feedback);
        formData.append("translations", JSON.stringify(item.translations));

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
    <div className="p-4 max-w-5xl mx-auto text-sm">
      <h2 className="text-xl font-bold mb-3 text-center text-green-700 uppercase">
        Global Provider of Animal Feed Supplements
      </h2>

      <form onSubmit={handleSubmit}>
        {items.map((item, idx) => (
          <div key={idx} className="border rounded-md p-3 mb-5 bg-white shadow">
            <h3 className="font-semibold mb-3 text-base text-blue-600">📦 Product {idx + 1}</h3>

            <div className="flex flex-wrap gap-4 mb-3">
              <div>
                {item.previewImage && (
                  <img src={item.previewImage} alt="Preview" className="w-20 h-20 object-cover rounded border" />
                )}
                <label className="text-sm font-medium capitalize">Product Image </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, idx, "productImage")}
                  required
                  className="mt-1 text-xs border border-gray-300 rounded p-2"
                />
              </div>
              <div>
                {item.previewLogo && (
                  <img src={item.previewLogo} alt="Logo Preview" className="w-20 h-20 object-contain rounded border" />
                )}
                <label className="text-sm font-medium capitalize">Product Logo </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, idx, "productLogo")}
                  required
                  className="mt-1 text-xs border border-gray-300 rounded p-2"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                "name", "segment", "type", "category", "packing", "composition",
                "indications", "usage", "report", "brochure", "feedback"
              ].map((field) => (
                <div key={field}>
                  <label className="text-sm font-medium capitalize">{field}</label>
                  <input
                    key={field}
                    type="text"
                    name={field}
                    value={item[field]}
                    onChange={(e) => handleChange(e, idx)}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    required={!["report", "brochure", "feedback"].includes(field)}
                    className="border p-1.5 rounded w-full"
                  />
                </div>
              ))}
            </div>

            {/* Translations */}
            <div className="mt-4">
              {["fr", "es", "ar", "ko"].map((langKey) => (
                <div key={langKey} className="mb-3">
                  <h4 className="text-gray-600 font-medium mb-1">{langKey.toUpperCase()} Translation</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {[
                      "name", "segment", "type", "category", "packing",
                      "composition", "indications", "usage"
                    ].map((field) => (
                      <div key={field}>
                        <label className="text-sm font-medium capitalize">{field}</label>
                        <input
                          key={field}
                          type="text"
                          name={field}
                          value={item.translations[langKey][field] || ""}
                          onChange={(e) => handleTranslationChange(e, idx, langKey)}
                          placeholder={`${field.charAt(0).toUpperCase() + field.slice(1)} (${langKey.toUpperCase()})`}
                          className="border p-1.5 rounded w-full"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={handleAddMore}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm"
          >
            ➕ Add More
          </button>
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm"
          >
            ✅ Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default Product_List;
