const express =require('express');
const router = express.Router();
const favController =require('../controllers/favController')
const ensureAuth = require('../middlewares/authMiddleware');
// here are auth routs will be...
router.post('/add',ensureAuth,favController.add)
router.post('/remove',ensureAuth,favController.remove)
router.post('/list',ensureAuth,favController.list)

module.exports = router;