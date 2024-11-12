const express = require('express');
const { body, param, query, validationResult } = require('express-validator');
const router = express.Router();
const controller = require('../controllers/employeeController');

// defining the middleware
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
    handleValidationErrors,
    controller.getEmployee
);

// route to get all the employees in the dbs
router.get('/employees', controller.getEmployees);

// route to create an employee from the given information form req
router.post('/employees',
    [
        body('first_name').isLength({ min: 2 }).withMessage('First name is required'),
        body('last_name').isLength({ min: 2 }).withMessage('Last name is required'),
        body('email').isEmail().withMessage('Valid email is required'),
        body('position').isLength({ min: 2 }).withMessage('Position is required'),
        body('salary').isNumeric().withMessage('Salary must be a number'),
        body('date_of_joining').isISO8601().withMessage('Date of joining must be a valid date'),
        body('department').isLength({ min: 2 }).withMessage('Department is required')
    ],
    handleValidationErrors,
    controller.createEmployee
);

// route to edit the employee
router.put('/employees/:eid',
    [
        checkValidObjectId('eid'),
        body('position')
            .optional()
            .isString().withMessage('Position must be a string.')
            .notEmpty().withMessage('Position cannot be empty.'),
        body('salary')
            .optional()
            .isNumeric().withMessage('Salary must be a number.')
            .custom((value) => value > 0).withMessage('Salary must be greater than 0.')
    ],
    handleValidationErrors,
    controller.updateEmployee
);

// route to delete the employee where we get the employee id query parameter
router.delete('/employees',
    [
        query('eid').isMongoId().withMessage('Invalid employee ID format')
    ],
    handleValidationErrors,
    controller.deleteEmployee
);

router.get('/search/:search_query', handleValidationErrors, controller.searchEmployee);

// exporting router to the index.js
module.exports = router;
