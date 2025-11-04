const mongoose = require('mongoose')
const Physio = require('../../model/masterModels/PhysioCategory')

 

// Create a new PhysioCategory
exports.createPhysioCategory = async (req, res) => {
    try {
        const { physioCateName, physioCateCode, isActive } = req.body;

        // Check for duplicates (if needed)
        const existingPhysio = await Physio.findOne({
            $or: [
                { physioCateName },
                { physioCateCode }
            ]
        });
        if (existingPhysio) {
            return res.status(400).json({ message: 'PhysioCategory with this code or name already exists' });
        }
        // Create and save the new PhysioCategory
        const PhysioCate = new Physio({physioCateName, physioCateCode, isActive   });
        await PhysioCate.save();

        res.status(200).json({
            message: 'PhysioCategory created successfully',
            data: PhysioCate._id
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Get all PhysioCategory
exports.getAllPhysioCategory = async (req, res) => {
    try {
        //option 1 aggregate method
        const PhysioCate = await Physio.aggregate([
            {
                $project: {
                    _id: 0,
                    PhysioCateIDPK: '$_id',
                     physioCateName: 1,
                     physioCateCode: 1,
                    isActive: 1
                }
            }
        ])
        res.status(200).json(PhysioCate);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




// Get a single PhysioCategory by name
exports.getPhysioCategoryByName = async (req, res) => {
    try {
        const  PhysioCate = await Physio.findOne({ physioCateName: req.body.physioCateName })

        if (!PhysioCate) {
            return res.status(400).json({ message: 'PhysioCategory not found' });
        }

        res.status(200).json(PhysioCate);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Update a physioCategory
exports.updatephysioCategory = async (req, res) => {
    try {
        const { PhysioCateIDPK, physioCateName, physioCateCode, isActive  } = req.body

        const PhysioCate = await Physio.findByIdAndUpdate(
            PhysioCateIDPK,
            { $set: {physioCateName, physioCateCode, isActive  } },
            { new: true, runValidators: true }
        );

        if (!PhysioCate) {
            return res.status(400).json({ message: 'PhysioCategroy not found' });
        }

        res.status(200).json({ message: 'PhysioCategroy updated successfully', data:PhysioCate  });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Delete a PhysioCate
exports.deletePhysioCategory = async (req, res) => {
    try {
        const { _id } = req.body;

        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(400).json({ message: 'Invalid ID' });
        }

        const PhysioCate = await Physio.findByIdAndDelete(_id);

        if (!PhysioCate) {
            return res.status(400).json({ message: 'PhysioCategroy not found' });
        }

        res.status(200).json({ message: 'PhysioCategroy deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
 