import React from 'react';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="footer-container">
      <p>© {new Date().getFullYear()} Leaderboard App. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
