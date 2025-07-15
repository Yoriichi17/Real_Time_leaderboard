const express = require('express');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT;
const connectDB = require('./config/db.config');
const userRoutes = require('./routes/user.route');
const coinsRoutes = require('./routes/coins.route');

// Connect to MongoDB
connectDB();

// Middleware setup
app.use(cors()); // Enable CORS for all origins
app.use(express.json()); 
app.use(express.urlencoded());
app.use(express.static("public")); 

// Route mounting
app.use('/api/user', userRoutes);
app.use('/api/coins', coinsRoutes);

module.exports = app;
