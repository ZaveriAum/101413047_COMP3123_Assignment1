const express = require('express')
const router = express.Router()
const controller = require('../controllers/employeeController')

router.use(express.json())

router.get('/employees/:id', (req, res)=>{
    controller.getEmployee(req, res)
})

router.get('/employees', (req, res)=>{
    controller.getEmployees(req, res)
})

router.post('/employees', (req, res)=>{
    controller.createEmployee(req, res)
})



module.exports = router