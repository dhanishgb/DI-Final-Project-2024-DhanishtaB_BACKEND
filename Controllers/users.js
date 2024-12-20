const { User } = require('../Models/users');

// Register a new user
exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create a new user (no password hashing)
        const user = await User.create({
            username,
            email,
            password, // Save password as-is (insecure)
        });

        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Sign in a user
exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ where: { email } });
        if (!user || user.password !== password) { // Compare plain text passwords
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Send success response with user details
        res.status(200).json({
            message: 'Signin successful',
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
                type: user.type,
            },
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get all users
exports.allUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password'] }, // Exclude passwords
        });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
