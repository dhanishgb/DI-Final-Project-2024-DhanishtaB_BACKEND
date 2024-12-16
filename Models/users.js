const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

// Set up database connection
const db = new Sequelize('postgresql://class143_owner:BThOV0lZb3YU@ep-holy-lab-a2xm39f8.eu-central-1.aws.neon.tech/FitnessPlanet?sslmode=require');

// Define User model
const User = db.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: true, // Allow optional username
        unique: false, // Allow multiple users to not have a username
        validate: {
            len: [3, 50], // Optional: Set length constraints for username
        },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false, // Ensure email is required
        unique: true, // Ensure email is unique
        validate: {
            notEmpty: true, // Ensure email is not empty
            isEmail: true, // Ensure valid email format
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false, // Ensure password is required
    },
    type: {
        type: DataTypes.STRING,
        defaultValue: 'user', // Default role for new users
    },
});

// Sync database
db.sync()
    .then(() => {
        console.log('User table created (if it does not already exist).');
    })
    .catch((error) => {
        console.error('Error creating table:', error);
    });

// Export User model
module.exports = User;
