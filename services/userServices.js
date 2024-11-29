require('dotenv').config()

const User = require('../models/userModel')
// For encryption bcrypt is used
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// find the user from the given email
const findUser = async function (email) {
    // try to return employee after finding using email
    try {
        // .exec() method makes the return a promise. 
        return await User.findOne({ email: email });
    } catch (e) {
        throw new Error(e.message)
    }
}

// sign up 
const signup = async (userData) => {
    // try finding employee from the given email from the body if the empoyee is null then go ahead and create the user or else entered already exists.
    const { username, email, password } = userData;

    const existing_user = await findUser(email)

    if (existing_user) {
        throw new Error("User already exists with the given email.");
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ username, email, password: hashedPassword });

    return await newUser.save();

}

// login to the user
const login = async (userData) => {
    const { email, password } = userData;

    const existing_user = await findUser(email);
    if (!existing_user) {
        throw new Error("Invalid email or password");
    }

    const isPasswordCorrect = await bcrypt.compare(password, existing_user.password);
    if (!isPasswordCorrect) {
        throw new Error("Invalid email or password");
    }

    const payload = { email: email };
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1h",
    });

    return { user: existing_user, token: accessToken };
};


// Showcasing that jwt are working perfectly
const user_info = async (email) => {
    try {
        const user = await findUser(email);
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    } catch (e) {
        throw new Error(e.message);
    }
};

// exporting functions to user controller
module.exports = {
    signup,
    login,
    user_info
};
