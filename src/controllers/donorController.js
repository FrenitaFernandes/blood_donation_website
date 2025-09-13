const db = require('../models/db');

exports.registerDonor = (req, res) => {
    const { name, age, gender, blood_group, phone, email, city, is_available } = req.body;
    const sql = `INSERT INTO donors (name, age, gender, blood_group, contact_phone, contact_email, city, is_available) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [name, age, gender, blood_group, phone, email, city, is_available === 'on' ? 1 : 0];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.send('Error saving donor information.');
        }
        // 👇 After registration, show the donor list
        res.redirect('/donors');
    });
};

// ✅ Show all donors
exports.listDonors = (req, res) => {
    db.query("SELECT * FROM donors WHERE is_available = TRUE", (err, results) => {
        if (err) {
            console.error(err);
            return res.send("Error fetching donors.");
        }
        res.render("donors", { donors: results, blood_group: null, city: null });
    });
};

// ✅ Find donors with filters
exports.findDonors = (req, res) => {
    const { blood_group, city } = req.query;
    let sql = 'SELECT * FROM donors WHERE is_available = TRUE';
    const values = [];

    if (blood_group) {
        sql += ' AND blood_group = ?';
        values.push(blood_group);
    }
    if (city) {
        sql += ' AND city = ?';
        values.push(city);
    }

    db.query(sql, values, (err, results) => {
        if (err) {
            console.error(err);
            return res.send('Error fetching donors.');
        }
        res.render('donors', { donors: results, blood_group, city });
    });
};
