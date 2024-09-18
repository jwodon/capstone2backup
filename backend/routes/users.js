const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { BadRequestError, UnauthorizedError } = require('../expressError');
const router = express.Router();
const { ensureCorrectUserOrAdmin } = require('../middlewares/auth');
const { createToken } = require('../helpers/tokens');

// Sign up route
router.post('/signup', async (req, res, next) => {
    try {
        const user = await User.register(req.body);
        const token = createToken(user);
        return res.status(201).json({ token });
    } catch (err) {
        return next(err);
    }
});

// Login route
router.post('/login', async (req, res, next) => {
    try {
        console.log('Login route called with body:', req.body);
        const { username, password } = req.body;

        if (!username || !password) {
            throw new BadRequestError('Username and password are required');
        }

        const user = await User.fetchByUsername(username);
        console.log('User fetched:', user);

        const isValid = await User.verifyPassword(password, user.password);
        console.log('Password validation:', isValid);

        if (!isValid) {
            throw new UnauthorizedError('Invalid username or password');
        }

        const token = createToken(user);
        console.log('Login successful, token created');
        return res.json({ token });
    } catch (err) {
        return next(err);
    }
});

// Profile route (update)
router.patch('/:username', ensureCorrectUserOrAdmin, async (req, res, next) => {
    console.log('Update profile route called');
    console.log('Request Params:', req.params);
    console.log('Request Body:', req.body);
    try {
        const user = await User.updateProfile(req.params.username, req.body);
        console.log('Updated User:', user);
        return res.json({ user });
    } catch (err) {
        console.error('Error in updateProfile route:', err);
        return next(err);
    }
});

// Profile route (fetch)
router.get('/:username', ensureCorrectUserOrAdmin, async (req, res, next) => {
    try {
        const user = await User.get(req.params.username);
        return res.json({ user });
    } catch (err) {
        return next(err);
    }
});

module.exports = router;
