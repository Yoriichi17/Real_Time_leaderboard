const multer = require('multer');

// Configure disk storage for uploaded files
const storage = multer.diskStorage({
  
  destination: function (req, file, cb) {
    cb(null, './public/avatars'); // Set destination folder for avatar uploads
  },


  filename: function (req, file, cb) {
    // Generate a unique filename for each upload
    const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9); 
    cb(null, uniquePrefix + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
