const mongoose = require('mongoose')

// Creating schema for employee db
const employeeSchema = new mongoose.Schema({
    "first_name": String,
    "last_name": String,
    "email": String,
    "position": String,
    "salary": Number,
    "date_of_joining": Date,
    "department": String,
    "created_at": { type: Date, default: Date.now },
    "updated_at": { type: Date, default: Date.now }
})

employeeSchema.index({ first_name: 'text', department: 'text' })

// exporting the employee model
module.exports = mongoose.model('Employee', employeeSchema)