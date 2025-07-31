const Product = require("../../model/products/productsSchema");
const fs = require("fs");
const path = require("path");

// ➕ Add Product
exports.addProduct = async (req, res) => {
  try {
    const { name, category, details, rating } = req.body;
    const baseUrl = `${req.protocol}://${req.get("host")}`;

    let translations = {};
    if (req.body.translations) {
      try {
        translations = JSON.parse(req.body.translations);
      } catch (err) {
        return res.status(400).json({ message: "Invalid translations format" });
      }
    }

    const count = await Product.countDocuments({ category });
    if (count >= 5) {
      if (req.file) fs.unlinkSync(req.file.path);
      return res
        .status(400)
        .json({ message: `Category '${category}' already has 5 products` });
    }

    if (rating < 1 || rating > 5) {
      return res
        .status(400)
        .json({ message: "Rating must be between 1 and 5" });
    }

    const product = new Product({
      name,
      category,
      details,
      rating,
      translations,
      image: req.file ? `${baseUrl}/uploads/${req.file.filename}` : null,
    });

    const saved = await product.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("❌ Add Product Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// 📌 Get All Products
exports.getProducts = async (req, res) => {
  try {
    const { category, lang } = req.query;
    let filter = {};
    if (category) filter.category = category;

    const products = await Product.find(filter);

    const result = products.map((p) => ({
      productId: p.productId,
      image: p.image,
      rating: p.rating,
      name:
        lang && lang !== "en"
          ? p.translations[lang]?.name || p.name
          : p.name,
      category:
        lang && lang !== "en"
          ? p.translations[lang]?.category || p.category
          : p.category,
      details:
        lang && lang !== "en"
          ? p.translations[lang]?.details || p.details
          : p.details,
      translations: p.translations, // ✅ ताकि frontend edit में इस्तेमाल कर सके
    }));

    res.json(result);
  } catch (err) {
    console.error("❌ Get Products Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// 📌 Get Single Product
exports.getProductById = async (req, res) => {
  try {
    const lang = req.query.lang || "en";
    const product = await Product.findOne({ productId: req.params.id });
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json({
      productId: product.productId,
      image: product.image,
      rating: product.rating,
      name:
        lang !== "en"
          ? product.translations[lang]?.name || product.name
          : product.name,
      category:
        lang !== "en"
          ? product.translations[lang]?.category || product.category
          : product.category,
      details:
        lang !== "en"
          ? product.translations[lang]?.details || product.details
          : product.details,
      translations: product.translations,
    });
  } catch (err) {
    console.error("❌ Get Product Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✏️ Update Product
exports.updateProduct = async (req, res) => {
  try {
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const product = await Product.findOne({ productId: req.params.id });

    if (!product)
      return res.status(404).json({ message: "Product not found" });

    // ✅ अगर नई image upload हुई
    if (req.file) {
      if (product.image) {
        const oldPath = path.join(
          __dirname,
          "../../../",
          product.image.replace(baseUrl, "").replace(/^\//, "")
        );
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      product.image = `${baseUrl}/uploads/${req.file.filename}`;
    }

    product.name = req.body.name || product.name;
    product.category = req.body.category || product.category;
    product.details = req.body.details || product.details;

    if (req.body.rating !== undefined) {
      const rating = parseInt(req.body.rating, 10);
      if (isNaN(rating) || rating < 1 || rating > 5) {
        return res
          .status(400)
          .json({ message: "Rating must be a number between 1 and 5" });
      }
      product.rating = rating;
    }

    // ✅ parse translations
    if (req.body.translations) {
      try {
        product.translations = JSON.parse(req.body.translations);
      } catch (err) {
        return res.status(400).json({ message: "Invalid translations format" });
      }
    }

    const updated = await product.save();
    res.json(updated);
  } catch (err) {
    console.error("❌ Update Product Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ❌ Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const product = await Product.findOne({ productId: req.params.id });
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (product.image) {
      const filePath = path.join(
        __dirname,
        "../../../",
        product.image.replace(baseUrl, "").replace(/^\//, "")
      );
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await product.deleteOne();
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("❌ Delete Product Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
