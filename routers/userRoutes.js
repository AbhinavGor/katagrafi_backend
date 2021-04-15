const router = require('express').Router();

const {userAuth, getUsers} = require('../controllers/userController');
const { adminAuth } = require('../middleware/auth');

router.post('/login', userAuth);

router.get('/userList', adminAuth, getUsers);

module.exports = router;