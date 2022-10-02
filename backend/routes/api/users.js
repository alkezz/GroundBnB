const express = require('express')
const router = express.Router();
const { user } = require('../../db/models')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateSignup = [
    check('firstName')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a valid first name'),
    check('lastName')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a valid last name'),
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
];

router.get('/', async (req, res) => {
    const user = await User.findAll({
        attributes: {
            include: 'email'
        }
    })
    for (let i = 0; i < user.length; i++) {
        console.log(user[i].email)
    }
})

// Sign up
router.post(
    '/',
    validateSignup,
    async (req, res) => {
        const { firstName, lastName, email, password, username } = req.body;
        const users = await User.findAll({
            attributes: {
                include: 'email'
            }
        })
        for (let i = 0; i < users.length; i++) {
            if (users[i].email === email) {
                res.status(403).json({
                    "message": "User already exists",
                    "statusCode": 403,
                    "errors": {
                        "email": "User with that email already exists"
                    }
                })
            } else if (users[i].username === username) {
                return res.status(403).json({
                    "message": "User already exists",
                    "statusCode": 403,
                    "errors": {
                        "username": "User with that username already exists"
                    }
                })
            }
        }
        const user = await User.signup({ firstName, lastName, email, username, password });

        const a = await setTokenCookie(res, user);
        user.setDataValue('token', a)
        return res.status(200).json(
            {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                username: user.username,
                token: a
            }

        );
    }
);


module.exports = router;
