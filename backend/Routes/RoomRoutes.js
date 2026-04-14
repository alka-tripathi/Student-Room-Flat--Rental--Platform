const router = require('express').Router();

const upload = require('../Middleware/upload');

const Room = require('../Models/Room');
const newRoomValidate = require('../Middleware/newRoomValidator');
const authMiddleware = require('../Middleware/Auth');
const authController = require('../Controllers/AuthController');
const newRoomController = require('../Controllers/RoomController');

//router.post('/addroom', upload.array('images', 5), roomValidation, addRoom);
router.post(
  '/addroom',
  upload.array('images', 5),
  newRoomValidate,
  newRoomController,
);

// router.get('/getrooms', async (req, res) => {
//   try {
//     //If you want newly added rooms to appear first:
//     const rooms = await Room.find().sort({ createdAt: -1 });
//     res.json(rooms);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

router.get('/getrooms', async (req, res) => {
  try {
    const rooms = await Room.find({ available: true }) //  important
      .sort({ createdAt: -1 });

    res.json(rooms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//to get liked  room page
router.get('/liked_rooms', authMiddleware, async (req, res) => {
  const userId = req.user._id;

  const likedRooms = await Room.find({
    likes: userId,
  });

  res.json({
    success: true,
    rooms: likedRooms,
  });
});

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

router.post('/like/:roomId', authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id; //  important

    const room = await Room.findById(req.params.roomId);

    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    // prevent duplicate like
    const alreadyLiked = room.likes.some((id) => id.toString() === userId);

    if (!alreadyLiked) {
      room.likes.push(userId);
      await room.save(); //  MUST SAVE
    }

    console.log('UPDATED LIKES:', room.likes); // debug

    res.json({ success: true, room });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.delete('/unlike/:roomId', authMiddleware, async (req, res) => {
  try {
    const { roomId } = req.params;
    const userId = req.user._id.toString();

    const room = await Room.findById(roomId);
    if (!room) {
      return res
        .status(404)
        .json({ success: false, message: 'Room not found' });
    }

  
    if (!room.likes.includes(userId)) {
      return res
        .status(400)
        .json({ success: false, message: 'Room not in liked list' });
    }

   
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

router.put('/book/:id', async (req, res) => {
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
