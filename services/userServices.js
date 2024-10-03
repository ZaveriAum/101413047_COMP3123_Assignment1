const User = require('../models/userModel')
const mongoose = require('mongoose')

const findUser = async function(userName, userPassword){
    try{
        // .exec() method makes the return a promise. 
        return await User.findOne({username:userName, password:userPassword});
    }catch(e){
        console.log("Error: " + e)
    }
}

const create = async (req, res, next)=>{
    let userName = req.body.username
    let userEmail =  req.body.email
    let userPassword =  req.body.password

    let curr_user = await findUser(userName, userPassword)

    if(curr_user === null){


        let new_user = new User({username:userName, email:userEmail, password:userPassword})

        await new_user.save().then((data)=>{
            res.status(201).send(JSON.stringify({"message":"User created successfully", "user_id":`${data.id}`}))
        }).catch((err)=>{
            res.send(`Error: ${err}`)
        })
    }
}

module.exports.create = create