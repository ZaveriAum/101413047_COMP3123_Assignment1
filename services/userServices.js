require('dotenv').config()

const User = require('../models/userModel')
// For encryption bcrypt is used
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// find the user from the given email
const findUser = async function (userEmail) {
    // try to return employee after finding using email
    try {
        // .exec() method makes the return a promise. 
        return await User.findOne({ email: userEmail });
    } catch (e) {
        console.log("Error: " + e)
    }
}

// sign up 
const signup = async (req, res, next) => {
    // try finding employee from the given email from the body if the empoyee is null then go ahead and create the user or else entered already exists.
    try {
        let userName = req.body.username
        let userEmail = req.body.email
        let userPassword = req.body.password

        let curr_user = await findUser(userEmail)

        if (curr_user === null) {

            let hashed_pass = await bcrypt.hash(userPassword, 12)
            let new_user = new User({ username: userName, email: userEmail, password: hashed_pass })

            await new_user.save().then((data) => {
                res.status(201).send(JSON.stringify({ "message": "User created successfully", "user_id": `${data.id}` }))
            }).catch((err) => {
                res.send(`Error: ${err}`)
            })
        } else {
            res.send(JSON.stringify({ "status": false, "message": "Entered email already exists." }))
        }
    } catch (err) {
        res.send(err)
    }
}

// login to the user
const login = async (req, res, next) => {
    // from the given email try to find user if exists then check password matches then login
    try {
        let userEmail = req.body.email
        let userPassword = req.body.password

        let curr_user = await findUser(userEmail)

        if (curr_user !== null) {
            let payload = {
                email: userEmail,
            }
            const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET)// after logging jwt is send through a json store is somewhere and use it when you need authentication gain
            await bcrypt.compare(userPassword, curr_user.password, (err, result) => {// comparing the hashed pass and pass entered by user. returns true if the pass matches and false if it doen't.
                if (result)
                    res.status(200).send(JSON.stringify({ "message": "Login successful", "accessToken": accessToken }))
                else
                    res.status(400).json({ "message": "Incorrect Password" })
            })
        } else
            res.status(401).send(JSON.stringify({ "message": "Login unsuccessfull incorrect email try again!" }))
    } catch (err) {
        res.send(err)
    }
}

// Showcasing that jwt are working perfectly
const user_info = async (req, res, next) => {
    // trying to get the user info where as a middleware is authenicate Token to get the user info of user from the jwt
    try {
        let user = await findUser(req.user.email)
        res.send(JSON.stringify(user))
    } catch (err) {
        res.send(err)
    }
}

// Authenticating the token taken from the header and verifying for user info converting token to the user.
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    // if the header has the token then split it form the space and provide the second element
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.status(401).send(JSON.stringify({ "error": "You do not have access." }))

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).send(JSON.stringify({ "error": "Token provided is not a valid token" }))

        req.user = user
        next()
    })
}

// exporting functions to user controller
module.exports = {
    signup,
    login,
    user_info,
    authenticateToken
};
