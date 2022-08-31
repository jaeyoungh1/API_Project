const express = require('express')
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const validateSignup = [
    check('firstName')
        .exists({ checkFalsy: true })
        .withMessage('First Name is required'),
    check('lastName')
        .exists({ checkFalsy: true })
        .withMessage('Last Name is required'),
    check('email')
        // .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Invalid email'),
    check('username')
        // .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Username is required'),
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
    async (req, res) => {
        const { firstName, lastName, email, password, username } = req.body;
        
        const existingEmail = await User.findAll({
            where: {email: email}
        })
        if (existingEmail.length > 0) {
            res.status(403)
            return res.json({ //am I hardcoding this
                "message": "User already exists",
                "statusCode": res.statusCode,
                "errors": {
                    "username": "User with that email already exists"
                }
            })
        }
        
        const existingUser = await User.findAll({
            where: {username: username}
        })
        if (existingUser.length > 0) {
            res.status(403)
            return res.json({ //am I hardcoding this
                "message": "User already exists",
                "statusCode": res.statusCode,
                "errors": {
                    "username": "User with that username already exists"
                }
            })
        }
        const user = await User.signup({ firstName, lastName, email, username, password });
        const token = await setTokenCookie(res, user);

        const result = await user.toJSON()
        result.token = token

        return res.json(
            result
        );
    }
);

module.exports = router;