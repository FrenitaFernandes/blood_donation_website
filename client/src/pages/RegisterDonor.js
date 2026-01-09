import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config/api';

function RegisterDonor() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'Male',
    blood_group: 'O+',
    contact_phone: '',
    contact_email: '',
    city: ''
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
      await axios.post(`${API_URL}/donors/register`, formData);
      setMessage(' Thank you! You have been registered as a blood donor. Your contribution will save lives!');
      setFormData({
        name: '',
        age: '',
        gender: 'Male',
        blood_group: 'O+',
        contact_phone: '',
        contact_email: '',
        city: ''
      });
    } catch (error) {
      setMessage('❌ Error: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Become a Blood Donor</h2>
      <p>Join our lifesaver community and help save lives. Fill out the form below to register.</p>
      
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Full Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="form-group">
            <label>Age:</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Must be 18 or older"
              min="18"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Gender:</label>
            <select name="gender" value={formData.gender} onChange={handleChange}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Blood Group:</label>
            <select name="blood_group" value={formData.blood_group} onChange={handleChange}>
              <option value="O+">O+ </option>
              <option value="O-">O- </option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Phone Number:</label>
            <input
              type="tel"
              name="contact_phone"
              value={formData.contact_phone}
              onChange={handleChange}
              placeholder="Your contact number"
              required
            />
          </div>

          <div className="form-group">
            <label>Email Address:</label>
            <input
              type="email"
              name="contact_email"
              value={formData.contact_email}
              onChange={handleChange}
              placeholder="Your email address"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>City:</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Your city"
            required
          />
        </div>

        <button type="submit" disabled={loading} className="btn">
          {loading ? ' Registering...' : ' Register as Donor'}
        </button>
      </form>

      {message && <p className={message.includes('') ? 'success' : 'error'}>{message}</p>}
    </div>
  );
}

export default RegisterDonor;
