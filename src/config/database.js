const mongoose = require('mongoose');

const connectDB = async () => {
    if (!process.env.MONGO_URI) {
        console.error('MONGO_URI is missing!');
        throw new Error('MONGO_URI environment variable is not set.');
    }
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            // Add timeouts and connection options suitable for Vercel
            serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds instead of 30
            socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
            maxPoolSize: 10, // Maintain up to 10 socket connections
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return conn;
    } catch (error) {
        // Log the error and rethrow so the caller can decide how to handle startup failures.
        // Avoid calling process.exit here so the module doesn't unconditionally terminate the process
        // during import (which can cause deployment environments like Vercel to fail silently).
        console.error(`MongoDB connection error: ${error.message}`);
        throw error;
    }
};

module.exports = connectDB;
