import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../../../api/axios";
import { useTranslation } from "react-i18next";

const BlogDetails = () => {
  const { id } = useParams();
  const { i18n } = useTranslation();
  const selectedLang = i18n.language.split("-")[0] || "en";

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/blog/get/${id}?lang=${selectedLang}`);
        setBlog(res.data);
      } catch (err) {
        console.error("Error fetching blog:", err);
        setError("Failed to fetch blog.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id, selectedLang]);

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;
  if (!blog) return <p className="text-center py-10">Blog not found.</p>;

  // Get first non-empty heading
  const getHeading = () => {
    if (!Array.isArray(blog.headings)) return "No heading available";
    for (let h of blog.headings) {
      if (h[selectedLang]?.trim()) return h[selectedLang];
      // fallback to any non-empty value
      const firstNonEmpty = Object.values(h).find(v => v.trim());
      if (firstNonEmpty) return firstNonEmpty;
    }
    return "No heading available";
  };

  // Get all non-empty paragraphs
  const getParagraphs = () => {
    if (!Array.isArray(blog.paragraphs)) return ["No content available"];
    return blog.paragraphs
      .map(p => p[selectedLang]?.trim() || Object.values(p).find(v => v.trim()))
      .filter(Boolean);
  };

  const heading = getHeading();
  const paragraphs = getParagraphs();

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-6">{heading}</h1>

      {blog.imageUrl && (
        <img
          src={blog.imageUrl}
          alt={heading}
          className="w-full rounded-lg mb-6 object-cover"
        />
      )}

      {paragraphs.map((para, idx) => (
        <p key={idx} className="text-lg leading-relaxed mb-4">
          {para}
        </p>
      ))}

      <p className="mt-6 text-sm text-gray-500">
        Category: <span className="font-semibold">{blog.category}</span>
      </p>
      <p className="text-sm text-gray-400">
        Created: {new Date(blog.createdAt).toLocaleString()} | Updated:{" "}
        {new Date(blog.updatedAt).toLocaleString()}
      </p>
    </div>
  );
};

export default BlogDetails;
