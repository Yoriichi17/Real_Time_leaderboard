import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

function Header() {
  return (
    <div className="header-container">
      <div className="header-main">
        <h1 className="header-title">LEADERBOARD</h1>
        <p className="header-subtitle">Track the top scorers live!</p>
      </div>
      <div>
        <nav className="header-nav">
        <Link to="/register" className="nav-link">Add User</Link>
        <Link to="/award" className="nav-link">Award Points</Link>
        <Link to="/" className="nav-link">Leaderboard</Link>
      </nav>
      </div>
    </div>
  );
}

export default Header;
