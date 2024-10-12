// importing mongoose module
const mongoose = require('mongoose')

// creating schema for user
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
})


// exporting user model
module.exports = mongoose.model('User', userSchema)