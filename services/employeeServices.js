const Employee = require('../models/employeeModel')

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
    console.log(emp)
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
    console.log(emp)
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

module.exports.getEmployees = getEmployees
module.exports.createEmployee = createEmployee
module.exports.getEmployee = getEmployee
