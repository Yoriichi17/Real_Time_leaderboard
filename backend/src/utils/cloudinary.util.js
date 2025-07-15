const v2 = require('cloudinary').v2;
const fs = require('fs');

// Configure Cloudinary with credentials from .env
v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Upload a file to Cloudinary and remove it from local storage
const uploadOnCloud = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    // Upload the file (auto-detect type: image, video, etc.)
    const response = await v2.uploader.upload(localFilePath, {
      resource_type: "auto"
    });

    // Delete local file after successful upload
    fs.unlinkSync(localFilePath);
    console.log(response.url);
    return response;

  } catch (error) {
    console.error("Upload failed:", error);

    // Delete file if upload fails and file still exists
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    return null;
  }
};

module.exports = uploadOnCloud;
