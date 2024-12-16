const { Sequelize, DataTypes } = require('sequelize');

const db = new Sequelize('postgresql://class143_owner:BThOV0lZb3YU@ep-holy-lab-a2xm39f8.eu-central-1.aws.neon.tech/FitnessPlanet?sslmode=require');

const User = db.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        unique: true
    },
    password: DataTypes.STRING,
    type: {
        type: DataTypes.STRING,
        defaultValue: 'user'
    },
});

db.sync()
.then(() => {
    console.log('User table created if not already exists.');
})
.catch((error) => {
    console.error('Error creating table:', error);
});


module.exports = User;