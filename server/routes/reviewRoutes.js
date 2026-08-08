const express = require('express');
const router = express.Router();
const { getReviews, getAllReviews, createReview, approveReview, deleteReview } = require('../controllers/reviewController');
const { protect, admin } = require('../middleware/auth');

router.route('/')
  .get(getReviews)
  .post(protect, createReview);

router.get('/all', protect, admin, getAllReviews);

router.route('/:id')
  .put(protect, admin, approveReview)
  .delete(protect, admin, deleteReview);

module.exports = router;
