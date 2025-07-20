import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Home.css';
import socket from '../utils/socket';
import { BASE_URL } from '../utils/link';

function Home() {
  const [data, setData] = useState({
    users: [],
    topUsers: [],
    msg: '',
    currentPage: 1,
    userCount: 0,
    totalPages: 0,
  });


  // Fetch initial user list from backend
  const getUser = async (page = 1) => {
    try {
      const response = await axios.get(`${BASE_URL}api/user/fetchUsers?page=${page}&limit=10`);
      setData(response.data || {});
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  const handlePrevPage = () => {
    if (data.currentPage > 1) {
    getUser(data.currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (data.currentPage < data.totalPages) {
      getUser(data.currentPage + 1);
    }
  };

  useEffect(() => {
    getUser();

    // Socket.IO setup
    socket.on('connect', () => {
      console.log('Socket.IO connected with ID:', socket.id);
    });

    // Handle real-time leaderboard updates
    socket.on('leaderboardUpdated', (updatedUsers) => {
    console.log('Received leaderboard update from socket:', updatedUsers);

    setData((prev) => ({
      ...prev,
      users: updatedUsers,
      userCount: updatedUsers.length,
      }));
    });
    socket.on('connect_error', (err) => {
    console.error('Socket connection failed:', err.message);
    });

    // Clean up socket listeners on unmount
    return () => {
      socket.off('connect');
      socket.off('leaderboardUpdated'); 
    };
  }, []);

  // Split top 3 users from rest
  const topThree = data.topUsers || [];
  const rest = data.users || [];

  return (
    <div className="leaderboard-container">
      <div className="top-three-container">
        {topThree[1] && (
          <div key={topThree[1]._id} className="top-user rank-2">
            <img src={topThree[1].avatar} alt="avatar" className="top-avatar" />
            <p className="top-username">{topThree[1].username}</p>
            <p className="top-points">{topThree[1].totalPoints.toLocaleString()}</p>
            <div className="medal medal-2">2</div>
          </div>
        )}

        {topThree[0] && (
          <div key={topThree[0]._id} className="top-user rank-1 center-winner">
            <img src={topThree[0].avatar} alt="avatar" className="top-avatar" />
            <p className="top-username">{topThree[0].username}</p>
            <p className="top-points">{topThree[0].totalPoints.toLocaleString()}</p>
            <div className="medal medal-1">1</div>
          </div>
        )}

        {topThree[2] && (
          <div key={topThree[2]._id} className="top-user rank-3">
            <img src={topThree[2].avatar} alt="avatar" className="top-avatar" />
            <p className="top-username">{topThree[2].username}</p>
            <p className="top-points">{topThree[2].totalPoints.toLocaleString()}</p>
            <div className="medal medal-3">3</div>
          </div>
        )}
      </div>

      <ul className="user-list">
        {topThree === 0 ? (
          <li className="user-item no-user">No users found</li>
        ) : (
          rest.map((user, index) => (
            <li key={user._id} className="user-item">
              <span className="user-rank">{(data.currentPage - 1) * 7 + index + 4}</span>
              <img src={user.avatar} alt="avatar" className="user-avatar" />
              <span className="user-name">{user.username}</span>
              <span className="user-points">{user.totalPoints.toLocaleString()}</span>
              <span className="user-trophy"></span>
            </li>
          ))
        )}
      </ul>

      {data.totalPages > 1 && (
        <div className="pagination-controls">
          <button onClick={handlePrevPage} disabled={data.currentPage === 1}>
            Previous
          </button>
          <span>Page {data.currentPage} of {data.totalPages}</span>
          <button onClick={handleNextPage} disabled={data.currentPage === data.totalPages}>
            Next
          </button>
        </div>
      )}

    </div>
  );
}

export default Home;
