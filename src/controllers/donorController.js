const Donor = require('../models/Donor');

exports.registerDonor = async (req, res) => {
    try {
        const { name, age, gender, blood_group, contact_phone, contact_email, city } = req.body;
        const donor = await Donor.create({
            name,
            age,
            gender,
            blood_group,
            contact_phone,
            contact_email,
            city,
            is_available: true,
        });
        res.status(201).json({ message: 'Donor registered successfully!', id: donor._id });
    } catch (err) {
        console.error('Error registering donor:', err.message);
        res.status(500).json({ message: 'Error saving donor information.' });
    }
};

exports.listDonors = async (req, res) => {
    try {
        const donors = await Donor.find({ is_available: true }).sort({ createdAt: -1 });
        res.json(donors);
    } catch (err) {
        console.error('Error fetching donors:', err.message);
        res.status(500).json({ message: 'Error fetching donors.' });
    }
};

exports.findDonors = async (req, res) => {
    try {
        const { blood_group, city } = req.query;
        const filter = { is_available: true };

        // Normalize blood_group and allow 'Any' or 'any' to skip filtering
        if (blood_group && blood_group.toString().trim().toLowerCase() !== 'any') {
            filter.blood_group = blood_group;
        }
        if (city) {
            filter.city = new RegExp(city, 'i');
        }

        const donors = await Donor.find(filter).sort({ createdAt: -1 });
        res.json(donors);
    } catch (err) {
        console.error('Error finding donors:', err.message);
        res.status(500).json({ message: 'Error fetching donors.' });
    }
};

// Get all donors (including unavailable)
exports.getAllDonors = async (req, res) => {
    try {
        const donors = await Donor.find({}).sort({ createdAt: -1 });
        res.json(donors);
    } catch (err) {
        console.error('Error fetching all donors:', err.message);
        res.status(500).json({ message: 'Error fetching donors.' });
    }
};

// Update donor availability
exports.updateDonorAvailability = async (req, res) => {
    try {
        const { id } = req.params;
        const { is_available } = req.body;

        if (typeof is_available !== 'boolean') {
            return res.status(400).json({ message: 'is_available must be a boolean' });
        }

        const donor = await Donor.findByIdAndUpdate(
            id,
            { is_available },
            { new: true, runValidators: true }
        );

        if (!donor) {
            return res.status(404).json({ message: 'Donor not found' });
        }

        res.json({ message: `Donor availability updated to ${is_available ? 'Available' : 'Unavailable'}`, donor });
    } catch (err) {
        console.error('Error updating donor availability:', err.message);
        res.status(500).json({ message: 'Error updating donor availability' });
    }
};

// Delete donor profile
exports.deleteDonor = async (req, res) => {
    try {
        const { id } = req.params;

        const donor = await Donor.findByIdAndDelete(id);

        if (!donor) {
            return res.status(404).json({ message: 'Donor not found' });
        }

        res.json({ message: 'Donor profile deleted successfully', donor });
    } catch (err) {
        console.error('Error deleting donor:', err.message);
        res.status(500).json({ message: 'Error deleting donor profile' });
    }
};
