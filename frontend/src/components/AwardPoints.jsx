import React, { useState } from 'react';
import axios from 'axios';
import '../styles/AwardPoints.css';

function AwardPoints() {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState('');

  // Handle search input and fetch matching users
  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);
    setMessage('');
    setSelectedUser(null);

    if (!value.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:5000/api/user/searchUsers?query=${encodeURIComponent(value)}`
      );
      console.log('Search response:', res.data);
      const list = res.data.users || res.data;
      setSearchResults(list);
    } catch (err) {
      console.error('Search error:', err);
      setSearchResults([]);
    }
  };

  // Set selected user from dropdown
  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setQuery(user.username);
    setSearchResults([]);
  };

  // Award random points to selected user
  const handleAwardPoints = async () => {
    if (!selectedUser) return;

    try {
      const res = await axios.post(
        `http://localhost:5000/api/coins/givePoints/${selectedUser._id}`
      );

      const awarded = res.data.awardedPoints;
      setMessage(`${selectedUser.username} was awarded ${awarded} points!`);

      const updatedRes = await axios.get(
        `http://localhost:5000/api/user/searchUsers?query=${selectedUser.username}`
      );

      const updatedUser = (updatedRes.data.users || updatedRes.data).find(
        u => u._id === selectedUser._id
      );

      if (updatedUser) {
        setSelectedUser(updatedUser);
      }

      setQuery('');
      setSearchResults([]);
    } catch (err) {
      console.error("Award error:", err);
      setMessage("Failed to award points.");
    }
  };


  return (
    <div className="award-container">
      <h2 className="award-title">Award Points</h2>

      <input
        type="text"
        className="award-input"
        placeholder="Search users by name..."
        value={query}
        onChange={handleSearch}
      />

      {searchResults.length > 0 && (
        <ul className="dropdown-list">
          {searchResults.map((user) => (
            <li key={user._id} onClick={() => handleSelectUser(user)} className="dropdown-item">
              <img src={user.avatar} alt="avatar" className="dropdown-avatar" />
              <span className="dropdown-name">{user.username}</span>
              <span className="dropdown-points">{user.totalPoints} pts</span>
            </li>
          ))}
        </ul>
      )}

      {selectedUser && (
        <div className="selected-user-box">
          <img src={selectedUser.avatar} alt="avatar" className="selected-avatar" />
          <h3>{selectedUser.username}</h3>
          <p>Total Points: {selectedUser.totalPoints}</p>
          <button className="award-btn" onClick={handleAwardPoints}>Award Random Points</button>
        </div>
      )}

      {message && <p className="award-message">{message}</p>}
    </div>
  );
}

export default AwardPoints;