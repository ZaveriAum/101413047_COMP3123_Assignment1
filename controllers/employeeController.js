const service = require('../services/employeeServices')

// getting all employees from the database
const getEmployees = async (req, res) => {
    try{
        const employees = await service.getEmployees()
        res.status(201).json({
            status: true,
            employees: employees,
        });
    }catch(e){
        res.status(400).json({
            status: false,
            message: e.message
        });
    }
}

// create an employee into the database
const createEmployee = async (req, res) => {
    try{
        const employee = await service.createEmployee(req.body)
        res.status(201).json({
            status: true,
            employee: employee,
        });
    }catch(e){
        res.status(400).json({
            status: false,
            message: e.message
        });
    }
}

// get a employee with the given eid from the employee id
const getEmployee = async (req, res) => {
    try{
        const employee = await service.getEmployee(req.params.id)
        res.status(201).json({
            status: true,
            employee: employee,
        });
    }catch(e){
        res.status(400).json({
            status: false,
            message: e.message
        });
    }
}

// update employee information
const updateEmployee = async (req, res) => {
    try{
        const new_emp = await service.updateEmployee(req.params.eid, req.body)
        res.status(201).json({
            status: true,
            employee: new_emp,
        });
    }catch(e){
        res.status(400).json({
            status: false,
            message: e.message
        });
    }
}
// delete employee from the given id
const deleteEmployee = async (req, res) => {
    try{
        const deleted_emp = await service.deleteEmployee(req.query.eid)
        res.status(204).json({
            status: true,
            deleted_employee: deleted_emp
        });
    }catch(e){
        res.status(400).json({
            status: false,
            message: e.message
        });
    }
}

const searchEmployee = async (req, res) => {
    try{
        const employees = await service.searchEmployee(req.params.search_query)
        res.status(201).json({
            status: true,
            employees: employees,
        });
    }catch(e){
        res.status(400).json({
            status: false,
            message: e.message
        });
    }
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