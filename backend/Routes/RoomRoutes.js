const router = require('express').Router();

const upload = require('../Middleware/upload');
const Room = require('../models/Room');
const newRoomValidate = require('../Middleware/newRoomValidator');
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

module.exports = router;
