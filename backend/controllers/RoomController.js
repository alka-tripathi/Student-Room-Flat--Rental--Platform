const Room = require('../Models/Room');

const addRoom = async (req, res) => {
  try {
    const room = new Room(req.body); //new object banega room ka
    await room.save();

    res.status(201).json({
      message: 'Room added successfully',
      room,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = addRoom;
