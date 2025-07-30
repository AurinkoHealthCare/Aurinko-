import React, { useState } from 'react';
import axios from '../../../../../api/axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ImageSlider = () => {
  const [images, setImages] = useState(Array(5).fill(null));
  const [previews, setPreviews] = useState(Array(5).fill(null));
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const newImages = [...images];
      const newPreviews = [...previews];
      newImages[index] = file;
      newPreviews[index] = URL.createObjectURL(file);
      setImages(newImages);
      setPreviews(newPreviews);
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    images.forEach((image) => {
      if (image) formData.append('images', image);
    });

    setLoading(true);
    try {
      const res = await axios.post('/images/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setImages(Array(5).fill(null));
      setPreviews(Array(5).fill(null));
      toast.success('🎉 Images uploaded successfully!');
    } catch (err) {
      toast.error('❌ Error uploading images!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f6f8] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl backdrop-blur-lg bg-white/10 border border-white/30 text-white p-10 m-4 rounded-3xl shadow-2xl">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">Upload Slider Images</h2>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {images.map((_, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              <label
                htmlFor={`image-input-${index}`}
                className="w-full h-48 rounded-xl bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-blue-400 transition-all overflow-hidden"
              >
                {previews[index] ? (
                  <img
                    src={previews[index]}
                    alt={`Preview ${index + 1}`}
                    className="h-full w-full object-contain p-2"
                  />
                ) : (
                  <span className="text-gray-400">Preview {index + 1}</span>
                )}
              </label>
              <input
                id={`image-input-${index}`}
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, index)}
                className="hidden"
              />
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={handleSubmit}
            className={`${
              loading
                ? 'bg-blue-400 cursor-not-allowed animate-pulse'
                : 'bg-blue-600 hover:bg-blue-700'
            } text-white text-lg font-semibold px-8 py-3 rounded-full shadow-md transition-all duration-300`}
            disabled={loading}
          >
            {loading ? 'Uploading...' : 'Submit'}
          </button>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
};

export default ImageSlider;
