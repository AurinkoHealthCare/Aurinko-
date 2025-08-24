import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../../../../api/axios";

const Blog = () => {
  const { category } = useParams(); // 🔹 category URL se milega (jaise /blogs/human)
  const [blogs, setBlogs] = useState([]);
  const [selectedLang, setSelectedLang] = useState("en");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("/blog/get");
        // 🔹 Filter category ke hisaab se
        const filtered = res.data.filter((b) => b.category === category);
        setBlogs(filtered);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBlogs();
  }, [category]);

  return (
    <div className="min-h-screen container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold text-center mb-8 capitalize">
        {category} Blogs
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white shadow-md rounded-lg p-6 flex flex-col md:flex-row"
          >
            {/* 🔹 Image */}
            {blog.imageUrl && (
              <img
                src={blog.imageUrl}
                alt="Blog"
                className="w-full md:w-1/3 rounded-lg mb-4 md:mb-0 md:mr-6 object-cover"
              />
            )}

            <div className="md:w-2/3">
              {/* 🔹 Heading 1 */}
              <Link to={`/blog/${blog._id}`}>
                <h2 className="text-2xl font-bold mb-2">
                  {blog.headings?.[0]?.[selectedLang]}
                </h2>
              </Link>

              {/* 🔹 Paragraph 1 */}
              <p className="text-gray-600">
                {blog.paragraphs?.[0]?.[selectedLang]?.slice(0, 150)}...
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
