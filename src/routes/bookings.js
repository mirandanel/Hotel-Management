const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { getBookings, getBooking, createBooking, updateBooking, deleteBooking } = require('../controllers/bookingController');

// Middleware to validate ObjectId params
function validateObjectId(req, res, next) {
	const id = req.params.id;
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ success: false, message: 'Invalid id parameter' });
	}
	next();
}

router.route('/').get(getBookings).post(createBooking);
router.route('/:id').all(validateObjectId).get(getBooking).put(updateBooking).delete(deleteBooking);

module.exports = router;
