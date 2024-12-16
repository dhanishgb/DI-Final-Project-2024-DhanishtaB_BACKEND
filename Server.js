const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

// Import routes
const users_routes = require('./Routes/users');
// const programs_routes = require('./Routes/programs');
// const products_routes = require('./Routes/products');

const server = express();

// Middleware
server.use(helmet()); // Security headers
server.use(cors()); // Cross-Origin Resource Sharing
server.use(express.json()); // Parse JSON data
server.use((req, res, next) => {
    console.log('Request made to: ' + req.url);
    next();
});

// Link routes
server.use('/api/users', users_routes);
// server.use('/api/programs', programs_routes);
// server.use('/api/products', products_routes);

// Health Check
server.get('/', (req, res) => {
    res.json({ message: 'API works very well' });
});

// Error Handling Middleware
server.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start Server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
