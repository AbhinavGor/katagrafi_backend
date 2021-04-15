const router = require('express').Router();

const { createGroup, addInventoryToGroup } = require('../controllers/groupController');
const { adminAuth } = require('../middleware/auth');

router.post('/createGroup', adminAuth, createGroup);

router.patch('/addInventory/group=:group_id/add:inventory_id', adminAuth, addInventoryToGroup);

module.exports = router;