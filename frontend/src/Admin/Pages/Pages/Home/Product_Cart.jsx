import React, { useState } from "react";
import axios from "../../../../../api/axios";

const Product_Cart = () => {
  const [items, setItems] = useState([
    {
      image: null,
      name: "",
      category: "",
      details: "",
      rating: 1,
      preview: "",
      translations: { fr: {}, es: {}, ar: {}, ko: {} },
    },
  ]);
  const [modalImage, setModalImage] = useState(null);

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    const newItems = [...items];
    newItems[index].image = file;
    newItems[index].preview = URL.createObjectURL(file);
    setItems(newItems);
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const newItems = [...items];
    newItems[index][name] = name === "rating" ? parseInt(value, 10) : value;
    setItems(newItems);
  };

  const handleTranslationChange = (e, index, lang) => {
    const { name, value } = e.target;
    const newItems = [...items];
    newItems[index].translations[lang][name] = value;
    setItems(newItems);
  };

  const handleAddMore = () => {
    if (items.length >= 5) {
      alert("❌ Maximum 5 products allowed per submission");
      return;
    }
    setItems([
      ...items,
      {
        image: null,
        name: "",
        category: "",
        details: "",
        rating: 1,
        preview: "",
        translations: { fr: {}, es: {}, ar: {}, ko: {} },
      },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      for (const item of items) {
        const formData = new FormData();
        formData.append("name", item.name);
        formData.append("category", item.category);
        formData.append("details", item.details);
        formData.append("rating", item.rating);
        formData.append("translations", JSON.stringify(item.translations));
        if (item.image) formData.append("image", item.image);

        const { data } = await axios.post("/products/add", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        console.log("✅ Saved:", data);
      }

      alert("✅ All products saved successfully!");
      setItems([
        {
          image: null,
          name: "",
          category: "",
          details: "",
          rating: 1,
          preview: "",
          translations: { fr: {}, es: {}, ar: {}, ko: {} },
        },
      ]);
    } catch (err) {
      console.error("❌ Error saving products:", err);
      alert("❌ Failed to save products. Check console for details.");
    }
  };

  return (
    <div className="p-4 max-w-5xl mx-auto text-sm">
      <h2 className="text-xl font-bold mb-3 text-center text-green-700 uppercase">
        Add Product Info
      </h2>

      <form onSubmit={handleSubmit}>
        {items.map((item, index) => (
          <div key={index} className="border rounded-md p-3 mb-5 bg-white shadow">
            <h3 className="font-semibold mb-3 text-base text-blue-600">
              📦 Product {index + 1}
            </h3>

            <div className="flex flex-wrap gap-4 mb-3">
              <div>
                {item.preview && (
                  <img
                    src={item.preview}
                    alt="Preview"
                    onClick={() => setModalImage(item.preview)}
                    className="w-20 h-20 object-cover rounded border cursor-pointer hover:scale-105 transition"
                  />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, index)}
                  className="mt-1 text-xs"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                type="text"
                name="name"
                value={item.name}
                onChange={(e) => handleChange(e, index)}
                placeholder="Product Name (English)"
                className="border p-1.5 rounded w-full"
                required
              />

              {/* Category Dropdown */}
              <select
                name="category"
                value={item.category}
                onChange={(e) => handleChange(e, index)}
                className="border p-1.5 rounded w-full"
                required
              >
                <option value="Health Supplements">Health Supplements</option>
                <option value="Veterinary">Veterinary</option>
                <option value="Agriculture">Agriculture</option>
              </select>

              <textarea
                name="details"
                value={item.details}
                onChange={(e) => handleChange(e, index)}
                placeholder="Details (English)"
                className="border p-1.5 rounded w-full md:col-span-2"
                rows="3"
                required
              />
              <select
                name="rating"
                value={item.rating}
                onChange={(e) => handleChange(e, index)}
                className="border p-1.5 rounded w-full"
                required
              >
                <option value="" disabled>
                  Select Rating (1 to 5)
                </option>
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>

            {/* Translations */}
            <div className="mt-4 grid grid-cols-1 gap-4">
              {["fr", "es", "ar", "ko"].map((lang) => (
                <div key={lang}>
                  <h4 className="text-gray-700 font-medium mb-1">
                    {lang.toUpperCase()} Translation
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <input
                      type="text"
                      name="name"
                      value={item.translations[lang]?.name || ""}
                      onChange={(e) => handleTranslationChange(e, index, lang)}
                      placeholder={`Name (${lang.toUpperCase()})`}
                      className="border p-1.5 rounded w-full"
                    />
                    <input
                      type="text"
                      name="category"
                      value={item.translations[lang]?.category || ""}
                      onChange={(e) => handleTranslationChange(e, index, lang)}
                      placeholder={`Category (${lang.toUpperCase()})`}
                      className="border p-1.5 rounded w-full"
                    />
                    <textarea
                      name="details"
                      value={item.translations[lang]?.details || ""}
                      onChange={(e) => handleTranslationChange(e, index, lang)}
                      placeholder={`Details (${lang.toUpperCase()})`}
                      className="border p-1.5 rounded w-full md:col-span-2"
                      rows="2"
                    />
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

      {/* Image Preview Modal */}
      {modalImage && (
        <div
          onClick={() => setModalImage(null)}
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
        >
          <img
            src={modalImage}
            alt="Full Preview"
            className="max-w-3xl max-h-[80vh] rounded-lg shadow-2xl"
          />
        </div>
      )}
    </div>
  );
};

export default Product_Cart;
