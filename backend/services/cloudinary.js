import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs/promises';

export const uploadOnCloudinary = async (
  localFilePath,
  folder = 'room-images',
) => {
  try {
    if (!localFilePath) throw new Error('localFilePath is required');

    const response = await cloudinary.uploader.upload(localFilePath, {
      folder: folder,
      resource_type: 'image',
    });

    await fs.unlink(localFilePath);

    return {
      url: response.secure_url,
      public_id: response.public_id,
    };
  } catch (error) {
    if (localFilePath) {
      try {
        await fs.unlink(localFilePath);
      } catch (unlinkError) {
        console.error('Error deleting local file:', unlinkError);
      }
    }

    console.error('Cloudinary Upload Error:', error);
    throw error;
  }
};
