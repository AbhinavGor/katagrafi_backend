require('dotenv').config();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { default: validator } = require('validator');

const userSchema = mongoose.Schema({
  uid: {
    type: String
  },
    user_name: {
        type: String,
        required: true
    },
    user_image: {
        type: String
    },
    email:{
        type: String,
        lowercase:  true,
        unique: true,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    allergy_triggers: {
        type: String
    },
    medications: {
        type: String
    },
    user_type: {
      type: Number
    },
    group_id: {
        type: mongoose.Schema.Types.ObjectId
    }

});

userSchema.methods.generateToken = async () => {
    const foundUser = this;
    console.log(foundUser);
    const token = jwt.sign({ _id: foundUser._id.toString(), user_type: foundUser.user_type}, process.env.SESSION_SECRET);

    console.log(token);

    return token;
}

const User = mongoose.model("User", userSchema);

module.exports = User;
