const app = require('./app');
const connectDB = require('./config/database');
const PORT = process.env.PORT || 3000;

// Retry connection
const connectWithRetry = async (retries = 5) => {
    for (let i = 0; i < retries; i++) {
        try {
            await connectDB();
            console.log('MongoDB connection successful');
            return true;
        } catch (err) {
            console.error(`Connection attempt ${i + 1} failed:`, err.message);
            if (i === retries - 1) throw err;
            // Wait 2 seconds before retrying
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }
    return false;
};

// Start server only after DB connection
connectWithRetry()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('All connection attempts failed:', err);
        process.exit(1);
    });