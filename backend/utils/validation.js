const { validationResult } = require('express-validator');

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
    const validationErrors = validationResult(req);

    const errorFormatter = ({ msg, param }) => {
        // https://express-validator.github.io/docs/validation-result-api.html#formatwithformatter
        return `param: ${param}: ${msg}`
    }

    if (!validationErrors.isEmpty()) {

        const errors = validationErrors
            // .array()
            .formatWith(errorFormatter)
            // .mapped()
        // .map((error) => `${error.msg}`);
        console.log("ERRORS ARE", errors)

        const err = Error('Validation Error with login');
        err.errors = errors;
        err.status = 400;
        err.title = 'Bad request with login.';
        next(err);
    }
    next();
};

module.exports = {
    handleValidationErrors
};
