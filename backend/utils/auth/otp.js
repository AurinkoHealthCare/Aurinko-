const crypto = require("crypto");

function generateOtp(length = 6) {
  return (Math.floor(10 ** (length - 1) + Math.random() * 9 * 10 ** (length - 1))).toString();
}

function hashOtp(otp) {
  return crypto.createHmac("sha256", process.env.OTP_SECRET).update(otp).digest("hex");
}

function constantTimeEqual(a, b) {
  const ba = Buffer.from(a || "");
  const bb = Buffer.from(b || "");
  if (ba.length !== bb.length) return false;
  return crypto.timingSafeEqual(ba, bb);
}

module.exports = { generateOtp, hashOtp, constantTimeEqual };
