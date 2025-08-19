import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LANGUAGES = ["en", "ar", "es", "fr", "ko"]; // English, Arabic, Spanish, French, Korean

const Blogs = () => {
  const [forms, setForms] = useState([
    { image: null, headings: [{ en: "" }], paragraphs: [{ en: "" }] },
  ]);

  // Initialize language fields dynamically
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

  const addNewForm = () => {
    setForms([
      ...forms,
      { image: null, headings: [initializeLangFields()], paragraphs: [initializeLangFields()] },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(forms);
    toast.success("Blog submitted successfully 🎉", { position: "top-right" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex justify-center p-6">
      <div className="w-full max-w-3xl bg-white shadow-2xl rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Blog Form</h1>
        <form onSubmit={handleSubmit} className="space-y-8">
          {forms.map((form, formIndex) => (
            <div
              key={formIndex}
              className="border p-6 rounded-xl bg-gray-50 shadow-md space-y-6"
            >
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
                <div key={index} className="space-y-4 border-t pt-4">
                  {LANGUAGES.map((lang) => (
                    <div key={lang} className="mb-2">
                      <label className="block text-sm font-medium">
                        Heading ({lang.toUpperCase()})
                      </label>
                      <input
                        type="text"
                        value={heading[lang]}
                        onChange={(e) =>
                          handleInputChange(formIndex, "headings", index, lang, e.target.value)
                        }
                        className="w-full border rounded-lg p-2"
                        placeholder={`Enter heading in ${lang.toUpperCase()}`}
                      />
                      <label className="block text-sm font-medium mt-2">
                        Paragraph ({lang.toUpperCase()})
                      </label>
                      <textarea
                        rows={3}
                        value={form.paragraphs[index][lang]}
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
            Submit Blog
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Blogs;
