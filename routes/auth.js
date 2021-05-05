/*
    Authentication routes
    host + /api/v0
*/

const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');

const { createUser, userLogin, renewJWT } = require('../controllers/auth');
const { validateFields } = require('../middlewares/field-validator');
const { validateJWT } = require('../middlewares/jwt-validator');

router.post(
    '/new',
    [
        check('email', 'Email is required').isEmail(),
        check('password', 'Password must be at least 6 characters long').isLength({ min: 6 }),
        check('name', 'Name is required').not().isEmpty(),
        check('surname', 'Surname is required').not().isEmpty(),
        check('age', 'Age must be a number').isNumeric().not().isEmpty(),
        check('role', 'Role is required').not().isEmpty(),
        validateFields 
    ], createUser);

router.post(
    '/authenticate',
    [
        check('email', 'Email is required').isEmail(),
        check('password', 'Password must be at least 6 characters long').isLength({ min: 6 }),
        validateFields 
    ],
    userLogin);

router.get('/renew', validateJWT, renewJWT);

module.exports = router;