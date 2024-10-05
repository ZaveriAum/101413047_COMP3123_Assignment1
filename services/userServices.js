const User = require('../models/userModel')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

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
        let hashed_pass = bcrypt.compare(userPassword, curr_user.password)
        if(hashed_pass)
            res.status(202).send(JSON.stringify({"message":"Login successful"}))
        else
            res.status(401).send(JSON.stringify({"message":"Login unsuccessfull incorrect password try again!"}))
    }else
        res.status(401).send(JSON.stringify({"message":"Login unsuccessfull incorrect email try again!"}))
    
}

module.exports.signup = signup
module.exports.login = login