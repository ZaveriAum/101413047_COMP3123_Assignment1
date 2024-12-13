const express = require('express');
const { body, param, query, validationResult } = require('express-validator');
const router = express.Router();
const controller = require('../controllers/employeeController');
const cookieAuthJwt = require('../middleware/cookieAuthJwt')
const cookieParser = require("cookie-parser");

// defining the middleware
router.use(cookieParser())
router.use(express.json())
router.use(express.urlencoded({ extended: true }))

// getting the errors from req.
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// validating the id send from the req
const checkValidObjectId = (field) => param(field).isMongoId().withMessage('Invalid employee ID format');

// route to get a specific employee where employee id is taken from route params
router.get('/employees/:id',
    checkValidObjectId('id'),
    cookieAuthJwt.authenticateToken,
    handleValidationErrors,
    controller.getEmployee
);

// route to get all the employees in the dbs
router.get('/employees', cookieAuthJwt.authenticateToken, controller.getEmployees);

// route to create an employee from the given information form req
router.post('/employees',
    [
        body('first_name').isLength({ min: 2 }).withMessage('First name is required'),
        body('last_name').isLength({ min: 2 }).withMessage('Last name is required'),
        body('email').isEmail().withMessage('Valid email is required'),
        body('position').isLength({ min: 2 }).withMessage('Position is required'),
        body('salary').isNumeric().withMessage('Salary must be a number'),
        body('department').isLength({ min: 2 }).withMessage('Department is required')
    ],
    cookieAuthJwt.authenticateToken,
    handleValidationErrors,
    controller.createEmployee
);

// route to edit the employee
router.put('/employees/:eid',
    [
        checkValidObjectId('eid'),
        body('first_name').isLength({ min: 2 }).withMessage('First name is required'),
        body('last_name').isLength({ min: 2 }).withMessage('Last name is required'),
        body('email').isEmail().withMessage('Valid email is required'),
        body('position').isLength({ min: 2 }).withMessage('Position is required'),
        body('salary').isNumeric().withMessage('Salary must be a number'),
        body('department').isLength({ min: 2 }).withMessage('Department is required')
    ],
    cookieAuthJwt.authenticateToken,
    handleValidationErrors,
    controller.updateEmployee
);

// route to delete the employee where we get the employee id query parameter
router.delete('/employees',
    cookieAuthJwt.authenticateToken,
    handleValidationErrors,
    controller.deleteEmployee
);

router.get('/search/:search_query', cookieAuthJwt.authenticateToken, handleValidationErrors, controller.searchEmployee);

// exporting router to the index.js
module.exports = router;
