const express = require("express");
const dotenv = require("dotenv");
const MongoDB = require("./config/dataBase");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const path = require("path");
const fs = require("fs");
const compression = require("compression");

// Load env
dotenv.config();

// Connect DB    
MongoDB();

const app = express();
app.set("trust proxy", 1);
const PORT = process.env.PORT || 4040;

const uploadsPath = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true });
}
app.use("/uploads", express.static(uploadsPath));

app.use(
  cors({
    origin: process.env.ORIGIN || "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
  })
);

app.use(express.json({ limit: "10mb" })); // Handle larger payloads
app.use(cookieParser());
app.use(helmet({ crossOriginResourcePolicy: false })); // Allow static images
app.use(compression()); // Gzip compression


app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    message: "Too many requests, please try again later.",
  })
);

// ✅ Routes
app.use("/api/auth", require("./router/adminroutes/adminrouter"));
app.use("/api/sliderimage", require("./router/imagesliderrouter/imagesliderrouter"));
app.use("/api/visitors", require("./router/totalvisitors/visitorsrouter"));
app.use("/api/submit", require("./router/contact/contact"));
app.use("/api/products", require("./router/products/productsrouter"));
app.use("/api/products2", require("./router/products2router/products2"));
app.use("/api/pdf", require("./router/pdf/pdfRouter"));
app.use("/api/gallery", require("./router/galleryRouter/gallery"));
app.use("/api/otherimage", require("./router/otherimagesRouter/otherimage"));
app.use("/api/brochures", require("./router/brochures/brochures"));
app.use("/api/products-search", require("./utils/searchrouter"));
app.use("/api/video", require("./router/videoRouter/video"));
app.use("/api/reviews", require("./router/reviewRouter/review"));

// ✅ 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
  });
});

// ✅ Error Handler
app.use((err, req, res, next) => { 
  console.error("🔥 Error:", err.stack);
  res.status(500).json({ success: false, error: err.message || "Internal Server Error" });
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
