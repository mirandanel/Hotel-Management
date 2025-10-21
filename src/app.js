require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const errorHandler = require('./middleware/errorHandler');

// Import routes
const roomRoutes = require('./routes/rooms');
const guestRoutes = require('./routes/guests');
const bookingRoutes = require('./routes/bookings');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Routes
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Hotel Management API',
        version: '1.0.0',
        endpoints: {
        rooms: '/api/rooms',
        guests: '/api/guests',
        bookings: '/api/bookings'
        }
    });
});

app.use('/api/rooms', roomRoutes);
app.use('/api/guests', guestRoutes);
app.use('/api/bookings', bookingRoutes);

// Error handler (must be last)
app.use(errorHandler);

app.get('/', (req, res) => {
    res.send(`Server is running`);
});

module.exports = app;