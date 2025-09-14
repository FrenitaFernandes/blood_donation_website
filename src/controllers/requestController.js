const db = require('../models/db');

exports.submitRequest = (req, res) => {
    const { patient_name, required_blood_group, location, hospital_name, blood_units, urgency, contact_phone, contact_email } = req.body;
    const sql = `INSERT INTO blood_requests (patient_name, required_blood_group, location, hospital_name, blood_units, urgency, contact_phone, contact_email) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [patient_name, required_blood_group, location, hospital_name, blood_units, urgency, contact_phone, contact_email];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.send('Error saving blood request.');
        }
        res.redirect('/');
    });
};

// Controller to fetch all blood requests for inbox
exports.getInboxRequests = (req, res) => {
    const sql = 'SELECT * FROM blood_requests ORDER BY created_at DESC';
    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.send('Error fetching blood requests.');
        }
        res.render('inbox', { requests: results });
    });
};