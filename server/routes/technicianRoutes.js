const express = require('express');
const router = express.Router();
const { getTechnicians, getAvailableTechnicians, createTechnician, updateTechnician, deleteTechnician } = require('../controllers/technicianController');
const { protect, admin } = require('../middleware/auth');

router.route('/')
  .get(protect, admin, getTechnicians)
  .post(protect, admin, createTechnician);

router.get('/available', protect, admin, getAvailableTechnicians);

router.route('/:id')
  .put(protect, admin, updateTechnician)
  .delete(protect, admin, deleteTechnician);

module.exports = router;
