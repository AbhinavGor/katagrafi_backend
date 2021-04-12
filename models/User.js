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

const User = mongoose.model("User", userSchema);

module.exports = User;