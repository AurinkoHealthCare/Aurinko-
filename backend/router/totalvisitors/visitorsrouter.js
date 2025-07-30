const express = require("express");
const router = express.Router();
const { trackVisitor } = require("../../controller/totalvisitors/visitorscontrollers");

router.get("/track", trackVisitor);

module.exports = router;