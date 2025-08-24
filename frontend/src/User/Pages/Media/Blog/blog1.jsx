import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../api/axios";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [selectedLang, setSelectedLang] = useState("en");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`/blog/get/${id}`);
        setBlog(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBlog();
  }, [id]);

  if (!blog) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="min-h-screen container mx-auto py-12 px-6">
      {/* 🔹 Image */}
      {blog.imageUrl && (
        <img
          src={blog.imageUrl}
          alt="Blog"
          className="w-full object-cover rounded-lg mb-6"
        />
      )}

      {/* 🔹 Heading 1 */}
      <h1 className="text-3xl font-bold text-center mb-6">
        {blog.headings?.[0]?.[selectedLang]}
      </h1>

      {/* 🔹 Paragraph 1 */}
      <p className="text-gray-700 leading-relaxed mb-6">
        {blog.paragraphs?.[0]?.[selectedLang]}
      </p>

      {/* 🔹 Baaki ke Headings & Paragraphs (agar ho to) */}
      <div className="space-y-6">
        {blog.headings?.slice(1).map((h, i) => (
          <section key={i}>
            <h2 className="text-2xl font-semibold mb-2">
              {h[selectedLang]}
            </h2>
            <p className="text-gray-600">
              {blog.paragraphs[i + 1]?.[selectedLang]}
            </p>
          </section>
        ))}
      </div>
    </div>
  );
};

export default BlogDetail;
