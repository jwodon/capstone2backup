const db = require('../config/db');
const bcrypt = require('bcrypt');
const { BadRequestError, UnauthorizedError } = require('../expressError');

class User {
    static async authenticate(username, password) {
        // try to find the user first
        const result = await db.query(
            `SELECT username,
                      password,
                      email,
                      age,
                      gender,
                      height,
                      startingWeight,
                      goalWeight,
                      goalWeightLossPerWeek,
                      startDate,
                      activityLevel
               FROM users
               WHERE username = $1`,
            [username]
        );

        const user = result.rows[0];

        if (user) {
            // compare hashed password to a new hash from password
            const isValid = await bcrypt.compare(password, user.password);
            if (isValid === true) {
                delete user.password;
                return user;
            }
        }

        throw new UnauthorizedError('Invalid username/password');
    }
    static async register({
        username,
        password,
        email,
        age,
        gender,
        height,
        startingWeight,
        goalWeight,
        goalWeightLossPerWeek,
        startDate,
        activityLevel,
    }) {
        const duplicateCheck = await db.query(
            `SELECT username
             FROM users
             WHERE username = $1`,
            [username]
        );

        if (duplicateCheck.rows[0]) {
            throw new BadRequestError(`Duplicate username: ${username}`);
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await db.query(
            `INSERT INTO users (username, password, email, age, gender, height, starting_weight, goal_weight, goal_weight_loss_per_week, start_date, activity_level, created_at)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW())
             RETURNING id, username, email, age, gender, height, starting_weight, goal_weight, goal_weight_loss_per_week, start_date, activity_level, created_at`,
            [
                username,
                hashedPassword,
                email,
                age,
                gender,
                height,
                startingWeight,
                goalWeight,
                goalWeightLossPerWeek,
                startDate,
                activityLevel,
            ]
        );

        return result.rows[0];
    }

    static async fetchByUsername(username) {
        const result = await db.query(
            `SELECT id, username, password
             FROM users
             WHERE username = $1`,
            [username]
        );

        const user = result.rows[0];
        if (!user) {
            throw new UnauthorizedError('Invalid username or password');
        }

        return user;
    }

    static async verifyPassword(password, hashedPassword) {
        return await bcrypt.compare(password, hashedPassword);
    }

    static async updateProfile(
        username,
        {
            email,
            age,
            gender,
            height,
            starting_weight,
            goal_weight,
            goal_weight_loss_per_week,
            start_date,
            activity_level,
        }
    ) {
        try {
            // Log incoming data
            console.log('Incoming update data:', {
                email,
                age,
                gender,
                height,
                starting_weight,
                goal_weight,
                goal_weight_loss_per_week,
                start_date,
                activity_level,
            });

            const result = await db.query(
                `UPDATE users
                 SET email = $1,
                     age = $2,
                     gender = $3,
                     height = $4,
                     starting_weight = $5,
                     goal_weight = $6,
                     goal_weight_loss_per_week = $7,
                     start_date = $8,
                     activity_level = $9
                 WHERE username = $10
                 RETURNING id, username, email, age, gender, height, starting_weight, goal_weight, goal_weight_loss_per_week, start_date, activity_level`,
                [
                    email,
                    age,
                    gender,
                    height,
                    starting_weight,
                    goal_weight,
                    goal_weight_loss_per_week,
                    start_date,
                    activity_level,
                    username,
                ]
            );

            // Log updated user data
            console.log('Updated User:', result.rows[0]);

            const user = result.rows[0];
            if (!user) {
                throw new UnauthorizedError('User not found');
            }

            return user;
        } catch (error) {
            console.error('Error updating user profile:', error);
            throw error;
        }
    }

    static async get(username) {
        const result = await db.query(
            `SELECT id, username, email, age, gender, height, starting_weight, goal_weight, goal_weight_loss_per_week, start_date, activity_level
             FROM users
             WHERE username = $1`,
            [username]
        );
        console.log('Getting user:', username);

        const user = result.rows[0];
        if (!user) {
            throw new UnauthorizedError('User not found');
        }

        return user;
    }
}

module.exports = User;
