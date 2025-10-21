// src/server.js (new file suggestion)
const app = require('./app');
const connectDB = require('./config/database');

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    // decide: exit(1) in a controlled start script only, not inside connectDB
    process.exit(1);
  }
})();