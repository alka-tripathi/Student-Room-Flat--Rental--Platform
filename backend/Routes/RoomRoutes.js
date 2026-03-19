const router = require('express').Router();
const addRoom = require('../Controllers/RoomController');
const roomValidation = require('../Middleware/RoomValidation');
const upload = require('../Middleware/upload');

router.post('/addroom', upload.single('image'), roomValidation, addRoom);

module.exports = router;
