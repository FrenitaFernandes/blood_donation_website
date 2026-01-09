import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminContext } from '../context/AdminContext';
import '../styles/AdminLogin.css';

function AdminLogin() {
  const { login } = useContext(AdminContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const result = await login(formData.username, formData.password);

    if (result.success) {
      setMessage('✅ ' + result.message);
      setTimeout(() => navigate('/admin/dashboard'), 1500);
    } else {
      const friendly = result.message.includes('Failed to fetch')
        ? 'Server unreachable. Please start API (http://127.0.0.1:3001) and retry.'
        : result.message;
      setMessage('❌ ' + friendly);
    }

    setLoading(false);
  };

  return (
    <div className="admin-login-container">
      <div className="login-box">
        <h1>Admin Login</h1>
        <p className="subtitle">Blood Donation Portal Management</p>

        {message && <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>{message}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter admin username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter admin password"
              required
            />
          </div>

          <button type="submit" disabled={loading} className="login-btn">
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

      </div>
    </div>
  );
}

export default AdminLogin;
