const { response } = require('express');
const User = require('../models/User');
const { all } = require('../routers/userRoutes');

exports.userAuth = async (req, res) => {
    const { user_name, user_image, email, dob, allergy_triggers, medications, group_id } = req.body;

    const foundUser = await User.findOne({ email: email });

    if(!foundUser){
        const newUser = new User({
            user_name, user_image, email, dob, allergy_triggers, medications, group_id
        });

        await newUser.save()

        const token = newUser.generateToken();
        res.status(200).send({
            "message": `Successfully created a new user with email ${email}.`,
            newUser: newUser,
            token: token
        });

    }else{
        const token = foundUser.generateToken();
        res.status(200).send({foundUser: foundUser, token: token});
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