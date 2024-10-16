// src/components/Home.test.js
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Home from './Home';
import { UserContext } from '../App';
import { BrowserRouter as Router } from 'react-router-dom';
import Api from '../api';

// Mock the Api module
jest.mock('../api');

describe('Home Component', () => {
  test('renders welcome message when currentUser is present', async () => {
    const currentUser = {
      username: 'testuser',
      id: 1,
      start_date: '2023-01-01',
    };

    // Mock the fetchTDEELogs method to return mock data
    const mockTDEELogs = [
      { date: '2023-01-01', tdee: '2000' },
      { date: '2023-01-02', tdee: '2100' },
    ];
    Api.fetchTDEELogs.mockResolvedValue(mockTDEELogs);

    render(
      <Router>
        <UserContext.Provider value={{ currentUser }}>
          <Home />
        </UserContext.Provider>
      </Router>
    );

    // Wait for the component to finish loading
    await waitFor(() => expect(screen.getByText(/Welcome back, testuser!/i)).toBeInTheDocument());

    // Additional assertions if needed
    expect(screen.getByText(/Let's track your progress today./i)).toBeInTheDocument();
  });

  test('renders sign-up prompt when no currentUser', () => {
    render(
      <Router>
        <UserContext.Provider value={{ currentUser: null }}>
          <Home />
        </UserContext.Provider>
      </Router>
    );

    expect(screen.getByText(/Welcome to TrackTDEE!/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Sign Up/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Log In/i })).toBeInTheDocument();
  });
});
