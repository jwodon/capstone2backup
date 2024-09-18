-- Connect to the capstone2 database
\c capstone2

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(320) UNIQUE NOT NULL,
    age INTEGER CHECK (age >= 0),
    gender VARCHAR(50),
    height DECIMAL(5, 2),
    starting_weight DECIMAL(6, 2),
    goal_weight DECIMAL(6, 2),
    goal_weight_loss_per_week DECIMAL(4, 2),
    start_date DATE,
    activity_level VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create tdee_logs table
CREATE TABLE IF NOT EXISTS tdee_logs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    weight DECIMAL(6, 2),
    calories_intake DECIMAL(6, 2),
    tdee DECIMAL(20, 2),
    calorie_deficit_surplus DECIMAL(6, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create nutrition_logs table
CREATE TABLE IF NOT EXISTS nutrition_logs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    calorie_intake DECIMAL(6, 2),
    food_items TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create activity_logs table
CREATE TABLE IF NOT EXISTS activity_logs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    activity_type VARCHAR(100),
    duration INTEGER CHECK (duration >= 0),
    calories_burned DECIMAL(6, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for foreign keys
CREATE INDEX IF NOT EXISTS idx_user_id_on_tdee_logs ON tdee_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_user_id_on_nutrition_logs ON nutrition_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_user_id_on_activity_logs ON activity_logs(user_id);
