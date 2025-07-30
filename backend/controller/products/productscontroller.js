const Product = require("../../model/products/productsSchema");
const fs = require("fs");
const path = require("path");

// ➕ Add Product (limit: 5 per category)
exports.addProduct = async (req, res) => {
  try {
    const { name, category, details } = req.body;
    const baseUrl = `${req.protocol}://${req.get("host")}`;

    const count = await Product.countDocuments({ category });
    if (count >= 5) {
      if (req.file) fs.unlinkSync(req.file.path);
      return res.status(400).json({ message: `Category '${category}' already has 5 products` });
    }

    const product = new Product({
      name,
      category,
      details,
      image: req.file ? `${baseUrl}/uploads/${req.file.filename}` : null,
    });

    const saved = await product.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 📌 Get All Products (optional filter by category)
exports.getProducts = async (req, res) => {
  try {
    const { category } = req.query;
    let filter = {};

    if (category) filter.category = category;

    const products = await Product.find(filter);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✏️ Update Product
exports.updateProduct = async (req, res) => {
  try {
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (req.file) {
      // delete old image
      if (product.image) {
        const oldPath = path.join(__dirname, "..", product.image.replace(baseUrl, "").replace(/^\//, ""));
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      product.image = `${baseUrl}/uploads/${req.file.filename}`;
    }

    product.name = req.body.name || product.name;
    product.category = req.body.category || product.category;
    product.details = req.body.details || product.details;

    const updated = await product.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ❌ Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (product.image) {
      const filePath = path.join(__dirname, "..", product.image.replace(baseUrl, "").replace(/^\//, ""));
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await product.deleteOne();
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
