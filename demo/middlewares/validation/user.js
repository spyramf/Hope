const { check, validationResult } = require('express-validator')

exports.validateUserSignUp = [
    check('mobile')
        .trim()
        .not()
        .isEmpty()
        .withMessage('mobile is required!')
        .isString()
        .withMessage('Must be a valid name!')
        .isLength({ min: 3, max: 20 })
        .withMessage('Name must be within 3 to 20 Character!'),

    check('email')
        .normalizeEmail()
        .isEmail()
        .withMessage('invalid Email !'),

    check('password')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Password is empty!')
        .isLength({ min: 8, max: 20 })
        .withMessage('Password must be within 3 to 20 Character!'),

    check('confirmPassword')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Password is empty!')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Both password must same!')
            }
            return true;

        })


]
exports.userValidation = (req, res, next) => {
    const result = validationResult(req).array()
    if (!result.length) return next();

    const error = result[0].msg;
    res.json({ success: false, message: error });
}

exports.validateUserSignIn = [

    check('email').trim().isEmail().withMessage('email/password is required!'),

    check('password').trim().not().isEmpty().withMessage('email/password is required!'),

]



exports.validateUserPan = [

    check('pan')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Name is required!')
        .isLength({ min: 3, max: 20 })
        .withMessage('Name must be within 3 to 20 Character!'),

    check('firstName')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Name is required!')
        .isString()
        .withMessage('Must be a valid name!')
        .isLength({ min: 3, max: 20 })
        .withMessage('Name must be within 3 to 20 Character!'),

    check('lastName')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Name is required!')
        .isString()
        .withMessage('Must be a valid name!')
        .isLength({ min: 3, max: 20 })
        .withMessage('Name must be within 3 to 20 Character!'),

    check('dob')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Name is required!')
        .isLength({ min: 3, max: 20 })
        .withMessage('Name must be within 3 to 20 Character!'),

]



exports.validateUserPersonalDetails = [

    check('add')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Name is required!')
        .isLength({ min: 3, max: 20 })
        .withMessage('Name must be within 3 to 20 Character!'),

    check('pin')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Name is required!')
        .isString()
        .withMessage('Must be a valid name!')
        .isLength({ min: 3, max: 20 })
        .withMessage('Name must be within 3 to 20 Character!'),

    check('city')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Name is required!')
        .isString()
        .withMessage('Must be a valid name!')
        .isLength({ min: 3, max: 20 })
        .withMessage('Name must be within 3 to 20 Character!'),

    check('state')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Name is required!')
        .isLength({ min: 3, max: 20 })
        .withMessage('Name must be within 3 to 20 Character!'),

]


exports.validateUserNomineeDetails= [

    check('n_name')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Name is required!')
        .isLength({ min: 3, max: 20 })
        .withMessage('Name must be within 3 to 20 Character!'),

    check('n_dob')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Name is required!')
        .isString()
        .withMessage('Must be a valid name!')
        .isLength({ min: 3, max: 20 })
        .withMessage('Name must be within 3 to 20 Character!'),

    check('n_pan')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Name is required!')
        .isString()
        .withMessage('Must be a valid name!')
        .isLength({ min: 3, max: 20 })
        .withMessage('Name must be within 3 to 20 Character!'),

    check('n_relation')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Name is required!')
        .isLength({ min: 3, max: 20 })
        .withMessage('Name must be within 3 to 20 Character!'),

]


exports.validateUserBankDetails = [

    check('ifsc')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Name is required!'),

    check('accNo')
        .trim()
        .not()
        .isEmpty()
        .withMessage('accNo is required!')
        .isString()
        .withMessage('Must be a valid name!')
        .isLength({ min: 3, max: 20 })
        .withMessage('Name must be within 3 to 20 Character!'),

    check('bankName')
        .trim()
        .not()
        .isEmpty()
        .withMessage('bankName is required!')
        .isString()
        .withMessage('Must be a valid name!')
        .isLength({ min: 3, max: 20 })
        .withMessage('Name must be within 3 to 20 Character!'),

    check('accType')
        .trim()
        .not()
        .isEmpty()
        .withMessage('accType is required!')
        .isLength({ min: 3, max: 20 })
        .withMessage('Name must be within 3 to 20 Character!'),

]