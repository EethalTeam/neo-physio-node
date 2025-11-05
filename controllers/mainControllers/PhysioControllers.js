const Physio = require('../models/Physio');

exports.createPhysio = async (req, res) => {
    try {
        const newPhysio = new Physio(req.body);
        
        const savedPhysio = await newPhysio.save();
        res.status(201).json(savedPhysio);

    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Physio code already exists.' });
        }
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: error.message });
    }
};

exports.getAllPhysios = async (req, res) => {
    try {
        const page = parseInt(req.body.page) || 1;
        const limit = parseInt(req.body.limit) || 10;
        const skip = (page - 1) * limit;

        const physios = await Physio.find({ isActive: true }) 
            .populate('physioGenderId')
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        const totalPhysios = await Physio.countDocuments({ isActive: true });

        res.status(200).json({
            totalPhysios,
            totalPages: Math.ceil(totalPhysios / limit),
            currentPage: page,
            physios
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getPhysioById = async (req, res) => {
    try {
        
        const { id } = req.body; 
        if (!id) {
            return res.status(400).json({ message: 'Physio ID is required in the body.' });
        }

        const physio = await Physio.findById(id)
            .populate('physioGenderId');

        if (!physio) {
            return res.status(404).json({ message: 'Physio not found' });
        }

        res.status(200).json(physio);

    } catch (error) {
        if (error.name === 'CastError') {
             return res.status(400).json({ message: 'Invalid Physio ID' });
        }
        res.status(500).json({ message: error.message });
    }
};

exports.updatePhysio = async (req, res) => {
    try {
        
        const { _id, ...updateData } = req.body;
        
        if (!_id) {
            return res.status(400).json({ message: 'Physio ID is required in the body for updates.' });
        }

        const updatedPhysio = await Physio.findByIdAndUpdate(
            _id,
            updateData,
            { new: true, runValidators: true } 
        );

        if (!updatedPhysio) {
            return res.status(404).json({ message: 'Physio not found' });
        }

        res.status(200).json(updatedPhysio);

    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Physio code already exists.' });
        }
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: error.message });
    }
};

exports.deletePhysio = async (req, res) => {
    try {
        
        const { _id } = req.body;
        if (!id) {
            return res.status(400).json({ message: 'Physio ID is required in the body.' });
        }

        // Soft delete
        const softDeletedPhysio = await Physio.findByIdAndUpdate(
            _id,
            { isActive: false },
            { new: true }
        );

        if (!softDeletedPhysio) {
            return res.status(404).json({ message: 'Physio not found' });
        }

        res.status(200).json({ message: 'Physio deactivated successfully' });

    } catch (error) {
        if (error.name === 'CastError') {
             return res.status(400).json({ message: 'Invalid Physio ID' });
        }
        res.status(500).json({ message: error.message });
    }
};