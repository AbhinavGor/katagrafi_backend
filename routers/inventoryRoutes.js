const router =  require('express').Router();

const { createInventory, addItem } = require('../controllers/inventoryController');
const { adminAuth } = require('../middleware/auth');

router.post('/createInventory/admin=:admin_id/group=:group:id', adminAuth, createInventory);

router.post('/addItem/inv=:inv_id', addItem);

module.exports = router;
