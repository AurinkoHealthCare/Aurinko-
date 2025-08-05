const Product = require("../../model/products2/products2");
const fs = require("fs");
const path = require("path");

// ➕ Add Product
exports.addProduct = async (req, res) => {
  try {
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const body = req.body;

    // ✅ Parse translations
    let translations = {};
    if (body.translations) {
      try {
        translations = JSON.parse(body.translations);
      } catch (err) {
        return res.status(400).json({ message: "Invalid translations format" });
      }
    }

    // ✅ Limit 5 products per category
    const count = await Product.countDocuments({ "generalInfo.category": body.category });
    if (count >= 5) {
      deleteUploadedFiles(req.files);
      return res
        .status(400)
        .json({ message: `Category '${body.category}' already has 5 products` });
    }

    const product = new Product({
      productImage: req.files?.productImage?.[0]
        ? `${baseUrl}/uploads/${req.files.productImage[0].customPath}/${req.files.productImage[0].customFilename}`
        : null,
      productLogo: req.files?.productLogo?.[0]
        ? `${baseUrl}/uploads/${req.files.productLogo[0].customPath}/${req.files.productLogo[0].customFilename}`
        : null,
      generalInfo: {
        name: body.name,
        segment: body.segment,
        type: body.type,
        category: body.category,
        packing: body.packing,
      },
      composition: body.composition,
      indications: body.indications,
      usage: body.usage,
      report: body.report,
      brochure: body.brochure,
      feedback: body.feedback,
      translations,
    });

    const saved = await product.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("🔥 Error in addProduct:", err);
    res.status(500).json({ message: err.message });
  }
};

// 📥 Get All Products
exports.getProducts = async (req, res) => {
  try {
    const lang = req.query.lang;
    const products = await Product.find();

    if (lang) {
      const translatedProducts = products.map((p) => {
        const obj = p.toObject();
        if (p.translations?.[lang]) {
          obj.generalInfo = {
            ...obj.generalInfo,
            ...p.translations[lang],
          };
        }
        return obj;
      });
      return res.json(translatedProducts);
    }

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 📥 Get Product by ID
exports.getProductById = async (req, res) => {
  try {
    const lang = req.query.lang;
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let obj = product.toObject();
    if (lang && product.translations?.[lang]) {
      obj.generalInfo = {
        ...obj.generalInfo,
        ...product.translations[lang],
      };
    }

    res.json(obj);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✏️ Update Product
exports.updateProduct = async (req, res) => {
  try {
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const body = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // ✅ Handle images
    if (req.files?.productImage?.[0]) {
      deleteFileIfExists(product.productImage, baseUrl);
      product.productImage = `${baseUrl}/uploads/${req.files.productImage[0].customPath}/${req.files.productImage[0].customFilename}`;
    }
    if (req.files?.productLogo?.[0]) {
      deleteFileIfExists(product.productLogo, baseUrl);
      product.productLogo = `${baseUrl}/uploads/${req.files.productLogo[0].customPath}/${req.files.productLogo[0].customFilename}`;
    }

    // ✅ Update translations
    if (body.translations) {
      try {
        product.translations = JSON.parse(body.translations);
      } catch (err) {
        return res.status(400).json({ message: "Invalid translations format" });
      }
    }

    // ✅ Update general info
    Object.keys(body).forEach((key) => {
      if (["name", "segment", "type", "category", "packing"].includes(key)) {
        product.generalInfo[key] = body[key];
      } else if (
        ["composition", "indications", "usage", "report", "brochure", "feedback"].includes(key)
      ) {
        product[key] = body[key];
      }
    });

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
  const filePath = path.resolve(__dirname, "../../..", relativePath);
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
}
