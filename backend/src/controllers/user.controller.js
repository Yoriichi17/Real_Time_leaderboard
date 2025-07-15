const User = require('../models/user.model');
const uploadOnCloud = require('../utils/cloudinary.util');
const emitLeaderboard = require('../utils/updateBoard.util');

// Register a new user
const register = async (req, res) => {
  try {
    const { username } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ msg: 'User already exists' });

    const avatarPath = req.file;
    let url;

    // Upload avatar to Cloudinary (or use default)
    if (avatarPath) {
      const avatar = await uploadOnCloud(avatarPath.path);
      url = avatar.url;
    } else {
      url = process.env.DEFAULT_PFP;
    }

    const newuser = new User({
      username,
      avatar: url,
      totalPoints: 0
    });
    
    await newuser.save();
    await emitLeaderboard(req.app.get('io'));

    return res.status(200).json({ msg: 'User created successfully' });

  } catch (error) {
    console.error("Problem while registering");
    return res.status(500).json({ msg: 'Server error', error: error.message });
  }
};

// Fetch users with pagination, sorted by points
const getUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 7; // Always 7 non-top users per page
    const skip = (page - 1) * limit;

    // Always get top 3 users
    const topUsers = await User.find()
      .sort({ totalPoints: -1, updatedAt: 1 })
      .limit(3);

    // Get rest users (rank 4 onwards), with correct skip and limit
    const users = await User.find()
      .sort({ totalPoints: -1, updatedAt: 1 })
      .skip(3 + skip) // skip top 3 only once
      .limit(limit);

    const totalRemainingUsers = await User.countDocuments() - 3;
    const totalPages = Math.ceil(totalRemainingUsers / limit);

    return res.status(200).json({
      msg: "Users fetched successfully",
      currentPage: page,
      userCount: users.length,
      totalPages,
      topUsers,
      users,
    });
  } catch (error) {
    console.error("Problem while fetching users", error);
    return res.status(500).json({ msg: 'Server error', error: error.message });
  }
};

// Search users by username (case-insensitive)
const searchUsers = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.status(400).json({ msg: 'Query is required' });

    const regex = new RegExp(query, 'i'); // Case-insensitive search

    const users = await User.find({ username: regex })
      .sort({ totalPoints: -1 })
      .limit(10)
      .select('username avatar totalPoints');

    res.status(200).json(users);
  } catch (error) {
    console.error("Error in searchUsers:", error.message);
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

module.exports = { register, getUsers, searchUsers };
