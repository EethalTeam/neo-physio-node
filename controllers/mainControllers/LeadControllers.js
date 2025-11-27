const Lead = require('../../model/masterModels/Leads');
const Patient = require('../../model/masterModels/Patient')
const LeadStatus = require('../../model/masterModels/Leadstatus')
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose')

exports.createLead = async (req, res) => {
    try {
        const {
            leadName,
            leadAge,
            leadGenderId,
            physioCategoryId,
            leadContactNo,
            leadSourceId,
            leadMedicalHistory,
            leadAddress,
            isQualified,
            ReferenceId,
            leadSourceName,
            sourceName,
            LeadStatusId,
            leadStatusName
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

        const lastLead = await Lead.findOne({}, {}, { sort: { 'createdAt': -1 } });
        let nextLeadNumber = 1;

        if (lastLead && lastLead.leadCode) {
            const lastNumber = parseInt(lastLead.leadCode.replace('LEAD', ''));
            nextLeadNumber = isNaN(lastNumber) ? 1 : lastNumber + 1;
        }

        const leadCode = `LEAD${String(nextLeadNumber).padStart(3, '0')}`;
        let LeadData = {
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
            leadDocuments,
            leadSourceName,
            sourceName,
            LeadStatusId,
            leadStatusName
        }
        if (ReferenceId) {
            LeadData.ReferenceId = ReferenceId
        }
        const newLead = new Lead(LeadData);

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
            .populate('leadGenderId leadSourceId physioCategoryId ReferenceId LeadStatusId')
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
            .populate('leadGenderId leadSourceId physioCategoryId ReferenceId LeadStatusId');

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
        const { leadId,
            leadName,
            leadCode,
            leadAge,
            leadGenderId,
            physioCategoryId,
            leadContactNo,
            leadSourceId,
            leadMedicalHistory,
            leadAddress,
            isQualified,
            leadDocuments,
            ReferenceId,
            sourceName,
            leadSourceName,
            LeadStatusId,
            leadStatusName


        } = req.body;

        let LeadData = {
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
            leadDocuments,
            leadSourceName,
            sourceName,
            LeadStatusId,
            leadStatusName
        }
        if (ReferenceId) {
            LeadData.ReferenceId = ReferenceId
        }
        const lead = await Lead.findByIdAndUpdate(
            leadId,
            {
                $set:
                    LeadData

            },
            { new: true, runValidators: true });

        if (!lead) {
            return res.status(404).json({ message: 'Lead not able to update' });
        }

        if (req.files && req.files.length > 0) {
            const newDocuments = req.files.map(file => ({
                fileName: file.originalname,
                fileUrl: `/uploads/leads/${file.filename}`,
                fileType: file.mimetype
            }));

            lead.leadDocuments.push(...newDocuments);
        }
        await lead.save();
        res.status(200).json(lead);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.QualifyLead = async (req, res) => {
    try {
        const {
            _id,
            leadName,
            leadAge,
            leadGenderId,
            leadContactNo,
            leadSourceId,
            leadMedicalHistory,
            leadAddress,
            ReferenceId,
            ConsultationDate
        } = req.body

        const lastPatient = await Patient.findOne({}, {}, { sort: { 'createdAt': -1 } });
        let nextPatientNumber = 1;

        if (lastPatient && lastPatient.patientCode) {
            const lastNumber = parseInt(lastPatient.patientCode.replace('PAT', ''));
            nextPatientNumber = isNaN(lastNumber) ? 1 : lastNumber + 1;
        }

        const patientCode = `PAT${String(nextPatientNumber).padStart(6, '0')}`;

        const patients = new Patient({
            patientName: leadName,
            patientCode: patientCode,
            isActive: true,
            consultationDate: ConsultationDate,
            patientAge: leadAge,
            otherMedCon: leadMedicalHistory,
            patientGenderId: leadGenderId._id,
            patientNumber: leadContactNo,
            patientAddress: leadAddress
        });
        if (ReferenceId) {
            patients.ReferenceId = new mongoose.Types.ObjectId(ReferenceId._id)
        }
        await patients.save();
        if (patients) {
            const Leadstatus = await LeadStatus.findOne({ leadStatusName: 'Qualified' })
            if (Leadstatus) {
                const lead = await Lead.findByIdAndUpdate(
                    _id,
                    {
                        $set:
                            { LeadStatusId: new mongoose.Types.ObjectId(Leadstatus._id) }

                    },
                    { new: true, runValidators: true });
                if (!lead) {
                    return res.status(404).json({ message: 'Lead not able to update' });
                }
            }else{
                res.status(500).json({
                message: 'Lead status not found'
            });
            }

            res.status(200).json({
                message: 'Lead qualified and Patient created successfully',
                data: patients._id
            });
        } else {
            res.status(500).json({
                message: 'Lead qualify failed'
            });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.deleteLead = async (req, res) => {
    try {
        const { _id } = req.body;

        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(400).json({ message: 'Invalid ID' });
        }


        const lead = await Lead.findByIdAndDelete(_id);

        if (!lead) {
            return res.status(44).json({ message: 'Lead not found' });
        }

        // if (lead.leadDocuments && lead.leadDocuments.length > 0) {
        //     lead.leadDocuments.forEach(doc => {
        //         // 'doc.fileUrl' is like '/uploads/leads/filename.pdf'
        //         const filePath = path.join(__dirname, '..', doc.fileUrl);

        //         fs.unlink(filePath, (err) => {
        //             if (err) {
        //                 console.error(`Failed to delete file: ${filePath}`, err);
        //             }
        //         });
        //     });
        // }

        // await lead.deleteOne();

        res.status(200).json({ message: 'Lead deleted successfully' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};