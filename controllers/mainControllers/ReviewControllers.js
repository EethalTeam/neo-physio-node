const mongoose = require("mongoose");
const Review = require("../../model/masterModels/Review");
const RedFlag = require("../../model/masterModels/Redflag");
const ReviewStatus = require("../../model/masterModels/ReviewStatus");
const Employee = require('../../model/masterModels/Physio');
const RoleBased = require('../../model/masterModels/RBAC');
const Notification = require('../../model/masterModels/Notification');
const Patient = require('../../model/masterModels/Patient');

exports.createReview = async (req, res) => {
  try {
    const {
      patientId,
      physioId,
      sessionId,          
      reviewDate,
      reviewTime,
      reviewTypeId,
      redflagId,
      feedback,
      reviewStatusId
    } = req.body;
const redFlags = redflagId
  ? [{ redFlagId: redflagId }]
  : [];

    //  Validation
    if (!patientId || !physioId || !sessionId || !reviewTypeId || !reviewStatusId) {
      return res.status(400).json({ message: "Required fields missing" });
    }
const pendingStatus = await ReviewStatus.findOne({
  reviewStatusName: "Pending",
  isActive: true,
});

if (!pendingStatus) {
  return res.status(400).json({
    message: "Pending review status not found",
  });
}

    // 🔑 CHECK EXISTING REVIEW (ONE PER SESSION)
    const existingReview = await Review.findOne({
      sessionId,
      reviewTypeId
    });

    if (existingReview) {
      existingReview.feedback = feedback;
      existingReview.redFlags = redFlags;
      existingReview.reviewDate = reviewDate;
      existingReview.reviewTime = reviewTime;

  // ensure status always exists
  existingReview.reviewStatusId =
    existingReview.reviewStatusId || pendingStatus._id;

      await existingReview.save();

      return res.status(200).json({
        message: "Review updated successfully",
        data: existingReview
      });
    }
const review = new Review({
  patientId,
  physioId,
  sessionId,
  reviewDate,
  reviewTime,
  reviewTypeId,
  redFlags,
  feedback,
  reviewStatusId: pendingStatus._id, //  IMPORTANT LINE
});


    await review.save();

    res.status(200).json({
      message: "Review created successfully",
      data: review
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllRedflags = async (req, res) => {
  try {
    const redflags = await RedFlag.find();
    res.status(200).json(redflags);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a RedFlag (optional if you want to add via API)
exports.createRedflag = async (req, res) => {
  try {
    const { redflagName, description } = req.body;
    const redflag = new RedFlag({ redflagName, description });
    await redflag.save();
    res.status(200).json({ message: "RedFlag created successfully", data: redflag });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all Review
exports.getAllReview = async (req, res) => {
  try {
   const reviews = await Review.find()
  .populate("patientId", "patientName")
  .populate("physioId", "physioName")
  .populate("reviewTypeId", "reviewTypeName")
  .populate("redFlags.redFlagId")
  .populate("reviewStatusId","reviewStatusName")

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Review by ID
exports.getReviewById = async (req, res) => {
  try {
    const { _id } = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const review = await Review.findById(_id)
      .populate("patientId", "patientName")
      .populate("physioId", "physioName")
      .populate("reviewTypeId", "reviewTypeName")
      .populate("redFlags.redFlagId")
       .populate("reviewStatusId","reviewStatusName")

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Review
exports.updateReview = async (req, res) => {
  try {
    const {
      _id,
      patientId,
      physioId,
      reviewDate,
      reviewTime,
      reviewTypeId,
      redFlags,
      feedback,
      reviewStatusId,
    } = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const review = await Review.findByIdAndUpdate(
      _id,
      {
        patientId,
        physioId,
        reviewDate,
        reviewTime,
        reviewTypeId,
        redFlags: redFlags || [],
        feedback,
        reviewStatusId,
      },
      { new: true, runValidators: true }
    );

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    // --- START NOTIFICATION LOGIC ---
    try {
      // 1. Check if the status is "Completed"
      const completedStatus = await ReviewStatus.findOne({ reviewStatusName: 'Completed' });
      
      if (completedStatus && reviewStatusId.toString() === completedStatus._id.toString()) {
        
        // 2. Find SuperAdmins and Admins
        const adminRoleId = await RoleBased.findOne({ RoleName: "Admin" });
        if (!adminRoleId) {
          res.status(400).json({ message: "Admin role not found" });
        }
        const superAdminRoleId = await RoleBased.findOne({ RoleName: "SuperAdmin" });
        if (!superAdminRoleId) {
          res.status(400).json({ message: "SuperAdmin role not found" });
        }
        
        const admins = await Employee.find({ 
          roleId: { $in: [superAdminRoleId._id, adminRoleId._id] } 
        });
        const patient = await Patient.findById(patientId);
        const patientName = patient ? patient.patientName : "the patient";
        if (admins.length > 0) {
          const io = req.app.get("socketio");

          const notificationPromises = admins.map(async (admin) => {
            const newNotification = new Notification({
              fromEmployeeId: physioId,
              toEmployeeId: admin._id,
             message: `Review completed for ${patientName}. Feedback: ${feedback || 'No feedback provided.'}`,
              type: "Review-Completed",
              status: "unseen",
              meta: {
                ReviewId: review._id,
                PatientId: patientId,
                PhysioId: physioId
              }
            });

            await newNotification.save();

            // 3. Emit via Socket.io
            if (io) {
              io.to(admin._id.toString()).emit("receiveNotification", newNotification);
            }
          });

          await Promise.all(notificationPromises);
        }
      }
    } catch (notifyErr) {
      console.error("Admin Notification failed:", notifyErr.message);
      // Fail silently to ensure the response is still sent to the user
    }
    // --- END NOTIFICATION LOGIC ---

    res.status(200).json({ message: "Review updated successfully", data: review });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Review
exports.deleteReview = async (req, res) => {
  try {
    const { _id } = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const review = await Review.findByIdAndDelete(_id);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
