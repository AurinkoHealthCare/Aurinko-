import React, { useEffect, useState } from "react";
import axios from "../../../../api/axios";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Blog = ({ category }) => {
  const [blogs, setBlogs] = useState([]);
  const { i18n } = useTranslation();

  // Use only the base language (en from en-GB)
  const selectedLang = i18n.language.split("-")[0] || "en";

  // Fetch all blogs
  const fetchBlogs = async () => {
    try {
      console.log("Fetching blogs...");
      const res = await axios.get("/blog/get");
      console.log("Raw blogs fetched:", res.data);

      const filteredBlogs = res.data.filter(
        (b) =>
          b.category?.toLowerCase() === category?.toLowerCase() || !category
      );
      console.log("Filtered blogs:", filteredBlogs);

      setBlogs(filteredBlogs);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [category]);

  // Get first non-empty heading for selected language
  const getFirstHeading = (headings) => {
    if (!Array.isArray(headings) || headings.length === 0) return "No heading available";
    for (let h of headings) {
      if (h[selectedLang]) return h[selectedLang];
    }
    return "No heading available";
  };

  // Get first non-empty paragraph for selected language
  const getFirstParagraph = (paragraphs) => {
    if (!Array.isArray(paragraphs) || paragraphs.length === 0) return "No content available";
    for (let p of paragraphs) {
      if (p[selectedLang]) return p[selectedLang].slice(0, 150) + "…";
    }
    return "No content available";
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="flex flex-col items-center py-6 mb-8 bg-white shadow">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
          {category ? `${category} Blogs` : "OUR BLOGS"}
        </h1>
        <p className="text-sm text-gray-500 mt-1">Current language: {selectedLang}</p>
      </header>

      {/* Blog Cards */}
      <main className="container mx-auto py-8 px-4">
        {blogs.length === 0 ? (
          <p className="text-center text-gray-500">
            No blogs available for this category
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => {
              const heading = getFirstHeading(blog.headings);
              const paragraph = getFirstParagraph(blog.paragraphs);

              console.log("Rendering blog:", blog._id, heading, paragraph);

              return (
                <div
                  key={blog._id}
                  className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col"
                >
                  {blog.imageUrl && (
                    <img
                      src={blog.imageUrl}
                      alt={heading}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-4 flex flex-col flex-1">
                    <Link to={`/${category}/blog/${blog._id}`}>
                      <h2 className="text-xl sm:text-2xl font-bold mb-2 hover:text-blue-600 transition">
                        {heading}
                      </h2>
                    </Link>
                    <p className="text-gray-700 flex-1">{paragraph}</p>
                    <Link
                      to={`/${category}/blog/${blog._id}`}
                      className="mt-4 inline-block text-blue-600 font-semibold hover:underline"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default Blog;
