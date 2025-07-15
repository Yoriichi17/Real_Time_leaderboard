const { Router } = require('express');
const {register,getUsers,searchUsers} = require('../controllers/user.controller');
const upload = require('../middlewares/multer.middleware');
const router = Router()

router.route('/register').post(upload.single('avatar') , register)
router.route('/fetchUsers').get(getUsers)
router.route('/searchUsers').get(searchUsers)

module.exports = router;