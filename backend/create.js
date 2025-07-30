// require("dotenv").config();
// const mongoose = require("mongoose");
// const Visitor = require("./model/totalvisitors/totalvisitorschema"); // apna schema import karo

// // ✅ Connect DB
// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     });
//     console.log("✅ MongoDB connected");
//   } catch (err) {
//     console.error("❌ Connection error:", err.message);
//     process.exit(1);
//   }
// };

// // ✅ Dummy Visitors Data (20 visitors, multiple from same cities)
// const dummyVisitors = [
//   // Delhi - 3 users
//   { ip: "101.1.1.1", userAgent: "Chrome Windows", country: "India", region: "Delhi", city: "New Delhi", visitorId: "visitor-001" },
//   { ip: "101.1.1.2", userAgent: "Firefox Linux", country: "India", region: "Delhi", city: "New Delhi", visitorId: "visitor-002" },
//   { ip: "101.1.1.3", userAgent: "Safari iPhone", country: "India", region: "Delhi", city: "New Delhi", visitorId: "visitor-003" },

//   // Mumbai - 2 users
//   { ip: "104.4.4.4", userAgent: "Edge Windows", country: "India", region: "Maharashtra", city: "Mumbai", visitorId: "visitor-004" },
//   { ip: "104.4.4.5", userAgent: "Chrome Mac", country: "India", region: "Maharashtra", city: "Mumbai", visitorId: "visitor-005" },

//   // Sydney - 2 users
//   { ip: "108.8.8.8", userAgent: "Samsung Browser", country: "Australia", region: "NSW", city: "Sydney", visitorId: "visitor-006" },
//   { ip: "108.8.8.9", userAgent: "Safari iPhone", country: "Australia", region: "NSW", city: "Sydney", visitorId: "visitor-007" },

//   // Tokyo - 2 users
//   { ip: "110.10.10.10", userAgent: "Safari iPad", country: "Japan", region: "Tokyo", city: "Tokyo", visitorId: "visitor-008" },
//   { ip: "110.10.10.11", userAgent: "Chrome Android", country: "Japan", region: "Tokyo", city: "Tokyo", visitorId: "visitor-009" },

//   // USA, UK, Canada, Germany, etc.
//   { ip: "102.2.2.2", userAgent: "Firefox Linux", country: "USA", region: "California", city: "Los Angeles", visitorId: "visitor-010" },
//   { ip: "103.3.3.3", userAgent: "Safari iPhone", country: "UK", region: "London", city: "London", visitorId: "visitor-011" },
//   { ip: "105.5.5.5", userAgent: "Opera Android", country: "Canada", region: "Ontario", city: "Toronto", visitorId: "visitor-012" },
//   { ip: "106.6.6.6", userAgent: "Brave Linux", country: "Germany", region: "Berlin", city: "Berlin", visitorId: "visitor-013" },
//   { ip: "107.7.7.7", userAgent: "Vivaldi Mac", country: "France", region: "Île-de-France", city: "Paris", visitorId: "visitor-014" },
//   { ip: "109.9.9.9", userAgent: "UC Browser Android", country: "India", region: "Uttar Pradesh", city: "Lucknow", visitorId: "visitor-015" },

//   // Brazil, South Africa, Italy, UAE, Russia
//   { ip: "111.11.11.11", userAgent: "Edge Linux", country: "Brazil", region: "São Paulo", city: "São Paulo", visitorId: "visitor-016" },
//   { ip: "112.12.12.12", userAgent: "Chrome Windows", country: "South Africa", region: "Gauteng", city: "Johannesburg", visitorId: "visitor-017" },
//   { ip: "113.13.13.13", userAgent: "Safari Mac", country: "Italy", region: "Lombardy", city: "Milan", visitorId: "visitor-018" },
//   { ip: "114.14.14.14", userAgent: "Chrome Android", country: "UAE", region: "Dubai", city: "Dubai", visitorId: "visitor-019" },
//   { ip: "115.15.15.15", userAgent: "Firefox Windows", country: "Russia", region: "Moscow", city: "Moscow", visitorId: "visitor-020" }
// ];

// // ✅ Insert Visitors Without Duplicate Error
// const insertVisitors = async () => {
//   await connectDB();

//   try {
//     for (const visitor of dummyVisitors) {
//       const result = await Visitor.updateOne(
//         { visitorId: visitor.visitorId },   // check if exists
//         { $setOnInsert: visitor },          // only insert if new
//         { upsert: true }
//       );

//       if (result.upsertedCount > 0) {
//         console.log(`✅ Inserted: ${visitor.ip} (${visitor.userAgent})`);
//       } else {
//         console.log(`⚠️ Already exists: ${visitor.ip} (${visitor.userAgent})`);
//       }
//     }
//   } catch (err) {
//     console.error("❌ Error inserting:", err.message);
//   } finally {
//     mongoose.connection.close();
//   }
// };

// insertVisitors();


const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://aurinkohealthcare2014:2uEGxYFd5F5CJ9jg@aurinko.mqcudfz.mongodb.net/')
  .then(async () => {
    const stats = await mongoose.connection.db.stats();
    console.log("Data Size:", stats.dataSize, "bytes");
    console.log("Storage Size:", stats.storageSize, "bytes");
    mongoose.disconnect();
  })
  .catch(err => console.error(err));
