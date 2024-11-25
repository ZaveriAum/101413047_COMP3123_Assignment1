const jwt = require("jsonwebtoken")
require('dotenv').config()

// Authenticating the token taken from the header and verifying for user info converting token to the user.
const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;
    try {
        const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = user;
        next();
    }
    catch (err) {
        throw new Error("User is not authorized")
    }
}

module.exports = {
    authenticateToken
}