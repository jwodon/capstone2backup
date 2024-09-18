const express = require('express');
const router = express.Router();
const TDEELog = require('../models/TDEELog');

// POST /tdee to create or update a TDEE log
router.post('/', async (req, res, next) => {
    try {
        const { userId, date, weight, caloriesIntake, tdee, calorieDeficitSurplus } = req.body;

        const existingLog = await TDEELog.findByUserIdAndDate(userId, date);
        if (existingLog) {
            const updatedLog = await TDEELog.update({
                id: existingLog.id,
                weight,
                caloriesIntake,
                tdee,
                calorieDeficitSurplus,
            });
            return res.status(200).json(updatedLog);
        } else {
            const newLog = await TDEELog.create({
                userId,
                date,
                weight,
                caloriesIntake,
                tdee,
                calorieDeficitSurplus,
            });
            return res.status(201).json(newLog);
        }
    } catch (error) {
        return next(error);
    }
});

// GET /tdee/:userId?startDate=yyyy-mm-dd to get TDEE logs for a user since start date
router.get('/:userId', async (req, res, next) => {
    try {
        const { userId } = req.params;
        const startDate = new Date(req.query.startDate).toISOString().split('T')[0];

        const logs = await TDEELog.findByUserIdAndStartDate(userId, startDate);

        return res.json(logs);
    } catch (error) {
        console.error('Error fetching TDEE logs:', error); // Log error for debugging
        return next(error);
    }
});

module.exports = router;
