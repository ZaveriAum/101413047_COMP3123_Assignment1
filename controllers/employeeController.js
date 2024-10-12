const service = require('../services/employeeServices')

// getting all employees from the database
const getEmployees = (req, res, next) => {
    service.getEmployees(req, res, next)
}

// create an employee into the database
const createEmployee = (req, res, next) => {
    service.createEmployee(req, res, next)
}

// get a employee with the given eid from the employee id
const getEmployee = (req, res, next) => {
    service.getEmployee(req, res, next)
}

// update employee information
const updateEmployee = (req, res, next) => {
    service.updateEmployee(req, res, next)
}

// delete employee from the given id
const deleteEmployee = (req, res, next) => {
    service.deleteEmployee(req, res, next)
}

// exporting all the functions.
module.exports = {
    getEmployees,
    createEmployee,
    getEmployee,
    updateEmployee,
    deleteEmployee
};