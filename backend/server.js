// const express = require('express');
// const dotenv = require('dotenv');
// const MongoDB = require('./config/dataBase');
// const cookieParser = require('cookie-parser');
// const cors = require("cors");
// const helmet = require("helmet");
// const rateLimit = require("express-rate-limit");
// const path = require("path");
// const fs = require("fs");

// // .env config
// dotenv.config();

// // Routers
// const authRoutes = require("./router/adminroutes/adminrouter");
// const imageRoutes = require('./router/imagesliderrouter/imagesliderrouter');
// const visitorRouter = require("./router/totalvisitors/visitorsrouter");
// const contact = require('./router/contact/contact');
// const products = require('./router/products/productsrouter');
// const Products2 = require('./router/products2router/products2');
// const pdfRoutes = require("./router/pdf/pdfRouter");
// const galleryupload = require("./router/galleryRouter/gallery");
// const otherImages = require("./router/otherimagesRouter/otherimage");
// const brochuresRouter = require("./router/brochures/brochures");
//  const searchRoutes=require('./utils/searchrouter')
//  const Video=require('./router/videoRouter/video')

// MongoDB();

// const app = express();
// app.set("trust proxy", 1);
// const PORT = process.env.PORT || 4040;

// const uploadsPath = path.join(__dirname, "uploads");
// if (!fs.existsSync(uploadsPath)) {
//   fs.mkdirSync(uploadsPath, { recursive: true });
// }

// app.use("/uploads", express.static(uploadsPath));
// console.log("Uploads path:", uploadsPath);


// // ✅ Middleware
// app.use(
//   cors({
//     origin:"http://localhost:8001",
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE"],
//   })
// );

// app.use(express.json());
// app.use(cookieParser());
// app.use(helmet());
// app.use(
//   rateLimit({
//     windowMs: 15 * 60 * 1000,
//     max: 200, // adjust as needed
//     message: "Too many requests, please try again later.",
//   })
// );

// // ✅ Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/sliderimage", imageRoutes);
// app.use("/api/visitors", visitorRouter);
// app.use('/api/submit', contact);
// app.use('/api/products', products);
// app.use('/api/products2', Products2);
// app.use("/api/pdf", pdfRoutes);
// app.use("/api/gallery", galleryupload);
// app.use("/api/otherimage", otherImages);
// app.use("/api/brochures", brochuresRouter);
// app.use('/api/products', searchRoutes)
// app.use('/api/video', Video)

// // ✅ Error Handler
// app.use((err, req, res, next) => {
//   console.error("🔥 Error:", err.message);
//   res.status(500).json({ success: false, error: "Internal Server Error" });
// });

// // ✅ Start Server
// app.listen(PORT, () => {
//   console.log(`✅ Server started on http://localhost:${PORT}`);
// });


const express = require('express');
const dotenv = require('dotenv');
const MongoDB = require('./config/dataBase');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
const fs = require('fs');

// Load .env
dotenv.config();

const app = express();
app.set('trust proxy', 1);

// Connect to MongoDB
MongoDB();

const PORT = process.env.PORT || 4040;

// Create uploads folder if not exists
const uploadsPath = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true });
}
app.use('/uploads', express.static(uploadsPath));
console.log('Uploads path:', uploadsPath);

// ✅ Middleware
app.use(
  cors({
    origin: process.env.ORIGIN, // origin from .env
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    message: 'Too many requests, please try again later.',
  })
);

// ✅ Routes
app.use('/api/auth', require('./router/adminroutes/adminrouter'));
app.use('/api/sliderimage', require('./router/imagesliderrouter/imagesliderrouter'));
app.use('/api/visitors', require('./router/totalvisitors/visitorsrouter'));
app.use('/api/submit', require('./router/contact/contact'));
app.use('/api/products', require('./router/products/productsrouter'));
app.use('/api/products2', require('./router/products2router/products2'));
app.use('/api/pdf', require('./router/pdf/pdfRouter'));
app.use('/api/gallery', require('./router/galleryRouter/gallery'));
app.use('/api/otherimage', require('./router/otherimagesRouter/otherimage'));
app.use('/api/brochures', require('./router/brochures/brochures'));
app.use('/api/products', require('./utils/searchrouter'));
app.use('/api/video', require('./router/videoRouter/video'));

// ✅ Serve React frontend in production
if (process.env.NODE_ENV === 'production') {
  const frontendBuildPath = path.join(__dirname, '../frontend/build');
  app.use(express.static(frontendBuildPath));

  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendBuildPath, 'index.html'));
  });
}

// ✅ Error Handler
app.use((err, req, res, next) => {
  console.error('🔥 Error:', err.message);
  res.status(500).json({ success: false, error: 'Internal Server Error' });
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
