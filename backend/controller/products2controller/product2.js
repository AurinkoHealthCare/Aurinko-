const Product = require("../../model/products2/products2");
const fs = require("fs");
const path = require("path");

// ➕ Add Product
exports.addProduct = async (req, res) => {
  try {
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const {
      name,
      segment,
      type,
      category,
      packing,
      composition,
      indications,
      usage,
      report,
      brochure,
      feedback,
    } = req.body;

    // Limit 5 products per category
    const count = await Product.countDocuments({ "generalInfo.category": category });
    if (count >= 5) {
      deleteUploadedFiles(req.files);
      return res.status(400).json({ message: `Category '${category}' already has 5 products` });
    }

    const product = new Product({
      productImage: req.files?.productImage?.[0]
        ? `${baseUrl}/uploads/${req.files.productImage[0].filename}`
        : null,
      productLogo: req.files?.productLogo?.[0]
        ? `${baseUrl}/uploads/${req.files.productLogo[0].filename}`
        : null,
      generalInfo: {
        name,
        segment,
        type,
        category,
        packing,
      },
      composition,
      indications,
      usage,
      report,
      brochure,
      feedback,
    });

    const saved = await product.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// 📌 Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
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

    // Update images if new ones uploaded
    if (req.files?.productImage?.[0]) {
      deleteFileIfExists(product.productImage, baseUrl);
      product.productImage = `${baseUrl}/uploads/${req.files.productImage[0].filename}`;
    }
    if (req.files?.productLogo?.[0]) {
      deleteFileIfExists(product.productLogo, baseUrl);
      product.productLogo = `${baseUrl}/uploads/${req.files.productLogo[0].filename}`;
    }

    // Update all text fields if provided
    const {
      name,
      segment,
      type,
      category,
      packing,
      composition,
      indications,
      usage,
      report,
      brochure,
      feedback,
    } = req.body;

    if (name) product.generalInfo.name = name;
    if (segment) product.generalInfo.segment = segment;
    if (type) product.generalInfo.type = type;
    if (category) product.generalInfo.category = category;
    if (packing) product.generalInfo.packing = packing;

    if (composition) product.composition = composition;
    if (indications) product.indications = indications;
    if (usage) product.usage = usage;
    if (report) product.report = report;
    if (brochure) product.brochure = brochure;
    if (feedback) product.feedback = feedback;

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

    deleteFileIfExists(product.productImage, baseUrl);
    deleteFileIfExists(product.productLogo, baseUrl);

    await product.deleteOne();
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Utilities
function deleteUploadedFiles(files) {
  if (!files) return;
  Object.values(files).flat().forEach((file) => {
    if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
  });
}

function deleteFileIfExists(fileUrl, baseUrl) {
  if (!fileUrl) return;
  const relativePath = fileUrl.replace(baseUrl, "").replace(/^\//, "");
  const filePath = path.resolve(__dirname, "..", "..", relativePath);
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
}
