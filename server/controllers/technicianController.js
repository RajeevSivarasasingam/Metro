const Technician = require('../models/Technician');

// @desc    Get all technicians
// @route   GET /api/technicians
// @access  Admin
const getTechnicians = async (req, res) => {
  try {
    const technicians = await Technician.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: technicians.length,
      data: technicians,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get available technicians
// @route   GET /api/technicians/available
// @access  Admin
const getAvailableTechnicians = async (req, res) => {
  try {
    const technicians = await Technician.find({ 
      status: 'Available',
      availability: 'Available'
    });

    res.json({
      success: true,
      count: technicians.length,
      data: technicians,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create new technician
// @route   POST /api/technicians
// @access  Admin
const createTechnician = async (req, res) => {
  try {
    const technician = await Technician.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Technician created successfully',
      data: technician,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update technician
// @route   PUT /api/technicians/:id
// @access  Admin
const updateTechnician = async (req, res) => {
  try {
    const technician = await Technician.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!technician) {
      return res.status(404).json({ success: false, message: 'Technician not found' });
    }

    res.json({
      success: true,
      message: 'Technician updated successfully',
      data: technician,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete technician
// @route   DELETE /api/technicians/:id
// @access  Admin
const deleteTechnician = async (req, res) => {
  try {
    const technician = await Technician.findByIdAndDelete(req.params.id);

    if (!technician) {
      return res.status(404).json({ success: false, message: 'Technician not found' });
    }

    res.json({
      success: true,
      message: 'Technician deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getTechnicians,
  getAvailableTechnicians,
  createTechnician,
  updateTechnician,
  deleteTechnician,
};
