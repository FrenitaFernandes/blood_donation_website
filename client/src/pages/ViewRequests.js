import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3001';

function ViewRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/request/inbox`);
      setRequests(response.data);
    } catch (error) {
      setMessage('❌ Error fetching requests: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const getUrgencyColor = (urgency) => {
    switch(urgency) {
      case 'Critical': return '#d32f2f';
      case 'High': return '#f57c00';
      case 'Medium': return '#fbc02d';
      case 'Low': return '#388e3c';
      default: return '#666';
    }
  };

  return (
    <div className="requests-container">
      <h2>Blood Requests</h2>
      {message && <p className="error">{message}</p>}
      
      {loading ? (
        <p>Loading requests...</p>
      ) : requests.length === 0 ? (
        <p>No blood requests at the moment.</p>
      ) : (
        <div className="requests-list">
          {requests.map(req => (
            <div key={req._id} className="request-card">
              <div className="request-header">
                <h3>{req.patient_name}</h3>
                <span className="urgency-badge" style={{ backgroundColor: getUrgencyColor(req.urgency) }}>
                  {req.urgency}
                </span>
              </div>
              <p><strong>Blood Group:</strong> {req.required_blood_group}</p>
              <p><strong>Units Needed:</strong> {req.blood_units}</p>
              <p><strong>Hospital:</strong> {req.hospital_name}</p>
              <p><strong>Location:</strong> {req.location}</p>
              <p><strong>Phone:</strong> {req.contact_phone}</p>
              <p><strong>Email:</strong> {req.contact_email}</p>
              <p><strong>Status:</strong> {req.status}</p>
              <p><small>Created: {new Date(req.created_at).toLocaleDateString()}</small></p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ViewRequests;
