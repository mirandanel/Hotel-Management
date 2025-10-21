const app = require('./app');
const connectDB = require('./config/database');

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    if (process.env.MONGO_URI) {
      await connectDB();
    } else {
      console.warn('MONGO_URI not set — starting without DB connection (degraded mode)');
    }

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    // exit with non-zero code to indicate startup failure
    process.exit(1);
  }
})();