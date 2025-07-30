import React, { useState } from "react";

const Block3 = () => {
  const [heading, setHeading] = useState("");
  const [images, setImages] = useState([
    { image: null, title: "", description: "" },
  ]);
  const [popup, setPopup] = useState(false);

  const handleImageChange = (e, index) => {
    const updated = [...images];
    updated[index].image = e.target.files[0];
    setImages(updated);
  };

  const handleChange = (index, field, value) => {
    const updated = [...images];
    updated[index][field] = value;
    setImages(updated);
  };

  const addImageBlock = () => {
    if (images.length < 5) {
      setImages([...images, { image: null, title: "", description: "" }]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Heading:", heading);
    console.log("Image Blocks:", images);
    setPopup(true);
    setTimeout(() => setPopup(false), 3000);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Block 3 - Aurinko Healthcare</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Main Heading"
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        {images.map((item, index) => (
          <div
            key={index}
            className="border p-4 rounded-md shadow-md bg-gray-50 space-y-2"
          >
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, index)}
              className="w-full"
              required
            />
            <input
              type="text"
              placeholder="Heading for this image"
              value={item.title}
              onChange={(e) => handleChange(index, "title", e.target.value)}
              className="w-full border p-2 rounded"
              required
            />
            <textarea
              placeholder="Paragraph for this image"
              value={item.description}
              onChange={(e) =>
                handleChange(index, "description", e.target.value)
              }
              className="w-full border p-2 rounded"
              required
            />
          </div>
        ))}

        {images.length < 5 && (
          <button
            type="button"
            onClick={addImageBlock}
            className="bg-blue-600 text-white mx-1 px-4 py-2 rounded hover:bg-blue-700"
          >
            Add More
          </button>
        )}

        <button
          type="submit"
          className="bg-green-600 text-white mx-1 px-6 py-2 rounded hover:bg-green-700"
        >
          Submit
        </button>
      </form>

      {popup && (
        <div className="fixed bottom-6 right-6 bg-green-500 text-white px-4 py-2 rounded shadow-lg transition-all duration-300">
          Data saved successfully!
        </div>
      )}
    </div>
  );
};

export default Block3;
