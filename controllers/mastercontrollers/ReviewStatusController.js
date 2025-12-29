const mongoose = require("mongoose");
const ReviewStatus = require("../../model/masterModels/ReviewStatus");
// Create a new  ReviewStatus
exports.createReviewStatus = async (req, res) => {
  try {
    const { reviewStatusName, reviewStatusCode, isActive } = req.body;

    // Check for duplicates (if needed)
    const existingReviewStatus = await ReviewStatus.findOne({
      $or: [{ reviewStatusName }, { reviewStatusCode }],
    });
    if (existingReviewStatus) {
      return res
        .status(400)
        .json({
          message: "ReviewStatus with this code or name already exists",
        });
    }
    // Create and save the new ReviewStatus
    const reviewStatus = new ReviewStatus({
      reviewStatusName,
      reviewStatusCode,
      isActive,
    });
    await reviewStatus.save();
    res.status(200).json({
      message: "ReviewStatus created successfully",
      data: reviewStatus._id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all reviewStatus
exports.getAllReviewStatus = async (req, res) => {
  try {
    const reviewStatus = await ReviewStatus.find({isActive:true});

    if (!reviewStatus) {
      return res.status(400).json({ message: "ReviewStatus is not find" });
    }
    res.status(200).json(reviewStatus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single reviewStatus by name
exports.getLeadReviewByName = async (req, res) => {
  try {
    const reviewStatus = await ReviewStatus.findOne({
      reviewStatusName: req.body.reviewStatusName,
    });

    if (!reviewStatus) {
      return res.status(400).json({ message: "ReviewStatus not found" });
    }

    res.status(200).json(reviewStatus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a reviewStatus
exports.updateReviewStatus = async (req, res) => {
  try {
    const { _id, reviewStatusName, reviewStatusCode, isActive } = req.body;

    const reviewStatus = await ReviewStatus.findByIdAndUpdate(
      _id,
      { $set: { reviewStatusName, reviewStatusCode, isActive } },
      { new: true, runValidators: true }
    );

    if (!reviewStatus) {
      return res.status(400).json({ message: "reviewStatus not found" });
    }

    res
      .status(200)
      .json({
        message: "ReviewStatus updated successfully",
        data: reviewStatus,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a ReviewStatus
exports.deleteReviewStatus = async (req, res) => {
  try {
    const { _id } = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const reviewStatus = await ReviewStatus.findByIdAndDelete(_id);

    if (!reviewStatus) {
      return res.status(400).json({ message: "reviewStatus not found" });
    }

    res.status(200).json({ message: "reviewStatus deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
