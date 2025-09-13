const db = require('../models/db');

exports.submitRequest = (req, res) => {
    const { patient_name, required_blood_group, location, urgency, contact_phone, contact_email } = req.body;
    const sql = `INSERT INTO blood_requests (patient_name, required_blood_group, location, urgency, contact_phone, contact_email) VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [patient_name, required_blood_group, location, urgency, contact_phone, contact_email];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.send('Error saving blood request.');
        }
        res.redirect('/');
    });
};