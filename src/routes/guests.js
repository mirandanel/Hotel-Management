const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { getGuests, getGuest, createGuest, updateGuest, deleteGuest, getGuestBookings } = require('../controllers/guestController');

// Middleware to validate ObjectId params
function validateObjectId(req, res, next) {
	const id = req.params.id;
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ success: false, message: 'Invalid id parameter' });
	}
	next();
}

router.route('/').get(getGuests).post(createGuest);
router.route('/:id').all(validateObjectId).get(getGuest).put(updateGuest).delete(deleteGuest);
router.route('/:id/bookings').all(validateObjectId).get(getGuestBookings);

module.exports = router;
