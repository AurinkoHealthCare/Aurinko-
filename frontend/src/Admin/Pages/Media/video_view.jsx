import React, { useEffect, useState } from "react";
import axios from "../../../../api/axios";
import { toast } from "react-toastify";

export default function VideoManager() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  const [newTitle, setNewTitle] = useState("");

  // Fetch all videos
  const fetchVideos = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/video/all");
      if (res.data?.success) setVideos(res.data.data);
      else toast.error("Failed to fetch videos ❌");
    } catch {
      toast.error("Server error ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  // Delete video
  const deleteVideo = async (id) => {
    if (!window.confirm("Are you sure you want to delete this video? ❌")) return;
    try {
      const res = await axios.delete(`/video/delete/${id}`);
      if (res.data?.success) {
        toast.success(res.data.message || "Deleted ✅");
        setVideos((prev) => prev.filter((v) => v._id !== id));
      } else toast.error(res.data?.message || "Delete failed ❌");
    } catch {
      toast.error("Delete error ❌");
    }
  };

  // Start editing
  const startEdit = (video) => {
    setEditingVideo(video);
    setNewTitle(video.title);
  };

  // Save edit
  const saveEdit = async () => {
    if (!newTitle) return toast.error("Title cannot be empty ❌");
    try {
      const formData = new FormData();
      formData.append("title", newTitle);
      if (editingVideo.newFile) formData.append("video", editingVideo.newFile);

      const res = await axios.put(`/video/update/${editingVideo._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data?.success) {
        toast.success(res.data.message || "Updated ✅");
        setEditingVideo(null);
        fetchVideos();
      } else toast.error(res.data?.message || "Update failed ❌");
    } catch {
      toast.error("Server error ❌");
    }
  };

  // Handle file change during edit
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 30 * 1024 * 1024) return toast.error("Max 30MB ❌");
    setEditingVideo({ ...editingVideo, newFile: file });
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl w-full max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Manage Videos</h2>

      {loading && <p className="text-gray-500 text-center">Loading videos...</p>}

      {!loading && videos.length === 0 && <p className="text-gray-500 text-center">No videos uploaded.</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div key={video._id} className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition p-3">
            <video controls className="w-full h-40 object-cover mb-2 rounded">
              <source src={video.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {editingVideo?._id === video._id ? (
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="border p-2 rounded w-full"
                />
                <input type="file" accept="video/*" onChange={handleFileChange} />
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={saveEdit}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingVideo(null)}
                    className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p className="font-semibold">{video.title}</p>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => startEdit(video)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteVideo(video._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
