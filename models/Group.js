const mongoose = require('mongoose');

const groupSchema = mongoose.Schema({
    group_name: {
        type: String,
        required: true
    },
    user_ids: [
        {
            user_id: {
                type: mongoose.Schema.Types.ObjectId
            },
            user_name: {
                type: String
            }
        }
    ],
    inventory_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;