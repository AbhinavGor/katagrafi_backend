const router = require('express').Router();

const { userAuth, getUsers, getInvUsers, getGroupUsers } = require('../controllers/userController');
const { adminAuth } = require('../middleware/auth');

router.post('/login', userAuth);

router.get('/userList', adminAuth, getUsers);

router.get('/userList/grp=:grp_id', adminAuth, getGroupUsers);

//user updation route
module.exports = router;
