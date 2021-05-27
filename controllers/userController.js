const { response } = require('express');
const User = require('../models/User');
const Group = require('../models/Group');

const { all } = require('../routers/userRoutes');
const jwt = require('jsonwebtoken');

exports.userAuth = async (req, res) => {
    const { uid, user_name, user_image, email, user_type, dob, allergy_triggers, medications, group_id } = req.body;

    const foundUser = await User.findOne({ email: email });

    if(!foundUser){
        const newUser = new User({
            uid, user_name, user_image, email, user_type, dob, allergy_triggers, medications, group_id
        });

        await newUser.save();

        const foundUser = await User.findOne({ email: email });

        // console.log(foundUser);

        const token = jwt.sign({ _id: foundUser._id.toString(), user_type: foundUser.user_type}, process.env.SESSION_SECRET);
        // console.log(token);
        res.status(200).send({
            "message": `Successfully created a new user with email ${email}.`,
            newUser: foundUser,
            token
        });

    }else{
        const token = jwt.sign({ _id: foundUser._id.toString(), user_type: foundUser.user_type}, process.env.SESSION_SECRET);
        // console.log(token);
        res.status(200).send({foundUser: foundUser, token});
    }
}

exports.getUsers = async (req, res) => {
    try {
        const allUsers = await User.find({});

        if(allUsers){
            res.status(200).send(allUsers);
        }else{
            res.status(404).send({"message": "No users found. Please try again later!"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({error});
    }
}

exports.getGroupUsers = async (req, res) => {
  try {
    const { grp_id } = req.params;

    const grpUsers = await Group.findOne({ _id: grp_id });

    console.log(grpUsers);

    if(grpUsers){
      res.status(200).send({"inv_users": grpUsers.user_ids});
    }else{
      res.status(404).send({"message": `No users found in inventory with ID: ${inv_id}.`});
    }
  } catch (e) {
      res.status(500).send({"error": e});
  }
}
