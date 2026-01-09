import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminContext } from '../context/AdminContext';
import '../styles/AdminDashboard.css';
import { API_URL } from '../config/api';

function AdminDashboard() {
  const { admin, token, logout } = useContext(AdminContext);
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('requests');
  const [filterStatus, setFilterStatus] = useState('');

  // Redirect if not logged in
  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
    }
  }, [token, navigate]);

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [requestRes, donorRes] = await Promise.all([
        fetch(`${API_URL}/request/inbox`),
        fetch(`${API_URL}/donors/admin/all`)
      ]);

      if (requestRes.ok) {
        const reqData = await requestRes.json();
        setRequests(reqData);
      }

      if (donorRes.ok) {
        const donData = await donorRes.json();
        setDonors(donData);
      }
    } catch (err) {
      setMessage('❌ Error fetching data: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateRequestStatus = async (id, status) => {
    try {
      const response = await fetch(`${API_URL}/request/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });

      if (response.ok) {
        setMessage('✅ Request status updated!');
        fetchData();
        setTimeout(() => setMessage(''), 3000);
      } else {
        const data = await response.json();
        setMessage('❌ ' + data.message);
      }
    } catch (err) {
      setMessage('❌ Error updating status: ' + err.message);
    }
  };

  const deleteRequest = async (id) => {
    if (window.confirm('Are you sure you want to delete this request?')) {
      try {
        const response = await fetch(`${API_URL}/request/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
          setMessage('✅ Request deleted!');
          fetchData();
          setTimeout(() => setMessage(''), 3000);
        } else {
          const data = await response.json();
          setMessage('❌ ' + data.message);
        }
      } catch (err) {
        setMessage('❌ Error deleting request: ' + err.message);
      }
    }
  };

  const updateDonorAvailability = async (id, isAvailable) => {
    try {
      const response = await fetch(`${API_URL}/donors/${id}/availability`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ is_available: isAvailable })
      });

      if (response.ok) {
        setMessage('✅ Donor availability updated!');
        fetchData();
        setTimeout(() => setMessage(''), 3000);
      } else {
        const data = await response.json();
        setMessage('❌ ' + data.message);
      }
    } catch (err) {
      setMessage('❌ Error updating donor: ' + err.message);
    }
  };

  const deleteDonor = async (id) => {
    if (window.confirm('Are you sure you want to delete this donor profile?')) {
      try {
        const response = await fetch(`${API_URL}/donors/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
          setMessage('✅ Donor deleted!');
          fetchData();
          setTimeout(() => setMessage(''), 3000);
        } else {
          const data = await response.json();
          setMessage('❌ ' + data.message);
        }
      } catch (err) {
        setMessage('❌ Error deleting donor: ' + err.message);
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Pending': return '#fbc02d';
      case 'Fulfilled': return '#388e3c';
      case 'Cancelled': return '#d32f2f';
      default: return '#666';
    }
  };

  const filteredRequests = filterStatus ? requests.filter(r => r.status === filterStatus) : requests;

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="header-content">
          <h1>🩺 Admin Dashboard</h1>
          <div className="admin-info">
            <span>Welcome, <strong>{admin?.username}</strong></span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
        </div>
      </header>

      {message && <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>{message}</div>}

      <div className="dashboard-tabs">
        <button className={`tab ${activeTab === 'requests' ? 'active' : ''}`} onClick={() => setActiveTab('requests')}>
          Blood Requests ({requests.length})
        </button>
        <button className={`tab ${activeTab === 'donors' ? 'active' : ''}`} onClick={() => setActiveTab('donors')}>
          Manage Donors ({donors.length})
        </button>
      </div>

      {loading ? (
        <p className="loading">Loading data...</p>
      ) : (
        <>
          {activeTab === 'requests' && (
            <div className="requests-section">
              <h2>Blood Requests Management</h2>
              
              <div className="filter-buttons">
                <button 
                  className={`filter-btn ${filterStatus === '' ? 'active' : ''}`}
                  onClick={() => setFilterStatus('')}
                >
                  All ({requests.length})
                </button>
                <button 
                  className={`filter-btn ${filterStatus === 'Pending' ? 'active' : ''}`}
                  onClick={() => setFilterStatus('Pending')}
                >
                  Pending ({requests.filter(r => r.status === 'Pending').length})
                </button>
                <button 
                  className={`filter-btn ${filterStatus === 'Fulfilled' ? 'active' : ''}`}
                  onClick={() => setFilterStatus('Fulfilled')}
                >
                  Fulfilled ({requests.filter(r => r.status === 'Fulfilled').length})
                </button>
                <button 
                  className={`filter-btn ${filterStatus === 'Cancelled' ? 'active' : ''}`}
                  onClick={() => setFilterStatus('Cancelled')}
                >
                  Cancelled ({requests.filter(r => r.status === 'Cancelled').length})
                </button>
              </div>

              {filteredRequests.length === 0 ? (
                <p className="no-data">No requests found</p>
              ) : (
                <div className="requests-grid">
                  {filteredRequests.map(request => (
                    <div key={request._id} className="request-card">
                      <div className="request-header">
                        <h3>{request.patient_name}</h3>
                        <span className="status-badge" style={{ backgroundColor: getStatusColor(request.status) }}>
                          {request.status}
                        </span>
                      </div>
                      <div className="request-details">
                        <p><strong>Blood Group:</strong> {request.required_blood_group}</p>
                        <p><strong>Units Needed:</strong> {request.blood_units}</p>
                        <p><strong>Hospital:</strong> {request.hospital_name}</p>
                        <p><strong>Location:</strong> {request.location}</p>
                        <p><strong>Urgency:</strong> {request.urgency}</p>
                        <p><strong>Phone:</strong> {request.contact_phone}</p>
                        <p><strong>Email:</strong> {request.contact_email}</p>
                        <p><strong>Created:</strong> {new Date(request.createdAt).toLocaleString()}</p>
                      </div>
                      <div className="request-actions">
                        {request.status !== 'Fulfilled' && (
                          <button 
                            onClick={() => updateRequestStatus(request._id, 'Fulfilled')}
                            className="action-btn fulfilled-btn"
                          >
                            Mark as Fulfilled
                          </button>
                        )}
                        {request.status !== 'Cancelled' && (
                          <button 
                            onClick={() => updateRequestStatus(request._id, 'Cancelled')}
                            className="action-btn cancel-btn"
                          >
                            Cancel
                          </button>
                        )}
                        <button 
                          onClick={() => deleteRequest(request._id)}
                          className="action-btn delete-btn"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'donors' && (
            <div className="donors-section">
              <h2>Manage Donors</h2>
              {donors.length === 0 ? (
                <p className="no-data">No donors found</p>
              ) : (
                <div className="donors-grid">
                  {donors.map(donor => (
                    <div key={donor._id} className={`donor-card ${!donor.is_available ? 'unavailable' : ''}`}>
                      <div className="donor-header">
                        <h3 style={{ opacity: donor.is_available ? 1 : 0.5 }}>
                          {donor.name}
                        </h3>
                        <div className="availability-toggle">
                          <label className="switch">
                            <input
                              type="checkbox"
                              checked={donor.is_available}
                              onChange={(e) => updateDonorAvailability(donor._id, e.target.checked)}
                            />
                            <span className="slider"></span>
                          </label>
                          <span className="availability-text">
                            {donor.is_available ? '✅ Available' : '⏸ Unavailable'}
                          </span>
                        </div>
                      </div>
                      <div className="donor-details">
                        <p><strong>Blood Group:</strong> {donor.blood_group}</p>
                        <p><strong>Age:</strong> {donor.age}</p>
                        <p><strong>Gender:</strong> {donor.gender}</p>
                        <p><strong>City:</strong> {donor.city}</p>
                        <p><strong>Phone:</strong> {donor.contact_phone}</p>
                        <p><strong>Email:</strong> {donor.contact_email}</p>
                        <p><strong>Registered:</strong> {new Date(donor.createdAt).toLocaleString()}</p>
                      </div>
                      <div className="donor-actions">
                        <button 
                          onClick={() => deleteDonor(donor._id)}
                          className="action-btn delete-btn"
                        >
                          Delete Profile
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default AdminDashboard;
