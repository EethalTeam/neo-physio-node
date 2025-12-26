const mongoose = require('mongoose');
const ReviewType = require('../../model/masterModels/ReviewType');

// Create a new Review Type
exports.createReviewType = async (req, res) => {
  try {
    const { reviewTypeName ,reviewTypeCode,isActive } = req.body;
    const reviewType = new ReviewType({ reviewTypeName,reviewTypeCode,isActive });
    await reviewType.save();        
    res.status(200).json({
      message: 'Review Type created successfully',
      data: reviewType,
    });
  }
    catch (error) {
    res.status(500).json({ message: error.message });
    }
};

// Get all Review Types
exports.getAllReviewTypes = async (req, res) => {
  try {
    const reviewTypes = await ReviewType.find();
    res.status(200).json(reviewTypes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Review Type by ID
exports.getReviewTypeById = async (req, res) => {
  try {
    const { _id } = req.body;
    const reviewType = await ReviewType.findById(_id);

    if (!reviewType) {
      return res.status(404).json({ message: 'Review Type not found' });
    }       
    res.status(200).json(reviewType);
    } catch (error) {   
    res.status(500).json({ message: error.message });
    }
};

exports.updateReviewType = async (req, res) => {
  try {
    const { _id, reviewTypeName, reviewTypeCode, isActive } = req.body;

    if (!_id) {
      return res.status(400).json({ message: 'Review Type ID is required' });
    }

    const updateData = {};
    if (reviewTypeName !== undefined) updateData.reviewTypeName = reviewTypeName;
    if (reviewTypeCode !== undefined) updateData.reviewTypeCode = reviewTypeCode;
    if (isActive !== undefined) updateData.isActive = isActive;

    const reviewType = await ReviewType.findByIdAndUpdate(_id, updateData, { new: true });

    if (!reviewType) {
      return res.status(404).json({ message: 'Review Type not found' });
    }

    res.status(200).json({
      message: 'Review Type updated successfully',
      data: reviewType,
    });
  } catch (error) {
    console.error('Error updating review type:', error);
    res.status(500).json({ message: 'Server error occurred' });
  }
};

// Delete Review Type
exports.deleteReviewType = async (req, res) => {
  try {
    const { _id } = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const reviewType = await ReviewType.findByIdAndDelete(_id);

    if (!reviewType) {
      return res.status(404).json({ message: "Review Type not found" });
    }

    res.status(200).json({ message: "Review Type deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 