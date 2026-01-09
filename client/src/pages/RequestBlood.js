import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config/api';

function RequestBlood() {
  const [formData, setFormData] = useState({
    patient_name: '',
    required_blood_group: 'O+',
    location: '',
    hospital_name: '',
    blood_units: 1,
    urgency: 'Medium',
    contact_phone: '',
    contact_email: ''
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'blood_units' ? parseInt(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await axios.post(`${API_URL}/request/create`, formData);
      setMessage(' Your blood request has been posted! Our donors will see it and respond.');
      setFormData({
        patient_name: '',
        required_blood_group: 'O+',
        location: '',
        hospital_name: '',
        blood_units: 1,
        urgency: 'Medium',
        contact_phone: '',
        contact_email: ''
      });
    } catch (error) {
      setMessage('❌ Error: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Request Blood</h2>
      <p>Post your urgent blood request and reach our network of donors immediately.</p>
      
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Patient Name:</label>
            <input
              type="text"
              name="patient_name"
              value={formData.patient_name}
              onChange={handleChange}
              placeholder="Full name of the patient"
              required
            />
          </div>

          <div className="form-group">
            <label>Blood Group Required:</label>
            <select name="required_blood_group" value={formData.required_blood_group} onChange={handleChange}>
              <option value="O+">O+ </option>
              <option value="O-">O-</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+ (Universal Recipient)</option>
              <option value="AB-">AB-</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Number of Units Needed:</label>
            <input
              type="number"
              name="blood_units"
              value={formData.blood_units}
              onChange={handleChange}
              min="1"
              max="10"
              required
            />
          </div>

          <div className="form-group">
            <label>Urgency Level:</label>
            <select name="urgency" value={formData.urgency} onChange={handleChange}>
              <option value="Low">Low - Planned Surgery</option>
              <option value="Medium">Medium - Soon Needed</option>
              <option value="High">High - Urgent</option>
              <option value="Critical">Critical - Life-Threatening</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Location/City:</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="City or area name"
              required
            />
          </div>

          <div className="form-group">
            <label>Hospital Name:</label>
            <input
              type="text"
              name="hospital_name"
              value={formData.hospital_name}
              onChange={handleChange}
              placeholder="Name of the hospital"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Contact Phone:</label>
            <input
              type="tel"
              name="contact_phone"
              value={formData.contact_phone}
              onChange={handleChange}
              placeholder="Emergency contact number"
              required
            />
          </div>

          <div className="form-group">
            <label>Contact Email:</label>
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

        <button type="submit" disabled={loading} className="btn">
          {loading ? 'Posting Request...' : ' Post Blood Request'}
        </button>
      </form>

      {message && <p className={message.includes(' ') ? 'success' : 'error'}>{message}</p>}
    </div>
  );
}

export default RequestBlood;
