const jwt = require("jsonwebtoken")
require('dotenv').config()

// Authenticating the token taken from the header and verifying for user info converting token to the user.
const authenticateToken = (req, res, next) => {
    console.log("Inside authenticate")
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "User is not authorized" });
    }
    try {
        console.log(token)
        const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = user;
        next();
    }
    catch (err) {
        return res.status(401).json({ message: "User is not authorized" });
    }
}

module.exports = {
    authenticateToken
}