exports.homePage = (req, res) => {
    res.render('home');
};

exports.aboutPage = (req, res) => {
    res.render('about');
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
    res.render('contact');
};