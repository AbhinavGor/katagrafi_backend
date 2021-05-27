const router =  require('express').Router();

const { createInventory, addItem, getInventoryItems, deleteItem } = require('../controllers/inventoryController');
const { adminAuth } = require('../middleware/auth');

router.post('/createInventory/admin=:admin_id/group=:group_id', adminAuth, createInventory);

router.get('/getItems/inv=:inv_id', getInventoryItems);

router.post('/addItem/inv=:inv_id', addItem);

router.delete('/deleteItem/inv=:inv_id/item=:itm_id', deleteItem);

module.exports = router;
