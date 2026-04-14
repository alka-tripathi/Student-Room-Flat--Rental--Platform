const Room = require('../Models/Room');
const { uploadOnCloudinary } = require('../services/cloudinary');

const addRoom = async (req, res) => {
  try {
    // Validate images
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'At least one image is required',
      });
    }

    // Upload all images to Cloudinary
    const uploadPromises = req.files.map((file) =>
      uploadOnCloudinary(file.path, 'room-images'),
    );

    const uploadedImages = await Promise.all(uploadPromises);

    // Check if all uploads were successful
    if (!uploadedImages || uploadedImages.some((img) => !img)) {
      return res.status(500).json({
        success: false,
        message: 'Failed to upload one or more images to Cloudinary',
      });
    }

    // Extract URLs from uploaded images
    const imageUrls = uploadedImages.map((img) => img.url);

    // Create new room with Cloudinary URLs
    const newRoom = new Room({
      ...req.body,
      images: imageUrls,
    });

    const savedRoom = await newRoom.save();

    res.status(201).json({
      success: true,
      message: 'Room added successfully',
      room: savedRoom,
    });
  } catch (error) {
    // Clean up any uploaded files in case of error
    if (req.files) {
      const fs = require('fs/promises');
      for (const file of req.files) {
        try {
          await fs.unlink(file.path);
        } catch (e) {
          console.error('Error cleaning up file:', file.path);
        }
      }
    }

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = addRoom;
