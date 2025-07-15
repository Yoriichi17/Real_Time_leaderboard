const { Router } = require('express');
const { generatePoints } = require('../controllers/coins.controller')
const router = Router()

router.route('/givePoints/:user_id').post(generatePoints)

module.exports = router;