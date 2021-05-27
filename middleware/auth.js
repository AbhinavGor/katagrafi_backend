const jwt = require('jsonwebtoken');

const User = require('../models/User');

const adminAuth = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer", "").trim();
        const decodedToken = jwt.verify(token, process.env.SESSION_SECRET);

        if(decodedToken.user_type !== 1){
            throw new Error()
        }

        req.user = await User.findOne({_id: decodedToken._id});
        next();
    } catch (error) {
        res.status(500).send({"message": "You are not the administrator!", e: error});
    }
}

module.exports = {adminAuth};
