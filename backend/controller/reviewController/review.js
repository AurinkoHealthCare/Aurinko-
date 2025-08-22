const Review = require("../../model/reviewmodel/review");

// POST - add new review
const addReview = async (req, res) => {
  try {
    const { name, email, rating, comment } = req.body;

    // check duplicate email
    const existing = await Review.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: "You have already submitted a review" });
    }

    const review = new Review({ name, email, rating, comment });
    await review.save();

    res.status(201).json({ message: "Review submitted for approval!" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// GET - only approved reviews
const getApprovedReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ approved: true }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PATCH - approve a review (admin action)
const approveReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { approved: true },
      { new: true }
    );
    res.json({ message: "Review approved!", review });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET - all reviews (admin only)
const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE - remove review
const deleteReview = async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ message: "Review deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addReview,
  getApprovedReviews,
  approveReview,
  getAllReviews,
  deleteReview
};
