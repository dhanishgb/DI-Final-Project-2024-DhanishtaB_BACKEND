const express = require('express');
const usersController = require('../Controllers/users');
const router = express.Router();

router.post('/register', usersController.register);
router.post('/signin', usersController.signin); // Updated from login to signin
router.get('/allusers', usersController.allUsers);

module.exports = router;
