import React, { useState } from "react";
import axios from "../../../../../api/axios";

const Block2 = () => {
  const [heading, setHeading] = useState("");
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
      previewImage: "",
      previewLogo: ""
    }
  ]);

  const handleFileChange = (e, index, field) => {
    const file = e.target.files[0];
    const newItems = [...items];
    newItems[index][field] = file;
    newItems[index][`preview${field.charAt(0).toUpperCase() + field.slice(1)}`] =
      URL.createObjectURL(file);
    setItems(newItems);
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const newItems = [...items];
    newItems[index][name] = value;
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

        const res = await axios.post("/products2/add2", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        console.log("Added:", res.data);
      }
      alert("✅ All products added successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Error adding products: " + err.message);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center text-green-800">
        GLOBAL PROVIDER OF ANIMAL FEED SUPPLEMENTS
      </h2>
      <form onSubmit={handleSubmit}>
        {items.map((item, idx) => (
          <div key={idx} className="border rounded p-4 mb-6 shadow-sm">
            <h3 className="font-semibold mb-2">Product {idx + 1}</h3>

            {/* Image Field */}
            {item.previewImage && (
              <img
                src={item.previewImage}
                alt="Preview"
                className="w-32 h-32 object-cover mb-2 rounded border"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, idx, "productImage")}
              required
            />

            {/* Logo Field */}
            {item.previewLogo && (
              <img
                src={item.previewLogo}
                alt="Logo Preview"
                className="w-32 h-32 object-contain mb-2 rounded border"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, idx, "productLogo")}
              required
              className="mb-2"
            />

            {/* General Info Fields */}
            {["name", "segment", "type", "category", "packing", "composition", "indications", "usage", "report", "brochure", "feedback"].map((field) => (
              <input
                key={field}
                type={["feedback", "report", "brochure", "usage", "indications", "composition", "segment", "packing"].includes(field) ? "text" : "text"}
                name={field}
                value={item[field]}
                onChange={(e) => handleChange(e, idx)}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                className="w-full border p-2 rounded mb-2"
                required
              />
            ))}
          </div>
        ))}
        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={handleAddMore}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            ➕ Add More
          </button>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            ✅ Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default Block2;
