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
const getEmployees = async (req, res, next) => {
    try {
        res.status(200).send(JSON.stringify(await Employee.find({})))
    } catch (e) {
        res.error(e)
    }
}

// creating employee from the req body
const createEmployee = async (req, res, next) => {
    try {
        let { first_name, last_name, email, position, salary, date_of_joining, department } = req.body
        let emp = await findEmployeeE(email)
        // if the emp found is null then create new employee
        if (emp === null) {
            let new_emp = Employee({ first_name: first_name, last_name: last_name, email: email, position: position, salary: salary, date_of_joining: date_of_joining, department: department })
            await new_emp.save().then((data) => {
                res.status(201).send(JSON.stringify({ "message": "Employee created successfully", "employee_id": `${data.id}` }))
            }).catch((err) => {
                res.send(`Error: ${err}`)
            })
        } else {
            res.send(JSON.stringify({ "status": false, "message": "Entered email already exists." }))
        }
    } catch (err) {
        res.send(e)
    }
}

// get specific employee
const getEmployee = async (req, res, next) => {
    try {
        let emp = await Employee.findById(req.params.id)

        // if the list is not null then return all the employees
        if (emp !== null) {
            try {
                res.status(200).send(JSON.stringify(emp))
            } catch (e) {
                res.error(e)
            }
        } else {
            res.send(JSON.stringify({ "status": false, "message": "Employee with given id does not exists." }))
        }
    } catch (e) {
        res.send(e)
    }
}

const updateEmployee = async (req, res, next) => {
    // try to find the employee from id if it exists then update it or else return err.
    try {
        let emp = await Employee.findById(req.params.eid)
        if (emp === null) {
            return res.status(404).send("Invalid email id.")
        }

        let employee = await Employee.findOneAndUpdate({ _id: req.params.eid }, { ...req.body, updated_at: new Date() }, { new: true })

        console.log(employee)

        res.status(200).send(JSON.stringify({ "message": "Employee details updated successfully" }))
    } catch (e) {
        res.send(e)
    }
}

// delete employee from id
const deleteEmployee = async (req, res, next) => {
    // try to find the emp from id if exists then delete or else return no employee with the given id.
    try {
        if (!mongoose.Types.ObjectId.isValid(req.query.eid)) {
            return res.status(400).send('Invalid ID format');
        }

        const deletedUser = await Employee.findOneAndDelete({ _id: req.query.eid })

        if (!deletedUser) {
            return res.status(400).send('Employee not found')
        }
        res.status(204).send(JSON.stringify({ "message": "Employee delete successfully." }))
    } catch (e) {
        res.status(500).send(e)
    }

}

const searchEmployee = async (req, res, next) => {
    try {
        let search_query = req.params.search_query
        const results = await Employee.find({
            $or: [
                { position: { $regex: search_query, $options: 'i' } },
                { department: { $regex: search_query, $options: 'i' } },
            ],
        });
        res.send(JSON.stringify(results));
    } catch (error) {
        res.status(500).send(error.message);
    }
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