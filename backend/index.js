import dotenv from 'dotenv';
import connectDB from './src/config/db.js'; // Adjust path if needed
import app from './src/app.js'; // Import the configured app

dotenv.config();

const PORT = process.env.PORT || 5000;

// Connect to DB then start server

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`🚀 Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("MongoDB connection failed!!!", err);
    });