const mongoose = require('mongoose')
const Leads = require('../../model/masterModels/Leads')
const Patients = require('../../model/masterModels/Patient')
const Physio = require('../../model/masterModels/Physio')
const Session = require('../../model/masterModels/Session')


exports.getAllDashBoard = async (req, res) => {
    try {
        let lead = await Leads.find()
        let patient = await Patients.find()
        let physio = await Physio.find({ isActive: true })
        let session = await Session.find()
        let sessionCompleted = await Session.find({
            sessionToTime: { $ne: null }
        });

        let filter = {
            lead: lead.length,
            patient: patient.length,
            physio: physio.length,
            session: session.length,
            sessionCompleted: sessionCompleted.length
        }

        if (!filter) {
            res.status(400).json({ message: "Error from backend Dashboard getAllDash" })
        }
        res.status(200).json(filter)
    } catch (error) {

        res.status(500).json({ message: error.message });

    }
}