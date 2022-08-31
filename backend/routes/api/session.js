const express = require('express')

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateLogin = [
    check('credential')
        .exists({ checkFalsy: true })
        // .notEmpty()
        .withMessage('Email or username is required'),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Password is required'),
    handleValidationErrors
];

// Log in
router.post(
    '/',
    validateLogin,
    async (req, res, next) => {
        const { credential, password } = req.body;

        const user = await User.login({ credential, password });

        if (!user) {
            res.status(401)
            return res.json(
                {
                    "message": "Invalid credentials",
                    "statusCode": 401
                }
            )
            // const err = new Error('Login failed');
            // err.status = 401;
            // err.title = 'Login failed';
            // err.errors = ['The provided credentials were invalid.'];
            // return next(err);
        }

        const token = await setTokenCookie(res, user);
        // console.log("THIS IS TOKEN", token)

        const result = await user.toJSON()
        result.token = token
        return res.json(
            result
        );
    }
);

// Log out
router.delete(
    '/',
    (_req, res) => {
        res.clearCookie('token');
        return res.json({ message: 'success' });
    }
);

// Restore session user
router.get(
    '/',
    restoreUser,
    requireAuth,
    (req, res) => {
        const { user } = req;
        if (user) {
            return res.json(
                user.toSafeObject()
            );
        } else return res.json({});
    }
);

module.exports = router;