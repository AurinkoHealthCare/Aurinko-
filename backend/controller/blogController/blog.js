const Blog = require("../../model/blogModel/blog");
const fs = require("fs");
const path = require("path");

const baseUrl = (req) => `${req.protocol}://${req.get("host")}`;

// 📝 Create Blog
const createBlog = async (req, res) => {
  try {
    const { headings, paragraphs, category } = req.body; // include category

    const parsedHeadings = headings ? JSON.parse(headings) : [];
    const parsedParagraphs = paragraphs ? JSON.parse(paragraphs) : [];

    let imageUrl = null;
    let imageName = null;

    if (req.file) {
      imageUrl = `${baseUrl(req)}/uploads/image/${req.file.filename}`;
      imageName = req.file.originalname;
    }

    const newBlog = await Blog.create({
      imageUrl,
      imageName,
      headings: parsedHeadings,
      paragraphs: parsedParagraphs,
      category: category || "", // save category
    });

    res.status(201).json(newBlog);
  } catch (err) {
    console.error("Create Blog Error:", err);
    res.status(500).json({ error: err.message });
  }
};

// 📥 Get all blogs
const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    console.error("Get Blogs Error:", err);
    res.status(500).json({ error: err.message });
  }
};

// ✏️ Update blog
const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { headings, paragraphs, category } = req.body;

    const parsedHeadings = headings ? JSON.parse(headings) : [];
    const parsedParagraphs = paragraphs ? JSON.parse(paragraphs) : [];

    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });

    if (req.file && blog.imageUrl) {
      const oldPath = path.join(
        __dirname,
        "../../uploads/image",
        path.basename(blog.imageUrl)
      );
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);

      blog.imageUrl = `${baseUrl(req)}/uploads/image/${req.file.filename}`;
      blog.imageName = req.file.originalname;
    }

    blog.headings = parsedHeadings.length ? parsedHeadings : blog.headings;
    blog.paragraphs = parsedParagraphs.length ? parsedParagraphs : blog.paragraphs;
    blog.category = category || blog.category; // update category

    await blog.save();

    res.json(blog);
  } catch (err) {
    console.error("Update Blog Error:", err);
    res.status(500).json({ error: err.message });
  }
};

// 🗑 Delete blog
const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });

    if (blog.imageUrl) {
      const filePath = path.join(
        __dirname,
        "../../uploads/image",
        path.basename(blog.imageUrl)
      );
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    res.json({ message: "Blog deleted successfully", id });
  } catch (err) {
    console.error("Delete Blog Error:", err);
    res.status(500).json({ error: err.message });
  }
};

const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const { lang } = req.query; // optional query param for language
    const blog = await Blog.findById(id);

    if (!blog) return res.status(404).json({ error: "Blog not found" });

    // If lang is specified, filter headings & paragraphs
    if (lang) {
      const filteredBlog = {
        ...blog.toObject(),
        headings: blog.headings.map((h) => ({ [lang]: h[lang] || "" })),
        paragraphs: blog.paragraphs.map((p) => ({ [lang]: p[lang] || "" })),
      };
      return res.json(filteredBlog);
    }

    res.json(blog);
  } catch (err) {
    console.error("Get Blog by ID Error:", err);
    res.status(500).json({ error: err.message });
  }
};


module.exports = { createBlog, getBlogs, updateBlog, deleteBlog,getBlogById };
