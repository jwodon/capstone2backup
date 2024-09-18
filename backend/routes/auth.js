// routes/auth.js

const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { createToken } = require('../helpers/tokens');
const { BadRequestError, UnauthorizedError } = require('../expressError');

// Existing login route
router.post('/token', async (req, res, next) => {
    try {
        console.log('token backend route');
        const { username, password } = req.body;
        const user = await User.fetchByUsername(username);
        const isValid = await User.verifyPassword(password, user.password);

        if (!isValid) {
            throw new UnauthorizedError('Invalid username or password');
        }

        const token = createToken(user);
        return res.json({ token });
    } catch (err) {
        return next(err);
    }
});

// **Add the register route here**
router.post('/register', async (req, res, next) => {
    try {
        console.log('Register route called with body:', req.body);
        const user = await User.register(req.body);
        const token = createToken(user);
        return res.status(201).json({ token });
    } catch (err) {
        return next(err);
    }
});

module.exports = router;
