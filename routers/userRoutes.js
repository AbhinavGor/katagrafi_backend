const router = require('express').Router();

const userController = require('../controllers/userController');
const { adminAuth } = require('../middleware/auth');

router.post('/login', userController.userAuth());

router.get('/userList', adminAuth, userController.getUsers());

module.exports = router;