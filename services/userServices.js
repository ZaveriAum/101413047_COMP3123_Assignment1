require('dotenv').config()

const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const findUser = async function(userEmail){
    try{
        // .exec() method makes the return a promise. 
        return await User.findOne({email:userEmail});
    }catch(e){
        console.log("Error: " + e)
    }
}

const signup = async (req, res, next)=>{
    let userName = req.body.username
    let userEmail =  req.body.email
    let userPassword =  req.body.password

    let curr_user = await findUser(userEmail)

    if(curr_user === null){

        let hashed_pass = await bcrypt.hash(userPassword, 12)
        let new_user = new User({username:userName, email:userEmail, password:hashed_pass})

        await new_user.save().then((data)=>{
            res.status(201).send(JSON.stringify({"message":"User created successfully", "user_id":`${data.id}`}))
        }).catch((err)=>{
            res.send(`Error: ${err}`)
        })
    }else{
        res.send(JSON.stringify({"status":false, "message":"Entered email already exists."}))
    }
}

const login = async (req, res, next)=>{
    let userEmail = req.body.email
    let userPassword = req.body.password

    let curr_user = await findUser(userEmail)
    if(curr_user !== null){
        let payload = {
            email:userEmail,
            password:userPassword
        }
        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET)
        let hashed_pass = bcrypt.compare(userPassword, curr_user.password)
        if(hashed_pass)
            res.status(200).send(JSON.stringify({"message":"Login successful", "accessToken":accessToken}))
        else
            res.status(401).send(JSON.stringify({"message":"Login unsuccessfull incorrect password try again!"}))
    }else
        res.status(401).send(JSON.stringify({"message":"Login unsuccessfull incorrect email try again!"}))
    
}

const user_info = async (req, res, next)=>{
    let user = await findUser(req.user.email)
    res.send(JSON.stringify(user))
}

const authenticateToken = (req, res, next)=>{
    const authHeader = req.headers['authorization']
    // if the header has the token then split it form the space and provide the second element
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.status(401).send(JSON.stringify({"error":"You do not have access."}))

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user)=>{
        if (err) return res.status(403).send(JSON.stringify({"error":"Token provided is not a valid token"}))
    
        req.user = user
        next()
    })
}

module.exports.signup = signup
module.exports.login = login
module.exports.user_info = user_info
module.exports.authenticateToken = authenticateToken