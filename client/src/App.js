import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import { AdminProvider } from './context/AdminContext';
import Home from './pages/Home';
import RegisterDonor from './pages/RegisterDonor';
import FindDonors from './pages/FindDonors';
import RequestBlood from './pages/RequestBlood';
import ViewRequests from './pages/ViewRequests';
import About from './pages/About';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <AdminProvider>
        <div className="App">
          <nav className="navbar">
            <div className="nav-container">
              <Link to="/" className="nav-logo">
                🩸 Blood Donation Portal
              </Link>
              <ul className="nav-menu">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/register">Register as Donor</Link></li>
                <li><Link to="/find">Find Donors</Link></li>
                <li><Link to="/request">Request Blood</Link></li>
                <li><Link to="/requests">View Requests</Link></li>
                <li><Link to="/admin/login" className="admin-link">Admin</Link></li>
              </ul>
            </div>
          </nav>

          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<RegisterDonor />} />
              <Route path="/find" element={<FindDonors />} />
              <Route path="/request" element={<RequestBlood />} />
              <Route path="/requests" element={<ViewRequests />} />
              <Route path="/about" element={<About />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Routes>
          </main>

          <footer className="footer">
            <p>&copy; 2025 Blood Donation Portal. All rights reserved.</p>
          </footer>
        </div>
      </AdminProvider>
    </Router>
  );
}

export default App;
