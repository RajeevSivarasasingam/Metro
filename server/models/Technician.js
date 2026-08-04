const mongoose = require('mongoose');

const technicianSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide technician name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  phone: {
    type: String,
    required: [true, 'Please provide phone number'],
    trim: true,
  },
  specialization: {
    type: String,
    enum: ['AC Repair', 'AC Installation', 'AC Maintenance', 'Commercial AC', 'All Services'],
    default: 'All Services',
  },
  experience: {
    type: String,
    trim: true,
  },
  availability: {
    type: String,
    enum: ['Available', 'On Leave', 'Unavailable'],
    default: 'Available',
  },
  status: {
    type: String,
    enum: ['Available', 'Busy', 'Inactive'],
    default: 'Available',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Technician', technicianSchema);
