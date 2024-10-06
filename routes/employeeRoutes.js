const express = require('express');
const { body, param, query, validationResult } = require('express-validator');
const router = express.Router();
const controller = require('../controllers/employeeController');

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

const checkValidObjectId = (field) => param(field).isMongoId().withMessage('Invalid employee ID format');

router.get('/employees/:id',
    checkValidObjectId('id'),
    handleValidationErrors,
    controller.getEmployee
);

router.get('/employees', controller.getEmployees);

router.post('/employees', 
    [
        body('first_name').isLength({ min: 1 }).withMessage('First name is required'),
        body('last_name').isLength({ min: 1 }).withMessage('Last name is required'),
        body('email').isEmail().withMessage('Valid email is required'),
        body('position').isLength({ min: 1 }).withMessage('Position is required'),
        body('salary').isNumeric().withMessage('Salary must be a number'),
        body('date_of_joining').isISO8601().withMessage('Date of joining must be a valid date'),
        body('department').isLength({ min: 1 }).withMessage('Department is required')
    ],
    handleValidationErrors,
    controller.createEmployee
);

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

router.delete('/employees',
    [
        query('eid').isMongoId().withMessage('Invalid employee ID format')
    ],
    handleValidationErrors,
    controller.deleteEmployee
);

module.exports = router;
