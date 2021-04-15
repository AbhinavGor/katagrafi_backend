const router =  require('express').Router();

const { createInventory } = require('../controllers/inventoryController');
const { adminAuth } = require('../middleware/auth');

router.post('/createInventory/admin=:admin_id/group=:group:id', adminAuth, createInventory);

module.exports = router;