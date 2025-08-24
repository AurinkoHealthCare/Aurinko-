import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../../../api/axios";
import { useTranslation } from "react-i18next";

const BlogDetails = ({ category }) => {
  const { id } = useParams(); // ab sirf id le rahe ho
  const { i18n } = useTranslation();
  const selectedLang = i18n.language;

  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        console.log("📌 Fetching blog with id:", id); // Debug id
        const res = await axios.get(`/blog/get/${id}`);
        console.log("📌 API response:", res.data); // Debug response
        setBlog(res.data);
      } catch (err) {
        console.error("❌ Error while fetching blog:", err);
      }
    };

    fetchBlog();
  }, [id]);

  if (!blog) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-6">
        {blog.headings?.[0]?.[selectedLang] || "No heading available"}
      </h1>
      <img
        src={blog.imageUrl}
        alt={blog.headings?.[0]?.[selectedLang] || "Blog"}
        className="w-full rounded-lg mb-6"
      />
      <p className="text-lg leading-relaxed">
        {blog.paragraphs?.[0]?.[selectedLang] || "No content available"}
      </p>

      <p className="mt-6 text-sm text-gray-500">
        Category: <span className="font-semibold">{category}</span>
      </p>
    </div>
  );
};

export default BlogDetails;
