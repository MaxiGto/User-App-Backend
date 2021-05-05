/*
    User Routes
    host + /api/v0/users
*/

const { validateJWT } = require('../middlewares/jwt-validator');
const { Router } = require('express');
const router = Router();

const { getUserInfo } = require('../controllers/users');

router.get('/me', validateJWT, getUserInfo);

module.exports = router;