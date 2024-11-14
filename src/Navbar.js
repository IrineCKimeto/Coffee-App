import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1>Coffee App</h1>
      </div>
      <div className="navbar-links">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/coffees">Coffee Types</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/add-coffee">Add Coffee</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
