import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../config/api';

function ViewRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

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

  const getStatusColor = (status) => {
    switch(status) {
      case 'Fulfilled': return '#388e3c';
      case 'Pending': return '#fbc02d';
      case 'Cancelled': return '#d32f2f';
      default: return '#666';
    }
  };

  const formatDateTime = (value) => {
    if (!value) return 'N/A';
    const d = new Date(value);
    return isNaN(d.getTime()) ? 'N/A' : d.toLocaleString();
  };

  return (
    <div className="requests-container">
      <h2>Blood Requests</h2>
      {message && <p className="error">{message}</p>}
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <button 
          onClick={() => setFilterStatus('')}
          style={{
            padding: '8px 16px',
            background: filterStatus === '' ? '#c41e3a' : 'white',
            color: filterStatus === '' ? 'white' : '#666',
            border: `2px solid ${filterStatus === '' ? '#c41e3a' : '#ddd'}`,
            borderRadius: '20px',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          All ({requests.length})
        </button>
        <button 
          onClick={() => setFilterStatus('Pending')}
          style={{
            padding: '8px 16px',
            background: filterStatus === 'Pending' ? '#fbc02d' : 'white',
            color: filterStatus === 'Pending' ? '#333' : '#666',
            border: `2px solid ${filterStatus === 'Pending' ? '#fbc02d' : '#ddd'}`,
            borderRadius: '20px',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          Pending ({requests.filter(r => r.status === 'Pending').length})
        </button>
        <button 
          onClick={() => setFilterStatus('Fulfilled')}
          style={{
            padding: '8px 16px',
            background: filterStatus === 'Fulfilled' ? '#388e3c' : 'white',
            color: filterStatus === 'Fulfilled' ? 'white' : '#666',
            border: `2px solid ${filterStatus === 'Fulfilled' ? '#388e3c' : '#ddd'}`,
            borderRadius: '20px',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          Fulfilled ({requests.filter(r => r.status === 'Fulfilled').length})
        </button>
        <button 
          onClick={() => setFilterStatus('Cancelled')}
          style={{
            padding: '8px 16px',
            background: filterStatus === 'Cancelled' ? '#d32f2f' : 'white',
            color: filterStatus === 'Cancelled' ? 'white' : '#666',
            border: `2px solid ${filterStatus === 'Cancelled' ? '#d32f2f' : '#ddd'}`,
            borderRadius: '20px',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          Cancelled ({requests.filter(r => r.status === 'Cancelled').length})
        </button>
      </div>
      
      {loading ? (
        <p>Loading requests...</p>
      ) : requests.length === 0 ? (
        <p>No blood requests at the moment.</p>
      ) : (
        <div className="requests-list">
          {requests.filter(r => filterStatus ? r.status === filterStatus : true).map(req => (
            <div key={req._id} className="request-card">
              <div className="request-header">
                <h3>{req.patient_name}</h3>
                <div>
                  <span className="status-badge" style={{ backgroundColor: getStatusColor(req.status || 'Pending'), padding: '6px 12px', borderRadius: '20px', color: 'white', fontWeight: '600', marginRight: '8px', fontSize: '0.85rem' }}>
                    {req.status || 'Pending'}
                  </span>
                  <span className="urgency-badge" style={{ backgroundColor: getUrgencyColor(req.urgency), padding: '6px 12px', borderRadius: '20px', color: 'white', fontWeight: '600', fontSize: '0.85rem' }}>
                    {req.urgency}
                  </span>
                </div>
              </div>
              <p><strong>Blood Group:</strong> {req.required_blood_group}</p>
              <p><strong>Units Needed:</strong> {req.blood_units}</p>
              <p><strong>Hospital:</strong> {req.hospital_name}</p>
              <p><strong>Location:</strong> {req.location}</p>
              <p><strong>Phone:</strong> {req.contact_phone}</p>
              <p><strong>Email:</strong> {req.contact_email}</p>
              <p><small>Created: {formatDateTime(req.createdAt || req.created_at)}</small></p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ViewRequests;
