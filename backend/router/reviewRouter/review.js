const express = require("express");
const {
  addReview,
  getApprovedReviews,
  approveReview,
  getAllReviews,
  deleteReview
} = require("../../controller/reviewController/review");

const router = express.Router();

router.post("/add", addReview);
router.get("/approved", getApprovedReviews);
router.get("/all", getAllReviews);       
router.patch("/:id/approve", approveReview);
router.delete("/:id", deleteReview);

module.exports = router;
