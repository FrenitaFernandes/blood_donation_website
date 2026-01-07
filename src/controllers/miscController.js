const Contact = require('../models/Contact');

exports.submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    await Contact.create({ name, email, subject, message });
    res.status(200).json({ message: 'Thank you for contacting us! We will get back to you soon.' });
  } catch (err) {
    console.error('Error saving contact message:', err.message);
    res.status(500).json({ message: 'Error saving contact message.' });
  }
};
