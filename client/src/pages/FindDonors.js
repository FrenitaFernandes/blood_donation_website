import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3001';

const BLOOD_GROUPS = ['Any','O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'];

function FindDonors() {
  const [filters, setFilters] = useState({
    blood_group: 'O+',
    city: ''
  });
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [searchMode, setSearchMode] = useState(''); // '', 'by-blood', 'by-city', 'all'

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const searchDonors = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await axios.get(`${API_URL}/donors/search`, {
        params: filters
      });
      setDonors(response.data);
      setSearchMode('by-blood');
      if (response.data.length === 0) {
        setMessage('No donors found matching your criteria.');
      }
    } catch (error) {
      setMessage('❌ Error searching donors: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const searchByCity = async (e) => {
    e.preventDefault();
    
    if (!filters.city.trim()) {
      setMessage('❌ Please enter a city name');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await axios.get(`${API_URL}/donors/search`, {
        params: { city: filters.city }
      });
      setDonors(response.data);
      setSearchMode('by-city');
      if (response.data.length === 0) {
        setMessage(`No donors found in ${filters.city}.`);
      } else {
        setMessage(`Found ${response.data.length} donors in ${filters.city}`);
      }
    } catch (error) {
      setMessage('❌ Error searching donors: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const getAllDonors = async () => {
    setLoading(true);
    setMessage('');

    try {
      const response = await axios.get(`${API_URL}/donors`);
      setDonors(response.data);
      setSearchMode('all');
      if (response.data.length === 0) {
        setMessage('No donors available at the moment.');
      } else {
        setMessage(`Showing all ${response.data.length} available donors`);
      }
    } catch (error) {
      setMessage('❌ Error fetching donors: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Get unique blood groups in results
  const getBloodGroupsInCity = () => {
    const bloodGroups = new Set(donors.map(d => d.blood_group));
    return Array.from(bloodGroups).sort();
  };

  return (
    <div className="search-container">
      <h2>Find Blood Donors</h2>
      
      <form onSubmit={searchDonors} className="search-form">
        <div className="search-form-row">
          <div className="form-group">
            <label>Blood Group:</label>
            <select name="blood_group" value={filters.blood_group} onChange={handleFilterChange}>
              {BLOOD_GROUPS.map(group => (
                <option key={group} value={group}>{group}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>City (optional):</label>
            <input
              type="text"
              name="city"
              value={filters.city}
              onChange={handleFilterChange}
              placeholder="Enter city name"
            />
          </div>
        </div>

        <div className="search-buttons">
          <button type="submit" disabled={loading} className="btn">
            {loading ? 'Searching...' : 'Search by Blood Group'}
          </button>

          <button type="button" disabled={loading} className="btn" onClick={searchByCity}>
            {loading ? 'Searching...' : 'Search by City'}
          </button>

          <button type="button" disabled={loading} className="btn" onClick={getAllDonors}>
            {loading ? 'Loading...' : 'View All Donors'}
          </button>
        </div>
      </form>

      {message && (
        <p className={message.includes('❌') ? 'error' : 'success'} style={{ textAlign: 'center', marginTop: '15px' }}>
          {message}
        </p>
      )}

      {/* Show blood groups summary */}
      {searchMode === 'by-city' && donors.length > 0 && (
        <div style={{
          background: '#f0f4ff',
          padding: '15px',
          borderRadius: '8px',
          marginTop: '15px',
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          <p style={{ margin: '0 0 10px 0', fontWeight: 'bold', color: '#667eea' }}>
            Blood Groups Available in {filters.city}:
          </p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {getBloodGroupsInCity().map(group => (
              <span key={group} style={{
                background: '#667eea',
                color: 'white',
                padding: '8px 15px',
                borderRadius: '20px',
                fontWeight: 'bold',
                fontSize: '0.95rem'
              }}>
                {group}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="donors-list">
        {donors.map(donor => (
          <div key={donor._id} className="donor-card">
            <h3>{donor.name}</h3>
            <p><strong>Blood Group:</strong> <span style={{ fontSize: '1.2rem', color: '#d32f2f', fontWeight: 'bold' }}>{donor.blood_group}</span></p>
            <p><strong>Age:</strong> {donor.age}</p>
            <p><strong>City:</strong> {donor.city}</p>
            <p><strong>Phone:</strong> {donor.contact_phone}</p>
            <p><strong>Email:</strong> {donor.contact_email}</p>
            <p><strong>Available:</strong> {donor.is_available ? 'Yes' : 'No'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FindDonors;
