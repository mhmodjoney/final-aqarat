const express =require('express');
const router = express.Router();
const favController =require('../controllers/favController')
// here are auth routs will be...
router.post('/add',favController.add)
router.post('/remove',favController.remove)
router.post('/list',favController.list)

module.exports = router;