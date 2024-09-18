const db = require('../config/db');

class NutritionLog {
  static async create({ userId, date, caloriesIntake, foodItems }) {
    const result = await db.query(
      `INSERT INTO nutrition_logs (user_id, date, calories_intake, food_items, created_at)
       VALUES ($1, $2, $3, $4, NOW())
       RETURNING id, user_id, date, calories_intake, food_items, created_at`,
      [userId, date, caloriesIntake, foodItems]
    );
    return result.rows[0];
  }

  // Add more static methods for reading, updating, and deleting logs as needed
}

module.exports = NutritionLog;
