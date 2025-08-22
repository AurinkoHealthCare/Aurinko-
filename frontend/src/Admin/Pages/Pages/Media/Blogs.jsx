import React, { useState } from "react";
import axios from "../../../../../api/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LANGUAGES = ["en", "ar", "es", "fr", "ko"];

const Blogs = () => {
  const [forms, setForms] = useState([
    { image: null, category: "", headings: [{ en: "" }], paragraphs: [{ en: "" }] },
  ]);

  const initializeLangFields = () => {
    const obj = {};
    LANGUAGES.forEach((lang) => (obj[lang] = ""));
    return obj;
  };

  const handleImageChange = (e, formIndex) => {
    const file = e.target.files[0];
    const updatedForms = [...forms];
    updatedForms[formIndex].image = file;
    setForms(updatedForms);
  };

  const handleCategoryChange = (e, formIndex) => {
    const updatedForms = [...forms];
    updatedForms[formIndex].category = e.target.value;
    setForms(updatedForms);
  };

  const handleInputChange = (formIndex, type, index, lang, value) => {
    const updatedForms = [...forms];
    updatedForms[formIndex][type][index][lang] = value;
    setForms(updatedForms);
  };

  const addHeadingParagraph = (formIndex) => {
    const updatedForms = [...forms];
    updatedForms[formIndex].headings.push(initializeLangFields());
    updatedForms[formIndex].paragraphs.push(initializeLangFields());
    setForms(updatedForms);
  };

  const removeHeadingParagraph = (formIndex, index) => {
    const updatedForms = [...forms];
    updatedForms[formIndex].headings.splice(index, 1);
    updatedForms[formIndex].paragraphs.splice(index, 1);
    setForms(updatedForms);
  };

  const addNewForm = () => {
    setForms([
      ...forms,
      { image: null, category: "", headings: [initializeLangFields()], paragraphs: [initializeLangFields()] },
    ]);
  };

  const removeForm = (formIndex) => {
    const updatedForms = [...forms];
    updatedForms.splice(formIndex, 1);
    setForms(updatedForms);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      for (let i = 0; i < forms.length; i++) {
        const form = forms[i];
        if (!form.image) {
          toast.error(`Please select an image for blog #${i + 1}`);
          return;
        }

        const formData = new FormData();
        formData.append("image", form.image);
        formData.append("category", form.category || "");
        formData.append("headings", JSON.stringify(form.headings));
        formData.append("paragraphs", JSON.stringify(form.paragraphs));

        await axios.post("/blog/add", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      toast.success("All blogs uploaded successfully!");
      setForms([{ image: null, category: "", headings: [{ en: "" }], paragraphs: [{ en: "" }] }]);
    } catch (err) {
      console.error(err);
      toast.error("Upload failed!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex justify-center p-6">
      <div className="w-full max-w-3xl bg-white shadow-2xl rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Blog Form</h1>
        <form onSubmit={handleSubmit} className="space-y-8">
          {forms.map((form, formIndex) => (
            <div key={formIndex} className="border p-6 rounded-xl bg-gray-50 shadow-md space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="font-semibold text-lg">Blog #{formIndex + 1}</h2>
                {forms.length > 1 && (
                  <button type="button" onClick={() => removeForm(formIndex)} className="text-red-500 hover:underline">
                    Remove Blog
                  </button>
                )}
              </div>

              <div>
                <label className="block font-semibold mb-2 text-gray-700">Category</label>
                <input
                  type="text"
                  value={form.category || ""}
                  onChange={(e) => handleCategoryChange(e, formIndex)}
                  className="w-full border rounded-lg p-2 mb-3"
                  placeholder="Enter blog category"
                />
              </div>

              <div>
                <label className="block font-semibold mb-2 text-gray-700">Upload Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, formIndex)}
                  className="w-full border rounded-lg p-2"
                />
              </div>

              {form.headings.map((heading, index) => (
                <div key={index} className="space-y-4 border-t pt-4 relative">
                  {form.headings.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeHeadingParagraph(formIndex, index)}
                      className="absolute right-0 top-0 text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  )}

                  {LANGUAGES.map((lang) => (
                    <div key={lang} className="mb-2">
                      <label className="block text-sm font-medium">Heading ({lang.toUpperCase()})</label>
                      <input
                        type="text"
                        value={heading[lang] || ""}
                        onChange={(e) =>
                          handleInputChange(formIndex, "headings", index, lang, e.target.value)
                        }
                        className="w-full border rounded-lg p-2"
                        placeholder={`Enter heading in ${lang.toUpperCase()}`}
                      />
                      <label className="block text-sm font-medium mt-2">Paragraph ({lang.toUpperCase()})</label>
                      <textarea
                        rows={3}
                        value={form.paragraphs[index][lang] || ""}
                        onChange={(e) =>
                          handleInputChange(formIndex, "paragraphs", index, lang, e.target.value)
                        }
                        className="w-full border rounded-lg p-2"
                        placeholder={`Enter paragraph in ${lang.toUpperCase()}`}
                      />
                    </div>
                  ))}
                </div>
              ))}

              <button
                type="button"
                onClick={() => addHeadingParagraph(formIndex)}
                className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-600 transition"
              >
                + Add Heading & Paragraph
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addNewForm}
            className="bg-green-500 text-white px-6 py-2 rounded-lg shadow hover:bg-green-600 transition"
          >
            + Add Another Blog
          </button>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg shadow-lg hover:bg-blue-700 transition"
          >
            Submit Blogs
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Blogs;
