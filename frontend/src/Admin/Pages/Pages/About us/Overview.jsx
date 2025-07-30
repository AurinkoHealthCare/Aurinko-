import React, { useState } from "react";

const Overview = () => {
  const [banner, setBanner] = useState(null);
  const [text, setText] = useState("");

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBanner(URL.createObjectURL(file));
    }
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Banner:", banner);
    console.log("Text Paragraphs:", text.split("\n\n"));
    alert("Submitted Successfully!");
  };

  return (
    <div className="min-h-screen p-6 pt-0 flex justify-center items-start">
      <div className="w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">Overview Page</h1>

        {/* Banner Upload */}
        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-700 mb-2">Upload Banner Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleBannerChange}
            className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
          {banner && (
            <div className="mt-4">
              <img
                src={banner}
                alt="Banner Preview"
                className="rounded-xl w-full max-h-60 object-cover"
              />
            </div>
          )}
        </div>

        {/* Paragraph Input */}
        <div className="mb-6">
          <label className="block text-lg font-semibold text-gray-700 mb-2">
            Enter Description (use double enter for new paragraphs)
          </label>
          <textarea
            className="w-full h-48 p-4 border border-gray-300 bg-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Type your paragraphs here..."
            value={text}
            onChange={handleTextChange}
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="text-right">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full transition duration-200"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Overview;
