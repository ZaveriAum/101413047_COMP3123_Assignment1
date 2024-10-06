const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const controller = require('../controllers/userController');

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

router.post('/signup', 
    [
        body('username')
            .exists().withMessage('Username is required')
            .isString().withMessage('Username must be a string')
            .notEmpty().withMessage('Username cannot be empty'),
        body('email')
            .isEmail().withMessage('Entered email format is incorrect'),
        body('password')
            .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
    ],
    handleValidationErrors,
    controller.signup
);

router.post('/login',
    [
        body('email')
            .isEmail().withMessage('Valid email is required'),
        body('password')
            .notEmpty().withMessage('Password cannot be empty')
    ],
    handleValidationErrors,
    controller.login
);

module.exports = router;
