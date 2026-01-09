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

// Update request status
exports.updateRequestStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!['Pending', 'Fulfilled', 'Cancelled'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        const request = await BloodRequest.findByIdAndUpdate(
            id,
            { status },
            { new: true, runValidators: true }
        );

        if (!request) {
            return res.status(404).json({ message: 'Blood request not found' });
        }

        res.json({ message: `Request status updated to ${status}`, request });
    } catch (err) {
        console.error('Error updating request status:', err.message);
        res.status(500).json({ message: 'Error updating request status' });
    }
};

// Delete request
exports.deleteRequest = async (req, res) => {
    try {
        const { id } = req.params;

        const request = await BloodRequest.findByIdAndDelete(id);

        if (!request) {
            return res.status(404).json({ message: 'Blood request not found' });
        }

        res.json({ message: 'Blood request deleted successfully', request });
    } catch (err) {
        console.error('Error deleting request:', err.message);
        res.status(500).json({ message: 'Error deleting blood request' });
    }
};

// Get requests by status
exports.getRequestsByStatus = async (req, res) => {
    try {
        const { status } = req.query;

        const filter = {};
        if (status) {
            filter.status = status;
        }

        const requests = await BloodRequest.find(filter).sort({ createdAt: -1 });
        res.json(requests);
    } catch (err) {
        console.error('Error fetching requests:', err.message);
        res.status(500).json({ message: 'Error fetching blood requests' });
    }
};
