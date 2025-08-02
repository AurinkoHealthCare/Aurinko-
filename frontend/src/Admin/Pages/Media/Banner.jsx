import React, { useEffect, useState } from 'react';
import axios from '../../../../api/axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Banner = () => {
  const [images, setImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState({});
  const [loading, setLoading] = useState({});

  const fetchImages = async () => {
    try {
      const res = await axios.get('/images/all');
      const imageArray = Array.isArray(res.data.images) ? res.data.images : [];
      setImages(imageArray);
    } catch (err) {
      console.error('Error fetching images:', err);
      setImages([]);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleFileChange = (e, imageNo) => {
    setSelectedFiles((prev) => ({
      ...prev,
      [imageNo]: e.target.files[0],
    }));
  };

  const handleDelete = async (no) => {
    setLoading((prev) => ({ ...prev, [no]: 'deleting' }));
    try {
      await axios.delete(`/images/${no}`);
      toast.success(`Image #${no} deleted successfully`);
      fetchImages();
    } catch (err) {
      toast.error(`Failed to delete image #${no}`);
      console.error('Delete error:', err);
    } finally {
      setLoading((prev) => ({ ...prev, [no]: null }));
    }
  };

  const handleUpdate = async (no) => {
    const file = selectedFiles[no];
    if (!file) {
      toast.warning('Please select an image to update.');
      return;
    }

    setLoading((prev) => ({ ...prev, [no]: 'updating' }));
    const formData = new FormData();
    formData.append('image', file);

    try {
      await axios.put(`/images/${no}`, formData);
      toast.success(`Image #${no} updated successfully`);
      fetchImages();
    } catch (err) {
      toast.error(`Failed to update image #${no}`);
      console.error('Update error:', err);
    } finally {
      setLoading((prev) => ({ ...prev, [no]: null }));
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <ToastContainer position="top-right" autoClose={2000} />
      <h2 className="text-3xl font-bold mb-10 text-center text-blue-700">Home Banner List</h2>

      {images.length === 0 ? (
        <p className="text-center text-gray-500">No images found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {images.map((img, index) => (
            <div
              key={img._id}
              className="bg-white rounded-xl p-5 shadow-lg flex flex-col items-center border border-gray-200 hover:shadow-xl transition-all duration-300"
            >
              <p className="text-sm font-medium text-gray-600 mb-2">
                Image #{img.no || index + 1}
              </p>

              {/* Image Preview as label */}
              <label
                htmlFor={`file-${img.no}`}
                className="relative w-full h-40 rounded overflow-hidden cursor-pointer group border bg-gray-50 mb-3"
              >
                <img
                  src={img.url}
                  alt={`Image ${index + 1}`}
                  className="w-full h-full object-contain transition-transform duration-200 group-hover:scale-105"
                />


                <div className="absolute inset-0 bg-black bg-opacity-10 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs font-semibold">
                  Click to change
                </div>
              </label>

              {/* File input (hidden) */}
              <input
                id={`file-${img.no}`}
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, img.no)}
                className="hidden"
              />

              {/* File name */}
              {selectedFiles[img.no] && (
                <p className="text-xs text-gray-500 mb-2 truncate w-full text-center">
                  {selectedFiles[img.no].name}
                </p>
              )}

              {/* Buttons */}
              <div className="flex gap-3 w-full justify-center mt-auto">
                <button
                  onClick={() => handleUpdate(img.no)}
                  disabled={loading[img.no]}
                  className={`w-full px-3 py-1.5 text-sm font-medium rounded-lg transition duration-200 text-white ${loading[img.no] === 'updating'
                    ? 'bg-yellow-400 cursor-not-allowed'
                    : 'bg-yellow-500 hover:bg-yellow-600'
                    }`}
                >
                  {loading[img.no] === 'updating' ? 'Updating...' : 'Update'}
                </button>

                <button
                  onClick={() => handleDelete(img.no)}
                  disabled={loading[img.no]}
                  className={`w-full px-3 py-1.5 text-sm font-medium rounded-lg transition duration-200 text-white ${loading[img.no] === 'deleting'
                    ? 'bg-red-400 cursor-not-allowed'
                    : 'bg-red-600 hover:bg-red-700'
                    }`}
                >
                  {loading[img.no] === 'deleting' ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Banner;
