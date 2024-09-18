const express = require('express');
const cors = require('cors');
const { NotFoundError } = require('./expressError');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const tdeeRoutes = require('./routes/tdeeLogs');


// Initialize app before using it
const app = express();

// Middleware
app.use(express.json());
app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    })
);

// Debugging logs
app.use((req, res, next) => {
    console.log(`${req.method} request to ${req.url}`);
    next();
});

// Routes
app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/tdee', tdeeRoutes);


// Handle 404 errors
app.use((req, res, next) => {
    return next(new NotFoundError());
});

// Generic error handler
app.use((err, req, res, next) => {
    if (process.env.NODE_ENV !== 'test') console.error(err.stack);
    const status = err.status || 500;
    const message = err.message;

    return res.status(status).json({
        error: { message, status },
    });
});

// Health check route
app.get('/', (req, res) => {
    res.send('TDEE Tracker API is running');
});

module.exports = app;
