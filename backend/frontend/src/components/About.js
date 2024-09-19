import React from 'react';
import '../styles/About.css';

function About() {
  return (
    <div className="about-page">
      <h1>About TrackTDEE</h1>
      <section>
        <h2>What is TDEE?</h2>
        <p>
          Total Daily Energy Expenditure (TDEE) is the number of calories your body needs to perform
          basic life-sustaining functions and physical activities. Understanding your TDEE helps in
          managing weight by balancing calorie intake and expenditure.
        </p>
      </section>
      <section>
        <h2>Our Mission</h2>
        <p>
          TrackTDEE is dedicated to helping you monitor and manage your daily energy expenditure.
          Our goal is to provide you with the tools and insights necessary to achieve your health and
          fitness goals effectively.
        </p>
      </section>
      <section>
        <h2>Features</h2>
        <ul>
          <li>Comprehensive TDEE Tracking</li>
          <li>Weekly Progress Tables</li>
          <li>Interactive Charts and Graphs</li>
          <li>Personalized Insights and Recommendations</li>
        </ul>
      </section>
      <section>
        <h2>Get Started</h2>
        <p>
          Sign up today to start tracking your TDEE and take the first step towards a healthier you!
        </p>
      </section>
    </div>
  );
}

export default About;
