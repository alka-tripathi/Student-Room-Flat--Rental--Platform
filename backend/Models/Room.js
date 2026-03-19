const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  available: {
    type: Boolean,
    default: true,
  },
  images: {
    type: [String],
    required: true,
    validate: {
      validator: function (value) {
        return value.length > 0; // at least 1 image required
      },
      message: 'At least one image is required',
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Room = mongoose.model('Room', RoomSchema);
module.exports = Room;
