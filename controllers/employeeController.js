const service = require('../services/employeeServices')

const getEmployees = (req, res, next)=>{
    service.getEmployees(req, res, next)
}

const createEmployee = (req, res, next)=>{
    service.createEmployee(req, res, next)
}

const getEmployee = (req, res, next)=>{
    service.getEmployee(req, res, next)
}

module.exports.getEmployees = getEmployees
module.exports.createEmployee = createEmployee
module.exports.getEmployee = getEmployee
