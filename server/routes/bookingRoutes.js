const express = require('express');
const router = express.Router();
const { createBooking, getBookings, getMyBookings, getBooking, updateBookingStatus, assignTechnician, deleteBooking } = require('../controllers/bookingController');
const { protect, admin } = require('../middleware/auth');

router.route('/')
  .post(createBooking)
  .get(protect, admin, getBookings);

router.get('/my', protect, getMyBookings);

router.route('/:id')
  .get(protect, getBooking)
  .delete(protect, admin, deleteBooking);

router.put('/:id/status', protect, admin, updateBookingStatus);
router.put('/:id/assign-technician', protect, admin, assignTechnician);

module.exports = router;
