const express = require('express')
const mongoose = require('mongoose')
const app = express()
let userRoutes = require('./routes/userRoutes')// getting the user routes
let employeeRoutes = require('./routes/employeeRoutes')// getting the employee routes
const SERVER_PORT = process.env.SERVER_PORT || 5000
const cors = require('cors')
require('dotenv').config()

// front end and back end could communicate with this
app.use(cors({
    origin: [ 'https://101413047-comp3123-assignment2-reactjs.vercel.app', 'http://localhost:3000'], // fronend
    credentials: true, // so that when cookies are asked for authentication it works
}));

// home route
app.get('/', (req, res) => {
    res.send("Hello Assignment 1")
})

// end point /api/v1/user
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/emp', employeeRoutes)


// Connecting to the mongo db 
mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
    .then(() => {
        console.log("Connection open!!")
    }).catch((err) => {
        console.log("Error: " + err)
    })

// listing at port 3000
app.listen(SERVER_PORT, () => {
    console.log(`Server listining to http://localhost:${SERVER_PORT}`)
})
