const router = require('express').Router();
const addRoom = require('../Controllers/RoomController');
const roomValidation = require('../Middleware/RoomValidation');

router.post('/newroom', roomValidation, addRoom);

module.exports = router;
