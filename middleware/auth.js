const jwt = require('jsonwebtoken');

const User = require('../models/User');

const adminAuth = (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer", "");
        const decodedToken = jwt.verify(token, process.env.SESSION_SECRET);

        if(decodedToken.userType !== 1){
            throw new Error()
        }

        next();
    } catch (error) {
        res.status(500).send({"message": "You are not the administrator!"});
    }
}

module.exports = {adminAuth};