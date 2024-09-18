const db = require('../config/db');

class ActivityLog {
    static async create({ userId, date, activityType, duration, caloriesBurned }) {
        const result = await db.query(
            `INSERT INTO activity_logs (user_id, date, activity_type, duration, calories_burned, created_at)
       VALUES ($1, $2, $3, $4, $5, NOW())
       RETURNING id, user_id, date, activity_type, duration, calories_burned, created_at`,
            [userId, date, activityType, duration, caloriesBurned]
        );
        return result.rows[0];
    }

    // Add more static methods for reading, updating, and deleting logs as needed
}

module.exports = ActivityLog;
