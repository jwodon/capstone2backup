# Capstone Project

## Overview

This is a full-stack web application designed to track and calculate Total Daily Energy Expenditure (TDEE) for users. The application allows users to log their data, visualize metrics, and interact with the community.

**Frontend:** React.js  
**Backend:** Node.js with Express  
**Database:** PostgreSQL  
**Authentication:** JWT

## Features

- **User Authentication:** Secure sign-up and login using JWT.
- **Data Logging:** Users can input and track their weight, calories consumed, and other metrics.
- **TDEE Calculation:** Calculate daily calorie needs based on user input.
- **Visualization:** Interactive charts to display user data and progress.
- **API Integration:** Connect with Fitbit, MyFitnessPal, and Google Fit for enhanced data tracking.
- **Community Interaction:** Users can share progress and engage with others.

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (version 6 or higher) or yarn (version 1.22 or higher)
- PostgreSQL

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/your-repository.git
   cd your-repository

2. **Set Up the Backend**

cd backend
npm install

- Create a .env file in the backend directory and add your environment variables. Example:
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret

- Run the backend server:
npm start

3. **Set Up the Frontend**
cd ../frontend
npm install

- Create a .env file in the frontend directory for any frontend-specific environment variables.
- Run the frontend development server:
npm start


4. **Usage**
Frontend: Navigate to http://localhost:3000 to access the application’s user interface.
Backend: The backend API is available at http://localhost:5000 (or another port if configured differently)

5. **Testing**
- Frontend Tests: Run the following command inside the frontend directory:
npm test

- Backend Tests: Run the following command inside the backend directory:
npm test

