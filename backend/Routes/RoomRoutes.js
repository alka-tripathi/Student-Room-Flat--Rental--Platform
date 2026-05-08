const router = require('express').Router();

const upload = require('../middleware/upload');
const Room = require('../Models/Room');

const newRoomValidate = require('../middleware/newRoomValidator');
const authMiddleware = require('../middleware/Auth');
const newRoomController = require('../controllers/RoomController');

// ✅ ADD ROOM (you can protect it if needed)
// router.post(
//   '/addroom',
//   upload.array('images', 5),
//   newRoomValidate,
//   newRoomController,
// );
router.post(
  '/addroom',
  authMiddleware,
  upload.array('images', 5),
  newRoomValidate,
  newRoomController,
);

// ✅ GET ALL AVAILABLE ROOMS
router.get('/getrooms', async (req, res) => {
  try {
    const rooms = await Room.find({ available: true }).sort({ createdAt: -1 });

    res.json(rooms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET LIKED ROOMS (FIXED)
router.get('/liked_rooms', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id; // 🔥 FIXED

    const likedRooms = await Room.find({
      likes: userId,
    });

    res.json({
      success: true,
      rooms: likedRooms,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET SINGLE ROOM
router.get('/:id', async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);

    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    res.json(room);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ LIKE ROOM (FIXED)
router.post('/like/:roomId', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id.toString(); // 🔥 FIXED

    const room = await Room.findById(req.params.roomId);

    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    const alreadyLiked = room.likes.some((id) => id.toString() === userId);

    if (!alreadyLiked) {
      room.likes.push(userId);
      await room.save();
    }

    res.json({ success: true, room });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ UNLIKE ROOM (FIXED)
router.delete('/unlike/:roomId', authMiddleware, async (req, res) => {
  try {
    const { roomId } = req.params;
    const userId = req.user.id.toString(); // 🔥 FIXED

    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'Room not found',
      });
    }

    const isLiked = room.likes.some((id) => id.toString() === userId);

    if (!isLiked) {
      return res.status(400).json({
        success: false,
        message: 'Room not in liked list',
      });
    }

    room.likes = room.likes.filter((id) => id.toString() !== userId);

    await room.save();

    res.json({
      success: true,
      message: 'Room unliked successfully',
      room,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

// ✅ BOOK ROOM (PROTECTED 🔥)
router.put('/book/:id', authMiddleware, async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);

    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    if (!room.available) {
      return res.status(400).json({ message: 'Room already booked' });
    }

    room.available = false;
    await room.save();

    res.json(room);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
