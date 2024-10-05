const express = require('express')
const mongoose = require('mongoose')
const app = express()
let userRoutes = require('./routes/userRoutes')
let employeeRoutes = require('./routes/employeeRoutes')
const SERVER_PORT = process.env.SERVER_PORT || 3000


app.get('/', (req, res)=>{
    res.send("Hello Assignment 1")
})

// end point /api/v1/user
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/emp', employeeRoutes)

// Connecting to the mongo db 
mongoose.connect('mongodb://localhost:27017/comp3123_assignment1')
.then(()=>{
    console.log("Connection open!!")
}).catch((err)=>{
    console.log("Error: " + err)
})

app.listen(SERVER_PORT, ()=>{
    console.log(`Server listining to http://localhost:${SERVER_PORT}`)
})
