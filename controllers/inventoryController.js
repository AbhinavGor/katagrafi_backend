const Inventory = require('../models/Inventory');

exports.createInventory = async (req, res) => {
    try {
        const admin_id = req.params.admin_id;
        const group_id = req.params.group_id
        const { items, inventory_name } = req.body;

        const newInventory = new Inventory({
            items, admin_id, group_id, inventory_name
        });

        await newInventory.save();

        res.status(200).send({
            "message": `New inventory, ${inventory_name} created!`
        });
    } catch (error) {
        res.status(500).send({
            "message": "Error occurred while making a new inventory, please try again later!"
        });
    }
}