const router = require('express').Router();

const upload = require('../middleware/upload');
const Room = require('../Models/Room');

const newRoomValidate = require('../middleware/newRoomValidator');
const authMiddleware = require('../middleware/Auth');
const newRoomController = require('../controllers/RoomController');

router.post(
  '/addroom',
  authMiddleware,
  upload.array('images', 5),
  newRoomValidate,
  newRoomController,
);

router.get('/getrooms', async (req, res) => {
  try {
    const rooms = await Room.find().sort({ createdAt: -1 });

    res.json(rooms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//  GET LIKED ROOMS 
router.get('/liked_rooms', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id; 

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

//get all booked rooms of a user (only booked by that user)
router.get('/booked_rooms', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const bookedRooms = await Room.find({
      bookedBy: userId, //  ONLY this user’s bookings
    }).populate('bookedBy', 'name email');

    res.json({
      success: true,
      rooms: bookedRooms,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//find room by id
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

//like a card only if it is not already liked by the user
router.post('/like/:roomId', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id.toString(); 

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

//unlike a room liked by the user only if it is in liked list
router.delete('/unlike/:roomId', authMiddleware, async (req, res) => {
  try {
    const { roomId } = req.params;
    const userId = req.user.id.toString(); 

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

//booked  a room is available and not booked by someone else

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

    
    room.bookedBy = req.user.id;

    await room.save();

    res.json({
      success: true,
      message: 'Room booked successfully',
      room,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



//unbook route (only owner or booked user can unbook)
router.put('/unbook/:id', authMiddleware, async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);

    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    // only owner or booked user can unbook (basic safety)
    if (room.bookedBy?.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not allowed' });
    }

    room.available = true;
    room.bookedBy = null;

    await room.save();

    res.json({
      success: true,
      message: 'Room unbooked successfully',
      room,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
