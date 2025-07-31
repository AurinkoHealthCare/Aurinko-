// import React, { useState } from "react";
// import axios from "../../../../../api/axios"; // ✅ custom axios instance

// const Block1 = () => {
//   const [items, setItems] = useState([
//     { image: null, name: "", category: "", details: "", rating: 1, preview: "" },
//   ]);
//   const [modalImage, setModalImage] = useState(null); // ✅ for image preview modal

//   // handle image upload
//   const handleImageChange = (e, index) => {
//     const file = e.target.files[0];
//     const newItems = [...items];
//     newItems[index].image = file;
//     newItems[index].preview = URL.createObjectURL(file);
//     setItems(newItems);
//   };

//   // handle input changes
//   const handleChange = (e, index) => {
//     const { name, value } = e.target;
//     const newItems = [...items];
//     newItems[index][name] = name === "rating" ? parseInt(value, 10) : value;
//     setItems(newItems);
//   };

//   // add more product fields
//   const handleAddMore = () => {
//     if (items.length >= 5) {
//       alert("❌ Maximum 5 products allowed per submission");
//       return;
//     }
//     setItems([
//       ...items,
//       { image: null, name: "", category: "", details: "", rating: 1, preview: "" },
//     ]);
//   };

//   // submit form
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       for (const item of items) {
//         const formData = new FormData();
//         formData.append("name", item.name);
//         formData.append("category", item.category);
//         formData.append("details", item.details);
//         formData.append("rating", item.rating);
//         if (item.image) formData.append("image", item.image);

//         const { data } = await axios.post("/products/add", formData, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });

//         console.log("✅ Saved:", data);
//       }

//       alert("✅ All products saved successfully!");
//       setItems([{ image: null, name: "", category: "", details: "", rating: 1, preview: "" }]);
//     } catch (err) {
//       console.error("❌ Error saving products:", err);
//       alert("❌ Failed to save products. Check console for details.");
//     }
//   };

//   return (
//     <div className="p-6 max-w-4xl mx-auto pt-0">
//       <h2 className="text-2xl font-bold mb-4 text-center text-green-800">
//         For All Products Adding
//       </h2>
//       <form onSubmit={handleSubmit}>
//         {items.map((item, index) => (
//           <div
//             key={index}
//             className="border rounded-lg p-4 mb-6 shadow-md bg-white"
//           >
//             <h3 className="font-semibold mb-2 text-lg text-gray-800">
//               Product {index + 1}
//             </h3>

//             {item.preview && (
//               <img
//                 src={item.preview}
//                 alt="Preview"
//                 onClick={() => setModalImage(item.preview)} // ✅ open modal
//                 className="w-32 h-32 object-cover mb-2 rounded border cursor-pointer hover:scale-105 transition"
//               />
//             )}

//             <input
//               type="file"
//               accept="image/*"
//               onChange={(e) => handleImageChange(e, index)}
//               className="mb-2"
//               required
//             />

//             <input
//               type="text"
//               name="name"
//               value={item.name}
//               onChange={(e) => handleChange(e, index)}
//               placeholder="Product Name"
//               className="w-full border p-2 rounded mb-2"
//               required
//             />

//             <input
//               type="text"
//               name="category"
//               value={item.category}
//               onChange={(e) => handleChange(e, index)}
//               placeholder="Category"
//               className="w-full border p-2 rounded mb-2"
//               required
//             />

//             <textarea
//               name="details"
//               value={item.details}
//               onChange={(e) => handleChange(e, index)}
//               placeholder="Product Details"
//               className="w-full border p-2 rounded mb-2"
//               rows="3"
//               required
//             />

//            <select
//   name="rating"
//   value={item.rating}
//   onChange={(e) => handleChange(e, index)}
//   className="w-full border p-2 rounded mb-2"
//   required
// >
//   <option value="" disabled>Select Rating (1 to 5)</option>
//   {[1, 2, 3, 4, 5].map((num) => (
//     <option key={num} value={num}>{num}</option>
//   ))}
// </select>
//           </div>
//         ))}

//         <div className="flex justify-between items-center">
//           <button
//             type="button"
//             onClick={handleAddMore}
//             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//           >
//             ➕ Add More
//           </button>

//           <button
//             type="submit"
//             className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//           >
//             ✅ Save
//           </button>
//         </div>
//       </form>

//       {/* ✅ Image Preview Modal */}
//       {modalImage && (
//         <div
//           onClick={() => setModalImage(null)}
//           className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
//         >
//           <img
//             src={modalImage}
//             alt="Full Preview"
//             className="max-w-3xl max-h-[80vh] rounded-lg shadow-2xl"
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Block1;


import React, { useState } from "react";
import axios from "../../../../../api/axios"; // ✅ custom axios instance

const Block1 = () => {
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

  // handle image upload
  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    const newItems = [...items];
    newItems[index].image = file;
    newItems[index].preview = URL.createObjectURL(file);
    setItems(newItems);
  };

  // handle normal input changes
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const newItems = [...items];
    newItems[index][name] = name === "rating" ? parseInt(value, 10) : value;
    setItems(newItems);
  };

  // handle translation changes
  const handleTranslationChange = (e, index, lang) => {
    const { name, value } = e.target;
    const newItems = [...items];
    newItems[index].translations[lang][name] = value;
    setItems(newItems);
  };

  // add more product fields
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

  // submit form
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
    <div className="p-6 max-w-4xl mx-auto pt-0">
      <h2 className="text-2xl font-bold mb-4 text-center text-green-800">
        For All Products Adding
      </h2>
      <form onSubmit={handleSubmit}>
        {items.map((item, index) => (
          <div key={index} className="border rounded-lg p-4 mb-6 shadow-md bg-white">
            <h3 className="font-semibold mb-2 text-lg text-gray-800">
              Product {index + 1}
            </h3>

            {item.preview && (
              <img
                src={item.preview}
                alt="Preview"
                onClick={() => setModalImage(item.preview)}
                className="w-32 h-32 object-cover mb-2 rounded border cursor-pointer hover:scale-105 transition"
              />
            )}

            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, index)}
              className="mb-2"
              required
            />

            <input
              type="text"
              name="name"
              value={item.name}
              onChange={(e) => handleChange(e, index)}
              placeholder="Product Name (English)"
              className="w-full border p-2 rounded mb-2"
              required
            />

            <input
              type="text"
              name="category"
              value={item.category}
              onChange={(e) => handleChange(e, index)}
              placeholder="Category (English)"
              className="w-full border p-2 rounded mb-2"
              required
            />

            <textarea
              name="details"
              value={item.details}
              onChange={(e) => handleChange(e, index)}
              placeholder="Product Details (English)"
              className="w-full border p-2 rounded mb-2"
              rows="3"
              required
            />

            <select
              name="rating"
              value={item.rating}
              onChange={(e) => handleChange(e, index)}
              className="w-full border p-2 rounded mb-2"
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

            {/* Multi-language inputs */}
            {["fr", "es", "ar", "ko"].map((lang) => (
              <div key={lang} className="mt-4">
                <h4 className="font-medium capitalize">{lang.toUpperCase()} Translation</h4>
                <input
                  type="text"
                  name="name"
                  value={item.translations[lang]?.name || ""}
                  onChange={(e) => handleTranslationChange(e, index, lang)}
                  placeholder={`Name (${lang.toUpperCase()})`}
                  className="w-full border p-2 rounded mb-2"
                />
                <input
                  type="text"
                  name="category"
                  value={item.translations[lang]?.category || ""}
                  onChange={(e) => handleTranslationChange(e, index, lang)}
                  placeholder={`Category (${lang.toUpperCase()})`}
                  className="w-full border p-2 rounded mb-2"
                />
                <textarea
                  name="details"
                  value={item.translations[lang]?.details || ""}
                  onChange={(e) => handleTranslationChange(e, index, lang)}
                  placeholder={`Details (${lang.toUpperCase()})`}
                  className="w-full border p-2 rounded mb-2"
                  rows="2"
                />
              </div>
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

export default Block1;
