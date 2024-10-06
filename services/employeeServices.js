const Employee = require('../models/employeeModel')
const mongoose = require('mongoose')
const findEmployeeE = async (empEmail)=>{
    try{
        return await Employee.findOne({email:empEmail})
    }catch(e){
        console.error(e)
    }
}


const getEmployees = async (req, res, next)=>{
    try{
        res.status(200).send(JSON.stringify(await Employee.find({})))
    }catch(e){
        res.error(e)
    }
}

const createEmployee = async(req, res, next)=>{

    let { first_name, last_name, email, position, salary, date_of_joining, department } = req.body
    let emp = await findEmployeeE(email)

    if(emp === null){
        let new_emp = Employee({first_name:first_name, last_name:last_name, email:email,position:position,salary:salary, date_of_joining:date_of_joining, department:department})
        await new_emp.save().then((data)=>{
            res.status(201).send(JSON.stringify({"message":"Employee created successfully", "employee_id":`${data.id}`}))
        }).catch((err)=>{
            res.send(`Error: ${err}`)
        })
    }else{
        res.send(JSON.stringify({"status":false, "message":"Entered email already exists."}))
    }
}

const getEmployee = async(req, res, next)=>{
    let empId = req.params.id
    let emp = await Employee.findById(req.params.id)

    if(emp !== null){
        try{
            res.status(200).send(JSON.stringify(emp))
        }catch(e){
            res.error(e)
        }
    }else{
        res.send(JSON.stringify({"status":false, "message":"Employee with given id does not exists."}))
    }
}

const updateEmployee = async(req, res, next)=>{
    try{
        let emp = await Employee.findById(req.params.id)
        if (emp === null){
            return res.status(404).send("Invalid email id.")
        }

        let employee = await Employee.findOneAndUpdate({_id:req.params.eid}, {...req.body, updated_at:new Date()}, { new: true})

        console.log(employee)

        res.status(200).send(JSON.stringify({"message":"Employee details updated successfully"}))
    }catch(e){
        res.send(e)
    }
}

const deleteEmployee = async (req, res, next)=>{
    try{
        if (!mongoose.Types.ObjectId.isValid(req.query.eid)) {
            return res.status(400).send('Invalid ID format');
        }

        const deletedUser = await Employee.findOneAndDelete({_id:req.query.eid})

        if(!deletedUser){
            return res.status(400).send('Employee not found')
        }
        res.status(204).send(JSON.stringify({"message":"Employee delete successfully."}))
    }catch(e){
        res.status(500).send(e)
    }

}

module.exports.getEmployees = getEmployees
module.exports.createEmployee = createEmployee
module.exports.getEmployee = getEmployee
module.exports.updateEmployee = updateEmployee
module.exports.deleteEmployee = deleteEmployee
