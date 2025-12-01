const mongoose = require('mongoose');
const Review = require('../../model/masterModels/Review')

// Create a new Review
exports.createReview = async (req, res) => {
    try {
        const { patientId, physioId, ReviewDate ,ReviewTime } = req.body;
        // Create and save the Review
        const review = new Review({patientId, physioId, ReviewDate ,ReviewTime});
        await review.save();

        res.status(200).json({ 
            message: 'Review created successfully', 
            data: review._id 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Get all Review
exports.getAllReview = async (req, res) => {
    try {
       const review = await Review.find().populate('patientId','patientName').populate('physioId','physioName')
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




// Get a single Review by id
exports.getReviewById = async (req, res) => {
    try {
        const {id} = req.body
        const review = await Review.findOne({ _id:id})
    
        if (!review) {
            return res.status(400).json({ message: 'review not found' });
        }

        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Update a Review
exports.updateReview= async (req, res) => {
    try {
        const {_id,patientId, physioId, ReviewDate ,ReviewTime } = {...req.body};
        const review = await Review.findByIdAndUpdate(
            _id,
            { $set:{patientId, physioId, ReviewDate ,ReviewTime }},
            { new: true, runValidators: true }
        );

        if (!review) {
            return res.status(400).json({ message: 'Review not found' });
        }

        res.status(200).json({ message: 'Review updated successfully', data: review });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Delete a Review
exports.deleteReview = async (req, res) => {
    try {
        console.log(req,"req.body")
        const { _id } = req.body;
        console.log(_id,"id")
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(400).json({ message: 'Invalid ID' });
        }
        
        const review = await Review.findByIdAndDelete(_id);

        if (!review) {
            return res.status(400).json({ message: 'Review not found' });
        }

        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};