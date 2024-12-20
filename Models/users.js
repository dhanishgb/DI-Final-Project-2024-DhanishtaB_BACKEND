const { Sequelize, DataTypes } = require('sequelize');

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
        validate: {
            len: [3, 50], // Set length constraints for username
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
}, {
    timestamps: true, // Enable createdAt and updatedAt fields
});

// Sync database
db.sync({ alter: true })
    .then(() => {
        console.log('User table synced successfully.');
    })
    .catch((error) => {
        console.error('Error syncing table:', error);
    });

// Export User model and database instance
module.exports = { User, db };
