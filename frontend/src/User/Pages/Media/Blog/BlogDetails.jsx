import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../../../api/axios";
import { useTranslation } from "react-i18next";

const BlogDetails = ({ category }) => {
  const { id } = useParams();
  const { i18n } = useTranslation();
  const selectedLang = i18n.language;

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        console.log("📌 Fetching blog with id:", id);
        const res = await axios.get(`/blog/get/${id}`);
        console.log("📌 API response:", res.data);

        // Check if data is wrapped
        const blogData = res.data.blog || res.data; // fallback if no "blog" key
        if (!blogData || Object.keys(blogData).length === 0) {
          setError("Blog not found");
        } else {
          setBlog(blogData);
        }
      } catch (err) {
        console.error("❌ Error while fetching blog:", err);
        setError("Failed to load blog. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;
  if (!blog) return <p className="text-center py-10">No blog data available</p>;

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-6">
        {blog.headings?.[0]?.[selectedLang] || "No heading available"}
      </h1>

      {blog.imageUrl && (
        <img
          src={blog.imageUrl}
          alt={blog.headings?.[0]?.[selectedLang] || "Blog"}
          className="w-full rounded-lg mb-6"
        />
      )}

      <p className="text-lg leading-relaxed">
        {blog.paragraphs?.[0]?.[selectedLang] || "No content available"}
      </p>

      {category && (
        <p className="mt-6 text-sm text-gray-500">
          Category: <span className="font-semibold">{category}</span>
        </p>
      )}
    </div>
  );
};

export default BlogDetails;
