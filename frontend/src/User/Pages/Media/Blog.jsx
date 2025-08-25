import React, { useEffect, useState } from "react";
import axios from "../../../../api/axios";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Blog = ({ category }) => {
  const [blogs, setBlogs] = useState([]);
  const { i18n } = useTranslation();
  const selectedLang = i18n.language;

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("/blog/get");
      const filteredBlogs = res.data.filter(
        (b) => b.category?.toLowerCase() === category?.toLowerCase()
      );
      setBlogs(filteredBlogs);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [category]);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="flex flex-col items-center py-6 mb-8">
        <h1 className="text-4xl font-bold">
          {category ? `${category} Blogs` : "OUR BLOGS"}
        </h1>
      </header>

      {/* Blog Cards */}
      <main className="container mx-auto py-8 px-4">
        {blogs.length === 0 ? (
          <p className="text-center text-gray-500">
            No blogs available for this category
          </p>
        ) : (
          blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white shadow-md rounded-lg p-6 mb-8"
            >
              <div className="flex flex-col md:flex-row">
                {/* Blog Image */}
                {blog.imageUrl && (
                  <img
                    src={blog.imageUrl}
                    alt={blog.headings?.[0]?.[selectedLang] || "Blog"}
                    className="w-full md:w-1/3 rounded-lg mb-4 md:mb-0 md:mr-6 object-cover"
                  />
                )}

                {/* Blog Content */}
                <div className="md:w-2/3">
                  <Link to={`/${category}/blog/${blog._id}`}>
                    <h2 className="text-3xl font-bold mb-4">
                      {blog.headings?.[0]?.[selectedLang] ||
                        "No heading available"}
                    </h2>
                  </Link>
                  <p className="text-gray-700 leading-relaxed">
                    {blog.paragraphs?.[0]?.[selectedLang]
                      ? blog.paragraphs[0][selectedLang].slice(0, 250) + "..."
                      : "No content available"}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </main>
    </div>
  );
};

export default Blog;
