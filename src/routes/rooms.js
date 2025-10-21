const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const {getRooms, getRoom, createRoom, updateRoom, deleteRoom, getAvailableRooms, getRoomBookings} = require('../controllers/roomController');

// Middleware: validate ObjectId for any route param named `id`
function validateObjectId(req, res, next) {
	const id = req.params.id;
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ success: false, message: 'Invalid id parameter' });
	}
	next();
}

// Available rooms endpoint (must come before /:id)
router.get('/available', getAvailableRooms);

// Standard CRUD
router.route('/').get(getRooms).post(createRoom);

// Room bookings history
router.get('/:id/bookings', validateObjectId, getRoomBookings);

// Single room operations
router.route('/:id').all(validateObjectId).get(getRoom).put(updateRoom).delete(deleteRoom);

module.exports = router;


