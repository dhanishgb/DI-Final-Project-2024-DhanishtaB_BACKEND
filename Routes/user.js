const express = require('express');
const users = require('../controllers/users'); // Import controller functions
const router = express.Router();

// Define routes
router.post('/register', users.register);  // User registration
router.post('/login', users.login);        // User login
router.get('/allusers', users.allUsers);   // Get all users

module.exports = router; // Export router
