const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        // Log the error and rethrow so the caller can decide how to handle startup failures.
        // Avoid calling process.exit here so the module doesn't unconditionally terminate the process
        // during import (which can cause deployment environments like Vercel to fail silently).
        console.error(`MongoDB connection error: ${error.message}`);
        throw error;
    }
};

module.exports = connectDB;
