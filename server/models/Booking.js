const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  bookingId: {
    type: String,
    unique: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  customerName: {
    type: String,
    required: [true, 'Please provide customer name'],
    trim: true,
  },
  phone: {
    type: String,
    required: [true, 'Please provide phone number'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    trim: true,
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: true,
  },
  acType: {
    type: String,
    enum: ['Split AC', 'Window AC', 'Central AC', 'Cassette AC', 'Other'],
    required: [true, 'Please select AC type'],
  },
  acBrand: {
    type: String,
    trim: true,
  },
  problemDescription: {
    type: String,
    required: [true, 'Please describe the problem'],
    trim: true,
  },
  address: {
    type: String,
    required: [true, 'Please provide service address'],
    trim: true,
  },
  preferredDate: {
    type: Date,
    required: [true, 'Please provide preferred date'],
  },
  preferredTime: {
    type: String,
    required: [true, 'Please provide preferred time'],
  },
  technician: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Assigned', 'In Progress', 'Completed', 'Cancelled'],
    default: 'Pending',
  },
  notes: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true,
});

// Generate booking ID before saving
bookingSchema.pre('save', function(next) {
  if (!this.isNew) {
    return next();
  }
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 5).toUpperCase();
  this.bookingId = `BK${timestamp}${random}`;
  next();
});

module.exports = mongoose.model('Booking', bookingSchema);
