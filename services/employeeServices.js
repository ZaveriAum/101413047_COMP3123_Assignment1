const Employee = require('../models/employeeModel')
const mongoose = require('mongoose')
require('dotenv').config()

const DIGEST_AUTH = `${process.env.ATLAS_API_PUBLIC_KEY}:${process.env.ATLAS_API_PRIVATE_KEY}`

// finding employee with their email
const findEmployeeE = async (empEmail) => {
    try {
        return await Employee.findOne({ email: empEmail })
    } catch (e) {
        console.error(e)
    }
}

// getting all the employees in the database
const getEmployees = async () => {
    return await Employee.find({});
}

// creating employee from the req body
const createEmployee = async (employeeData) => {
    let { first_name, last_name, email, position, salary, date_of_joining, department } = employeeData
    let existing_emp = await findEmployeeE(email)
    // if the emp found is null then create new employee
    if (!existing_emp) {
        throw new Error("Employee with the email already exists.")
    } 
    let new_emp = Employee({ first_name: first_name, last_name: last_name, email: email, position: position, salary: salary, date_of_joining: date_of_joining, department: department })
    return await new_emp.save();

}

// get specific employee
const getEmployee = async (id) => {
    let emp = await Employee.findById(id)
    if(!emp){
        throw new Error("Employee doesn't exists")
    }
    return emp;
}

const updateEmployee = async (id, updatedEmp) => {
    // try to find the employee from id if it exists then update it or else return err.
    let emp = await getEmployee(id)
    if (!emp) {
        throw new Error("Employee doesn't exists")
    }
    return await Employee.findOneAndUpdate({ _id: id }, { ...updatedEmp, updated_at: new Date() }, { new: true })
}

// delete employee from id
const deleteEmployee = async (id) => {
    return await Employee.findOneAndDelete({ _id: id })
}

const searchEmployee = async (search_query) => {
    return await Employee.find({
        $or: [
            { position: { $regex: search_query, $options: 'i' } },
            { department: { $regex: search_query, $options: 'i' } },
        ],
    });    
}

// export functions to employee controller
module.exports = {
    getEmployees,
    createEmployee,
    getEmployee,
    updateEmployee,
    deleteEmployee,
    searchEmployee
};