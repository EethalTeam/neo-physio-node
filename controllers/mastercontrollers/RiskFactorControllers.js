const mongoose = require('mongoose');
const RiskFactor = require('../../model/masterModels/RiskFactor')

// Create a new RiskFactorCode
exports.createRiskFactor = async (req, res) => {
    try {
        const { RiskFactorName, RiskFactorCode, isActive } = req.body;

        // Check for duplicates (if needed)
        const existingRiskFactor = await RiskFactor.findOne({ 
            $or: [
                { RiskFactorName }, 
                { RiskFactorCode }
            ] 
        });
        if (existingRiskFactor) {
            return res.status(400).json({ message: 'RiskFactor with this code or name already exists' });
        }
        // Create and save the riskFactor
        const riskFactor = new RiskFactor({ RiskFactorName, RiskFactorCode , isActive });
        await riskFactor.save();

        res.status(200).json({ 
            message: 'RiskFactor created successfully', 
            data: riskFactor._id 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Get all RiskFactor
exports.getAllRiskFactor = async (req, res) => {
    try {
        //option 1 aggregate method
      
        const riskFactor= await RiskFactor.aggregate([
        {
            $project:{
                _id:0,
                RiskFactorIDPK:'$_id',
                RiskFactorName:1,
                RiskFactorCode:1,
                isActive:1
            }
        }
    ])
        res.status(200).json(riskFactor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




// Get a single RiskFactor by name
exports.getByRiskFactorName = async (req, res) => {
    try {
        const riskFactor = await RiskFactor.findOne({ RiskFactorName: req.body.name })
    
        if (!riskFactor) {
            return res.status(400).json({ message: 'riskFactor not found' });
        }

        res.status(200).json(riskFactor);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Update a RiskFactor
exports.updateRiskFactor= async (req, res) => {
    try {
        const {RiskFactorIDPK,RiskFactorName,RiskFactorCode,isActive} = {...req.body};
        const riskFactor = await RiskFactor.findByIdAndUpdate(
            RiskFactorIDPK,
            { $set:{RiskFactorName,RiskFactorCode,isActive}},
            { new: true, runValidators: true }
        );

        if (!riskFactor) {
            return res.status(400).json({ message: 'riskFactor not found' });
        }

        res.status(200).json({ message: 'riskFactor updated successfully', data:riskFactor });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Delete a RiskFactor
exports.deleteRiskFactor = async (req, res) => {
    try {
        const { _id } = req.body;
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(400).json({ message: 'Invalid ID' });
        }
        
        const riskFactor = await RiskFactor.findByIdAndDelete(_id);

        if (!riskFactor) {
            return res.status(400).json({ message: 'riskFactor not found' });
        }

        res.status(200).json({ message: 'riskFactor deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};