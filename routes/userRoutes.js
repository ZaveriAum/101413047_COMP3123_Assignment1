const express = require('express')
let router = express()
const controller = require('../controllers/userController')
const { body, validationResult } = require('express-validator')

router.use(express.json())
router.use(express.urlencoded({extended:true}))

router.post('/signup',
    [
        body('username').exists().withMessage('Username is required').bail().isString().withMessage('Username must be a string.').notEmpty().withMessage('Username cannot be empty.'),
        body('email').isEmail().withMessage('Entered format is incorrect.'),
        body('password').isLength({min:8}).withMessage('Password must be 8 characters long.')
    ],
    (req, res)=>{
        let err = validationResult(req)
        if(err.isEmpty())
            controller.signup(req, res)
        else
            return res.status(400).json({ errors:err.array() })
    })

router.post('/login', 
[
    body('email').isEmail().withMessage("Username cannot be empty"),
    body('password').notEmpty().withMessage('Password cannot be empty')
],
(req, res)=>{
    let err = validationResult(req)
    if(err.isEmpty())
        controller.login(req, res)
    else
        return res.status(400).json({errors:err.array()})
})

module.exports = router