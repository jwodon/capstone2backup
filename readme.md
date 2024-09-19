# TrackTDEE

## Deployed URL:

[Link to Deployed Site](https://capstone2final-bcb13c416cad.herokuapp.com/)

## Project Overview:

TrackTDEE is a web application that allows users to monitor their Total Daily Energy Expenditure (TDEE) and related metrics. The app offers a user-friendly interface for tracking TDEE over time, allowing users to log and review their fitness progress. It's designed to help individuals stay on top of their fitness goals by providing data visualizations and detailed logs.

## Features:

-   **User Authentication**: Users can sign up, log in, and log out. User sessions are securely managed.
-   **Personalized TDEE Tracking**: Logged-in users can track their TDEE, view progress, and update logs. A detailed weekly statistics table is displayed to show trends over time.
-   **Charts and Visualization**: The site provides graphical representations of the user's TDEE data, making it easy to spot trends and patterns.
-   **Responsive Design**: The website is fully responsive, ensuring that users have an optimal experience on any device.

### Why these features?

These features were chosen to allow users to interact with the core functionality of the app—tracking fitness metrics—in a personalized and intuitive way. Data visualizations and detailed logs help users stay on track and make informed decisions about their fitness journey.

## User Flow:

1. **Non-Logged-in User**: When a user visits the website for the first time, they are greeted with a welcome page encouraging them to sign up or log in.
2. **Sign Up / Log In**: The user can create an account or log in if they already have one.
3. **Home Page**: After logging in, users are welcomed with their personal statistics, including their weekly TDEE logs.
4. **Progress Page**: Users can view charts showing their progress over time, such as their weight and TDEE logs.
5. **Log Out**: Users can securely log out of the website once finished.

## API Documentation:

TrackTDEE uses a custom-built API to handle data fetching and updates. The API allows users to:

-   Fetch TDEE logs by date
-   Save new TDEE logs
-   Fetch nutrition and activity logs (if available)

The API is designed to be efficient and secure, using token-based authentication to manage user sessions.

### API Endpoints:

-   `POST /auth/token`: Login and receive a token
-   `GET /users/:username`: Get the current user's profile
-   `PATCH /users/:username`: Update a user’s profile
-   `POST /tdee`: Log a TDEE entry
-   `GET /tdee/:userId?startDate=YYYY-MM-DD`: Fetch TDEE logs for a user starting from a specific date
-   `GET /tdee/:userId?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD`: Fetch logs within a date range

## Tech Stack:

-   **Frontend**: React, React Router, Bootstrap for styling
-   **Backend**: Node.js, Express.js for API development
-   **Database**: PostgreSQL for storing user and log data
-   **Authentication**: JWT (JSON Web Tokens) for secure authentication
-   **Hosting**: Deployed on [Hosting Service]

## How to Run Locally:

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/tracktdee.git
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Set up environment variables in a `.env` file for your API base URL, database connection, and JWT secret key.
4. Start the development server:
    ```bash
    npm start
    ```
5. Open the app in your browser at `http://localhost:3000`.

## Additional Notes:

-   **Responsive Design**: The app is built with a responsive layout to work seamlessly on desktops, tablets, and mobile devices.
-   **Future Enhancements**: Planned improvements include more detailed nutrition tracking, goal setting, and integration with wearable fitness devices.

## Conclusion:

TrackTDEE is a powerful tool for fitness enthusiasts who want to take control of their health by tracking key metrics like TDEE. It provides personalized data visualizations, detailed logs, and a simple, intuitive interface to make staying on track easy.

---

## Final Project Submission:

-   **GitHub Repository**: [GitHub Repository Link](https://github.com/yourusername/tracktdee)
-   **Deployed Site**: [Deployed URL](https://your-app-url.com)
