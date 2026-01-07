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

        if (blood_group && blood_group !== 'any') {
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
