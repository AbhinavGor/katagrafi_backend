require('dotenv').config();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { default: validator } = require('validator');

const userSchema = mongoose.Schema({
    user_name: {
        type: String,
        required: true
    },
    user_image: {
        type: Buffer
    },
    email:{
        type: String,
        lowercase:  true,
        unique: true,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    allergy_triggers: {
        type: String
    },
    medications: {
        type: String
    },
    group_id: {
        type: mongoose.Schema.Types.ObjectId
    }

});

userSchema.methods.generateToken = async () => {
    const foundUser = this;
    const token = jwt.sign({ _id: foundUser._id.toString(), userType: foundUser.userType.toString()}, process.env.SESSION_SECRET);

    foundUser.tokens = foundUser.tokens.concat({ token });

    await foundUser.save();

    return token;
}

const User = mongoose.model("User", userSchema);

module.exports = User;