const User = require('../models/user.model');

// Emit updated leaderboard to all connected clients
const emitLeaderboard = async (io) => {
  try {
    // Fetch users sorted by total points (desc), then by last update (asc)
    const users = await User.find().sort({ totalPoints: -1, updatedAt: 1 }).limit(10);

    // Broadcast the leaderboard to all clients via Socket.IO
    io.emit('leaderboardUpdated', users);

    console.log('Update performed on trigger');
  } catch (err) {
    console.error("Failed to emit leaderboard:", err.message);
  }
};

module.exports = emitLeaderboard;
