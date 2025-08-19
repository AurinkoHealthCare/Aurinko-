const axios = require("axios");
const Visitor = require("../../model/totalvisitors/totalvisitorschema");
const { v4: uuidv4 } = require("uuid");

// ✅ Helper for correct IP detection
const getClientIp = (req) => {
  let ip =
    req.headers["cf-connecting-ip"] || // Cloudflare
    (req.headers["x-forwarded-for"] ? req.headers["x-forwarded-for"].split(",")[0].trim() : null) ||
    req.headers["x-real-ip"] || // Nginx / proxy
    req.socket.remoteAddress;

  if (ip && ip.startsWith("::ffff:")) ip = ip.replace("::ffff:", "");
  if (ip === "::1") ip = "127.0.0.1"; // localhost
  return ip;
};

// ✅ Get Geo Info safely
const getGeoInfo = async (ip) => {
  if (!ip || ip === "127.0.0.1") {
    return { country: "Localhost", region: "Local", city: "Local" };
  }

  try {
    const { data } = await axios.get(`http://ip-api.com/json/${ip}`, { timeout: 2500 });
    return {
      country: data?.country || "Unknown",
      region: data?.regionName || "Unknown",
      city: data?.city || "Unknown",
    };
  } catch (err) {
    console.error("🌍 Geo API Error:", err.message);
    return { country: "Unknown", region: "Unknown", city: "Unknown" };
  }
};

// ✅ Aggregate visitors by location
const getAllVisitorsGrouped = async () => {
  return Visitor.aggregate([
    {
      $group: {
        _id: { country: "$country", region: "$region", city: "$city" },
        count: { $sum: 1 },
      },
    },
  ]);
};

const trackVisitor = async (req, res) => {
  try {
    const ip = getClientIp(req);
    const userAgent = req.headers["user-agent"] || "Unknown";

    // Step 1: Handle visitorId cookie
    let visitorId = req.cookies.visitorId;
    if (!visitorId) {
      visitorId = uuidv4();
      res.cookie("visitorId", visitorId, {
        maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
        httpOnly: true,
        sameSite: "Lax",
        secure: process.env.NODE_ENV === "production",
      });
    }

    // Step 2: Check if visitor exists
    let visitor = await Visitor.findOne({ visitorId });

    if (visitor) {
      visitor.lastVisit = new Date();
      visitor.visits.push({ ip, date: new Date() });
      await visitor.save();

      const allVisitors = await getAllVisitorsGrouped();

      return res.json({
        success: true,
        message: "Returning visitor",
        visitor,
        allVisits: allVisitors,
      });
    }

    // Step 3: Fetch geo info
    const { country, region, city } = await getGeoInfo(ip);

    // Step 4: Create new visitor
    visitor = new Visitor({
      visitorId,
      ip,
      userAgent,
      country,
      region,
      city,
      visits: [{ ip, date: new Date() }],
    });

    await visitor.save();
    const allVisitors = await getAllVisitorsGrouped();

    res.json({
      success: true,
      message: "New visitor tracked",
      visitor,
      allVisits: allVisitors,
    });
  } catch (err) {
    console.error("🔥 Track Error:", err.message);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports = { trackVisitor };
