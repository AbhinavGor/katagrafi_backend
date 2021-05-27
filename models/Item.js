const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
    item_name: {
        type: String,
        required: true
    },
    item_image: {
        type: Buffer
        //convert to string
    },
    quantity:{
        type: Number
    },
    unit: {
      type: String
    },
    item_type: {
        type: String,
        required: true
    },
    allergic_ingredients: [
        {
            ingr_name: {
                type: String
            },
            allergy_triggers: {
                type: String
            }
        }
    ],

    //expiry delete (unix timestamp)
    group_id: {
        type: mongoose.Schema.Types.ObjectId
    }
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
