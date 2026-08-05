const ContactMessage = require('../models/ContactMessage');

// @desc    Create contact message
// @route   POST /api/contact
// @access  Public
const createMessage = async (req, res) => {
  try {
    const message = await ContactMessage.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      data: message,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all messages
// @route   GET /api/contact
// @access  Admin
const getMessages = async (req, res) => {
  try {
    const { status } = req.query;
    let query = {};

    if (status) query.status = status;

    const messages = await ContactMessage.find(query).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update message status
// @route   PUT /api/contact/:id/status
// @access  Admin
const updateMessageStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const message = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!message) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }

    res.json({
      success: true,
      message: 'Message status updated successfully',
      data: message,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete message
// @route   DELETE /api/contact/:id
// @access  Admin
const deleteMessage = async (req, res) => {
  try {
    const message = await ContactMessage.findByIdAndDelete(req.params.id);

    if (!message) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }

    res.json({
      success: true,
      message: 'Message deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createMessage,
  getMessages,
  updateMessageStatus,
  deleteMessage,
};
