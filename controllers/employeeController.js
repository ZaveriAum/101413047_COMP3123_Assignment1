const service = require('../services/employeeServices')

// getting all employees from the database
const getEmployees = (req, res) => {
    service.getEmployees(req, res)
}

// create an employee into the database
const createEmployee = (req, resolve) => {
    service.createEmployee(req, res)
}

// get a employee with the given eid from the employee id
const getEmployee = (req, res) => {
    service.getEmployee(req, res)
}

// update employee information
const updateEmployee = (req, res) => {
    service.updateEmployee(req, res)
}

// delete employee from the given id
const deleteEmployee = (req, res) => {
    service.deleteEmployee(req, res)
}

const searchEmployee = (req, res) => {
    service.searchEmployee(req, rest)
}

// exporting all the functions.
module.exports = {
    getEmployees,
    createEmployee,
    getEmployee,
    updateEmployee,
    deleteEmployee,
    searchEmployee
};