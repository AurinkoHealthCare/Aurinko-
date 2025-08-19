require("dotenv").config();
const mongoose = require("mongoose");
const maxmind = require("maxmind");
const path = require("path");

// Mongo schema
const locationSchema = new mongoose.Schema({
  ip: String,
  country: String,
  state: String,
  city: String,
  latitude: Number,
  longitude: Number,
}, { timestamps: true });

const Location = mongoose.model("Location", locationSchema);

(async () => {
  try {
    // 1. MongoDB connect
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    // 2. MaxMind DB load
    const dbPath = path.join(__dirname, "GeoLite2-City.mmdb");
    const lookup = await maxmind.open(dbPath);

    // 3. Test IP (aap apna IP bhi use kar sakte ho)
    const ip = "103.21.33.112";
    const geo = lookup.get(ip);

    if (!geo) {
      console.log("❌ No location found for IP:", ip);
      return;
    }

    const locationData = {
      ip,
      country: geo.country?.names?.en || null,
      state: geo.subdivisions?.[0]?.names?.en || null,
      city: geo.city?.names?.en || null,
      latitude: geo.location?.latitude || null,
      longitude: geo.location?.longitude || null,
    };

    console.log("🌍 Location Data:", locationData);

    // 4. Save to MongoDB
    const saved = await Location.create(locationData);
    console.log("✅ Saved to MongoDB:", saved);

    mongoose.disconnect();
  } catch (err) {
    console.error("❌ Error:", err);
  }
})();
