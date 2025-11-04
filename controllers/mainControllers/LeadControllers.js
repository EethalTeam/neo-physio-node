const Lead = require('../models/Lead');
const fs = require('fs');
const path = require('path');

exports.createLead = async (req, res) => {
    try {
        const {
            leadName,
            leadCode,
            leadAge,
            leadGenderId,
            physioCategoryId,
            leadContactNo,
            leadSourceId,
            leadMedicalHistory,
            leadAddress,
            isQualified
        } = req.body;

        let leadDocuments = [];

        if (req.files) {
            leadDocuments = req.files.map(file => {
                return {
                    fileName: file.originalname,
                    fileUrl: `/uploads/leads/${file.filename}`, 
                    fileType: file.mimetype
                };
            });
        }

        const newLead = new Lead({
            leadName,
            leadCode,
            leadAge,
            leadGenderId,
            physioCategoryId,
            leadContactNo,
            leadSourceId,
            leadMedicalHistory,
            leadAddress,
            isQualified: isQualified || false,
            leadDocuments 
        });

        const savedLead = await newLead.save();
        res.status(201).json(savedLead);

    } catch (error) {
        if (error.code === 11000) {
             return res.status(400).json({ message: 'Lead code already exists.' });
        }
        res.status(500).json({ message: error.message });
    }
};

exports.getAllLeads = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const leads = await Lead.find()
            .populate('leadGenderId leadSourceId physioCategoryId') 
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 }); 

        const totalLeads = await Lead.countDocuments();

        res.status(200).json({
            totalLeads,
            totalPages: Math.ceil(totalLeads / limit),
            currentPage: page,
            leads
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getLeadById = async (req, res) => {
    try {
        const lead = await Lead.findById(req.params.id)
            .populate('leadGenderId leadSourceId physioCategoryId');

        if (!lead) {
            return res.status(404).json({ message: 'Lead not found' });
        }

        res.status(200).json(lead);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateLead = async (req, res) => {
    try {
        const leadId = req.params.id;
        const updateData = req.body;

        const lead = await Lead.findById(leadId);

        if (!lead) {
            return res.status(404).json({ message: 'Lead not found' });
        }

        if (req.files && req.files.length > 0) {
            const newDocuments = req.files.map(file => ({
                fileName: file.originalname,
                fileUrl: `/uploads/leads/${file.filename}`,
                fileType: file.mimetype
            }));
            
            lead.leadDocuments.push(...newDocuments); 
        }

        Object.assign(lead, updateData);
        
        if (updateData.isQualified !== undefined) {
             lead.isQualified = updateData.isQualified === 'true' || updateData.isQualified === true;
        }

        const updatedLead = await lead.save();

        res.status(200).json(updatedLead);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteLead = async (req, res) => {
    try {
        const lead = await Lead.findById(req.params.id);

        if (!lead) {
            return res.status(44).json({ message: 'Lead not found' });
        }

        if (lead.leadDocuments && lead.leadDocuments.length > 0) {
            lead.leadDocuments.forEach(doc => {
                // 'doc.fileUrl' is like '/uploads/leads/filename.pdf'
                const filePath = path.join(__dirname, '..', doc.fileUrl); 
                
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error(`Failed to delete file: ${filePath}`, err);
                    }
                });
            });
        }

        await lead.deleteOne(); 

        res.status(200).json({ message: 'Lead deleted successfully' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};