const Room = require('../models/Room');
// const newRoom =require("../Middleware/newRoomValidator")

const addRoom = async (req, res) => {
  try {
    // ✅ Validate images
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'At least one image is required',
      });
    }

    // ✅ Store filenames in array
    const imagePaths = req.files.map((file) => file.filename);

    const newRoom = new Room({
      ...req.body,
      images: imagePaths,
    });

    const savedRoom = await newRoom.save();

    res.status(201).json({
      success: true,
      message: 'Room added successfully',
      room: savedRoom,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = addRoom;
