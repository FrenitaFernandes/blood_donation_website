const BloodRequest = require('../models/BloodRequest');

exports.submitRequest = async (req, res) => {
    try {
        const { patient_name, required_blood_group, location, hospital_name, blood_units, urgency, contact_phone, contact_email } = req.body;
        const request = await BloodRequest.create({
            patient_name,
            required_blood_group,
            location,
            hospital_name,
            blood_units: blood_units || 1,
            urgency: urgency || 'Medium',
            contact_phone,
            contact_email,
        });
        res.status(201).json({ message: 'Blood request created successfully!', id: request._id });
    } catch (err) {
        console.error('Error submitting request:', err.message);
        res.status(500).json({ message: 'Error saving blood request.' });
    }
};

exports.getInboxRequests = async (req, res) => {
    try {
        const requests = await BloodRequest.find({}).sort({ createdAt: -1 });
        res.json(requests);
    } catch (err) {
        console.error('Error fetching requests:', err.message);
        res.status(500).json({ message: 'Error fetching blood requests.' });
    }
};
