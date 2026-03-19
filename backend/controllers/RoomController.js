const Room = require('../models/Room');

const addRoom = async (req, res) => {
  try {
    const newRoom = new Room({
      ...req.body,
      image: req.file ? req.file.filename : null,
    });

    const savedRoom = await newRoom.save();

    res.status(201).json({
      message: 'Room added successfully',
      room: savedRoom,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = addRoom;
