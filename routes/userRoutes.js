const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const controller = require('../controllers/userController');
const cookieAuthJwt = require('../middleware/cookieAuthJwt')
const cookieParser = require("cookie-parser");

// defining the middleware
router.use(cookieParser())
router.use(express.json())
router.use(express.urlencoded({ extended: true }))

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// route to invoke sign up from the controller
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

// route to login
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

// route to show jwt working
router.get('/info', cookieAuthJwt.authenticateToken, controller.user_info)

// exporting router to index.js
module.exports = router;
