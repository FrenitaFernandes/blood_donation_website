import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-container">
      <section className="hero">
        <h1>Save Lives Through Blood Donation</h1>
        <p>
          Join our community of lifesavers. Every donation can save up to three lives. 
          Find donors in your area or request blood when you need it most.
        </p>
      </section>

      <section className="features">
        <div className="feature-card">
          <h3>Become a Donor</h3>
          <p>Register as a blood donor and help save precious lives in your community.</p>
          <Link to="/register" className="btn">Register Now</Link>
        </div>

        <div className="feature-card">
          <h3>Find Available Donors</h3>
          <p>Search for available donors by blood type and location.</p>
          <Link to="/find" className="btn">Search Donors</Link>
        </div>

        <div className="feature-card">
          <h3>Post Blood Request</h3>
          <p>Need blood urgently? Post your request and reach our network of donors.</p>
          <Link to="/request" className="btn">Request Blood</Link>
        </div>

        <div className="feature-card">
          <h3>Browse Requests</h3>
          <p>See all active blood requests in the network and help someone in need.</p>
          <Link to="/requests" className="btn">View Requests</Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
