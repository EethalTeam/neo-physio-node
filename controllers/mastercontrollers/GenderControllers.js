const mongoose = require('mongoose');
const Gender = require('../../model/masterModels/Gender')

// Create a new Gender
exports.createGender = async (req, res) => {
    try {
        const { genderName, genderCode, isActive } = req.body;

        // Check for duplicates (if needed)
        const existingGender = await Gender.findOne({
            $or: [
                { genderName },
                { genderCode }
            ]
        });
        if (existingGender) {
            return res.status(400).json({ message: 'gender with this code or name already exists' });
        }
        // Create and save the new gender
        const gender = new Gender({genderName, genderCode, isActive  });
        await gender.save();

        res.status(200).json({
            message: 'gender created successfully',
            data: gender._id
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Get all Gender
exports.getAllGender = async (req, res) => {
    try {
        //option 1 aggregate method
        const gender = await Gender.aggregate([
            {
                $project: {
                    _id: 0,
                    GenderIDPK: '$_id',
                    genderName: 1,
                    genderCode: 1,
                    isActive: 1
                }
            }
        ])
        res.status(200).json(gender);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




// Get a single gender by name
exports.getGenderByName = async (req, res) => {
    try {
        const  gender = await Gender.findOne({ genderName: req.body.genderName })

        if (!gender) {
            return res.status(400).json({ message: 'gender not found' });
        }

        res.status(200).json(gender);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Update a Gender
exports.updateGender = async (req, res) => {
    try {
        const { GenderIDPK, genderName, genderCode, isActive } = req.body

        const gender = await Gender.findByIdAndUpdate(
            GenderIDPK,
            { $set: { genderName, genderCode, isActive } },
            { new: true, runValidators: true }
        );

        if (!gender) {
            return res.status(400).json({ message: 'Gender not found' });
        }

        res.status(200).json({ message: 'Gender updated successfully', data: gender });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Delete a Gender
exports.deleteGender = async (req, res) => {
    try {
        const { _id } = req.body;

        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(400).json({ message: 'Invalid ID' });
        }

        const gender = await Gender.findByIdAndDelete(_id);

        if (!gender) {
            return res.status(400).json({ message: 'gender not found' });
        }

        res.status(200).json({ message: 'gender deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};