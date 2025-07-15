const ClaimHistory = require('../models/history.model');
const User = require('../models/user.model');
const emitLeaderboard = require('../utils/updateBoard.util');

// Generate and assign random points to a user
const generatePoints = async (req, res) => {
  try {
    const { user_id } = req.params;

    // Random points between 1 and 10
    const points = Math.floor(Math.random() * 10 + 1);

    const user = await User.findByIdAndUpdate(
      user_id,
      { $inc: { totalPoints: points } },
      { new: true }
    );

    // Record the transaction in claim history
    const createHistory = new ClaimHistory({
      userId: user_id,
      pointsClaimed: points
    });

    await createHistory.save();

    // Update leaderboard for all connected clients
    await emitLeaderboard(req.app.get('io'));

    return res.status(200).json({
      msg: "Points allotted",
      user: user,
      awardedPoints: points
    });
    
  } catch (error) {
    console.error("Problem while allotting points");
    return res.status(500).json({ msg: 'Server error', error: error.message });
  }
};

module.exports = { generatePoints };
