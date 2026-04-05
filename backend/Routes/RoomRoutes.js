const router = require('express').Router();

const upload = require('../Middleware/upload');

const Room = require('../Models/Room');
const newRoomValidate = require('../Middleware/newRoomValidator');
const authMiddleware = require('../Middleware/Auth');
const newRoomController = require('../Controllers/RoomController');

//router.post('/addroom', upload.array('images', 5), roomValidation, addRoom);
router.post(
  '/addroom',
  upload.array('images', 5),
  newRoomValidate,
  newRoomController,
);

router.get('/getrooms', async (req, res) => {
  try {
    //If you want newly added rooms to appear first:
    const rooms = await Room.find().sort({ createdAt: -1 });
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//to get liked  room page
router.get('/liked_rooms', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const likedRooms = await Room.find({
      likes: userId,
    });
    res.json(likedRooms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Like a room
router.post('/like/:roomId', authMiddleware, async (req, res) => {
  try {
    const { roomId } = req.params;
    const userId = req.user.id;

    const room = await Room.findById(roomId);
    if (!room) {
      return res
        .status(404)
        .json({ success: false, message: 'Room not found' });
    }

    // Check if user already liked this room
    if (room.likes.includes(userId)) {
      return res
        .status(400)
        .json({ success: false, message: 'Room already liked' });
    }

    // Add like
    room.likes.push(userId);
    await room.save();

    res.json({
      success: true,
      message: 'Room liked successfully',
      room,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Unlike a room
router.delete('/unlike/:roomId', authMiddleware, async (req, res) => {
  try {
    const { roomId } = req.params;
    const userId = req.user.id;

    const room = await Room.findById(roomId);
    if (!room) {
      return res
        .status(404)
        .json({ success: false, message: 'Room not found' });
    }

    // Check if user has liked this room
    if (!room.likes.includes(userId)) {
      return res
        .status(400)
        .json({ success: false, message: 'Room not in liked list' });
    }

    // Remove like
    room.likes = room.likes.filter((id) => id.toString() !== userId);
    await room.save();

    res.json({
      success: true,
      message: 'Room unliked successfully',
      room,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
