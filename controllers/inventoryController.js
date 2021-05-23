const Inventory = require('../models/Inventory');
const Item = require('../models/Item');
const mongoose = require('mongoose');

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

exports.addItem =  async (req, res) => {
  try{
    const { item_name, item_image, quantity, item_type, allergic_ingredients } = req.body;
    const inventoryId = req.params.inv_id;

    const foundItem = await Item.findOne({ item_name: item_name });
    const foundInv = await Inventory.findOne({ _id: mongoose.Schema.Types.ObjectId(inventoryId)});

    if(foundInv){
      if(foundItem){
          foundInv.items.concat(foundItem._id);
      }else{
        const newItem = {
          item_name, item_image, quantity, item_type, allergic_ingredients
        }

        await newItem.save();

        const newIt = await Item.findOne({ item_name: item_name });

        foundInv.items.concat(newIt._id);
      }
    }else{
      res.status(404).send({"message": `Inventory with id ${inventoryId} not found!`});
    }
  }catch(e){
    res.status(500).send(e);
  }
}

exports.getInventoryItems = async (req, res) => {
  const inv_id = req.params.inv_id;

  try {

      const foundInv = await Inventory.findOne({ _id: mongoose.Schemas.Types.ObjectId(inv_id)});

      if(foundInv){
        res.status(200).send({invItems: foundInv.items});
      }else{
        res.status(404).send({"message": `Inventory with id ${inventoryId} not found!`});
      }

  } catch (e) {
      res.status(500).send(e);
  } finally {

  }
}
