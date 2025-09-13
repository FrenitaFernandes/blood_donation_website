/*const express = require('express');
const router = express.Router();
const miscController = require('../controllers/miscController');

router.get('/', miscController.homePage);
router.get('/about', miscController.aboutPage);
router.get('/register', miscController.registerPage);
router.get('/find', miscController.findPage);
router.get('/request', miscController.requestPage);
router.get('/contact', miscController.contactPage);

module.exports = router; 
*/

const express = require('express');
const router = express.Router();

// Home page route
router.get('/', (req, res) => {
    // This will render the index.ejs file in the views directory
    res.render('index');
});

module.exports = router;