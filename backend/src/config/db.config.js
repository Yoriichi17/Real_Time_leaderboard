const mongoose = require('mongoose');

const connectionString = process.env.MONGO_URI;
const db_name = process.env.DB_NAME;

// Connect to MongoDB using Mongoose
const connectDB = async () => {
    try {
        await mongoose.connect(connectionString, {
            dbName: db_name
        });
        console.log("MongoDB connected!");
    } catch (error) {
        console.error("ERROR WHILE CONNECTING DB:", error);
        process.exit(1); // Exit the app if DB connection fails
    }
};

module.exports = connectDB;
