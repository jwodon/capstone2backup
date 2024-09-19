// backend/app.js

const express = require('express');
const cors = require('cors');
const path = require('path'); // Ensure 'path' is imported
const { NotFoundError } = require('./expressError'); // Adjust the path as necessary
const userRoutes = require('./routes/users'); // Adjust the path as necessary
const authRoutes = require('./routes/auth'); // Adjust the path as necessary
const tdeeRoutes = require('./routes/tdeeLogs'); // Adjust the path as necessary

const app = express();

// Middleware
app.use(express.json());

// CORS Configuration
if (process.env.NODE_ENV !== 'production') {
    app.use(
        cors({
            origin: 'http://localhost:3000', // Allow localhost in development
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
            allowedHeaders: ['Content-Type', 'Authorization'],
        })
    );
} else {
    app.use(cors()); // Allow all origins in production or configure as needed
}

// Debugging logs (optional)
app.use((req, res, next) => {
    console.log(`${req.method} request to ${req.url}`);
    next();
});

// API Routes
app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/tdee', tdeeRoutes);

// Serve static files from the React app in production
if (process.env.NODE_ENV === 'production') {
    // Serve the static files from the React app
    app.use(express.static(path.join(__dirname, 'frontend/build')));

    // The "catchall" handler: for any request that doesn't match API routes, send back React's index.html file.
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
    });
}

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

// Health check route (optional, ensure it's placed before the catchall in production)
if (process.env.NODE_ENV !== 'production') {
    app.get('/', (req, res) => {
        res.send('TDEE Tracker API is running');
    });
}

module.exports = app;
