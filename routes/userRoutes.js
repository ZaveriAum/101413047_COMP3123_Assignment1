const express = require('express')
let router = express()
const controller = require('../controllers/userController')

router.use(express.json())
router.use(express.urlencoded({extended:true}))

router.post('/signup', controller.create)

module.exports = router