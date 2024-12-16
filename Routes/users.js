const express = require('express');
const usersController = require('../Controllers/users');
const router = express.Router();

router.post('/register', usersController.register);
router.post('/login', usersController.login);
router.get('/allusers', usersController.allUsers);

module.exports = router;
