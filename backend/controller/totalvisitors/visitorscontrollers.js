const axios = require("axios");
const Visitor = require("../../model/totalvisitors/totalvisitorschema");
const { v4: uuidv4 } = require("uuid");

// Helper for correct IP detection
const getClientIp = (req) => {
  let ip =
    req.headers["cf-connecting-ip"] || // Cloudflare
    (req.headers["x-forwarded-for"] ? req.headers["x-forwarded-for"].split(",")[0].trim() : null) ||
    req.headers["x-real-ip"] || // Nginx
    req.socket.remoteAddress;

  if (ip && ip.startsWith("::ffff:")) ip = ip.replace("::ffff:", "");
  if (ip === "::1") ip = "127.0.0.1"; // localhost
  return ip;
};

const trackVisitor = async (req, res) => {
  try {
    const ip = getClientIp(req);
    const userAgent = req.headers["user-agent"] || "Unknown";

    // Step 1: Check or create visitorId cookie
    let visitorId = req.cookies.visitorId;
    if (!visitorId) {
      visitorId = uuidv4();
      res.cookie("visitorId", visitorId, {
        maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
        httpOnly: true,
        sameSite: "Lax",
        secure: process.env.NODE_ENV === "production", // only secure in prod
      });
    }

    // Step 2: Look for existing visitor
    let visitor = await Visitor.findOne({ visitorId });

    if (visitor) {
      // Update visit history
      visitor.lastVisit = new Date();
      visitor.visits.push({ ip, date: new Date() });
      await visitor.save();

      const allVisitors = await Visitor.aggregate([
        {
          $group: {
            _id: { country: "$country", region: "$region", city: "$city" },
            count: { $sum: 1 },
          },
        },
      ]);

      return res.json({
        success: true,
        message: "Returning visitor",
        visitor,
        allVisits: allVisitors,
      });
    }

    // Step 3: Fetch geo info (skip for localhost)
    let country = "Unknown",
      regionName = "Unknown",
      city = "Unknown";

    try {
      if (ip !== "127.0.0.1") {
        const geo = await axios.get(`http://ip-api.com/json/${ip}`, {
          timeout: 3000,
        });
        country = geo.data.country || "Unknown";
        regionName = geo.data.regionName || "Unknown";
        city = geo.data.city || "Unknown";
      }
    } catch (geoErr) {
      console.error("Geo API Error:", geoErr.message);
    }

    // Step 4: Save new visitor
    visitor = new Visitor({
      visitorId,
      ip,
      userAgent,
      country,
      region: regionName,
      city,
      visits: [{ ip, date: new Date() }],
    });

    await visitor.save();

    const allVisitors = await Visitor.aggregate([
      {
        $group: {
          _id: { country: "$country", region: "$region", city: "$city" },
          count: { $sum: 1 },
        },
      },
    ]);

    res.json({
      success: true,
      message: "New visitor tracked",
      visitor,
      allVisits: allVisitors,
    });
  } catch (err) {
    console.error("Track Error:", err.message);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

module.exports = { trackVisitor };
