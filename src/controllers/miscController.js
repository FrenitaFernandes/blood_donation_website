exports.homePage = (req, res) => {
    res.render('home');
};


const db = require('../models/db');

exports.aboutPage = (req, res) => {
    db.query('SELECT COUNT(*) AS donorCount FROM donors', (err, donorResult) => {
        if (err) {
            console.error(err);
            return res.render('about', { donorCount: 0 });
        }
        // You can add more queries for donations/lives touched if you track them
        res.render('about', { donorCount: donorResult[0].donorCount });
    });
};

exports.registerPage = (req, res) => {
    res.render('register');
};

exports.findPage = (req, res) => {
    res.render('find');
};

exports.requestPage = (req, res) => {
    res.render('request');
};

exports.contactPage = (req, res) => {
    db.query('SELECT COUNT(*) AS donorCount FROM donors', (err, donorResult) => {
        if (err) {
            console.error(err);
            return res.render('contact', { donorCount: 0 });
        }
        res.render('contact', { donorCount: donorResult[0].donorCount });
    });
};