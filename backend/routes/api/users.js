const express = require('express')
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const validateSignup = [
    check('firstName')
        .exists({ checkFalsy: true })
        .withMessage("First Name is required"),
    check('lastName')
        .exists({ checkFalsy: true })
        .withMessage("Last Name is required"),
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

// Sign up
router.post(
    '/',
    validateSignup,
    async (req, res, next) => {
        const { firstName, lastName, email, password, username } = req.body;

        const existingEmail = await User.findAll({
            where: {
                email: email
            }
        })
        const existingUsername = await User.findAll({
            where: {
                username
            }
        })

        if (existingEmail) {
            const err = new Error('User already exists')
            err.status = 403
            err.errors = { "email": "User with that email already exists" }
            next(err)
        } else if (existingUsername) {
            const err = new Error('User already exists')
            err.status = 403
            err.errors = { "username": "User with that username already exists" }
            next(err)
        }

        const user = await User.signup({ firstName, lastName, email, username, password });

        await setTokenCookie(res, user);

        let result = await user.toJSON()
        result.token = ""

        return res.json(
            result
        );
    }
);



module.exports = router;