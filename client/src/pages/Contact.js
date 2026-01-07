import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3001';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await axios.post(`${API_URL}/contact`, formData);
      setMessage('✅ Thank you for reaching out! We will contact you soon.');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setMessage('❌ Error sending message: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Get in Touch</h2>
      <p>Have questions, suggestions, or want to partner with us? We'd love to hear from you! Reach out to our team.</p>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Subject:</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Message:</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            required
          />
        </div>

        <button type="submit" disabled={loading} className="btn">
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </form>

      {message && <p className={message.includes('✅') ? 'success' : 'error'}>{message}</p>}
    </div>
  );
}

export default Contact;
