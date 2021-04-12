const mongoose = require('mongoose');

const inventorySchema = mongoose.Schema({
    items: [
        {
            item_id: {
                type: mongoose.Schema.Types.ObjectId
            }
        }
    ],
    admin_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    group_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
})

const Inventory = mongoose.model("Inventory", inventorySchema);

module.exports = Inventory;