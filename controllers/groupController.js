const mongoose = require('mongoose');

const Group = require('../models/Group');

exports.createGroup = async (req, res) => {
    try {
        const { group_name } = req.body;
        const user_id = {
            user_id: mongoose.Schema.Types.ObjectId(req.user._id),
            user_name: req.user.user_name
        }

        const user_ids = [ user_id ]

        const newGroup = new Group({
            group_name, user_ids
        });

        await newGroup.save();

        res.status(200).send({
            "message": `New group, ${group_name} created!`,
            "group": newGroup
        });
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.addInventoryToGroup = async (req, res) => {
    try {
        const { group_id, inventory_id } = req.params;
        const foundGroup = await Group.findOne({_id: mongoose.Schema.Types.ObjectId(group_id)});

        if(foundGroup){
            foundGroup.inventory_id = inventory_id;

            await foundGroup.save();

            res.status(200).send({
                "message": `Inventory ${inventory_id} added to group ${group_id}.`,
                "updatedGroup": foundGroup
            });
        }else{
            res.status(500).send({
                "message": `No group with ID ${group_id} found! Please try again with a valid group ID.`
            });
        }
    } catch (error) {
        res.status(500).send(error)
    }
}