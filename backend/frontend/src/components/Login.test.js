// src/components/Login.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from './Login';
import { UserContext } from '../App';
import { BrowserRouter as Router } from 'react-router-dom';

// Mock useNavigate
const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('Login Component', () => {
  test('renders login form', () => {
    render(
      <Router>
        <UserContext.Provider value={{ login: jest.fn() }}>
          <Login />
        </UserContext.Provider>
      </Router>
    );

    // Check if the form fields are rendered
    expect(screen.getByLabelText(/Username:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password:/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
  });

  test('calls login function on form submit', async () => {
    const loginMock = jest.fn().mockResolvedValue({});

    render(
      <Router>
        <UserContext.Provider value={{ login: loginMock }}>
          <Login />
        </UserContext.Provider>
      </Router>
    );

    // Fill in the form
    fireEvent.change(screen.getByLabelText(/Username:/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/Password:/i), { target: { value: 'password' } });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    // Wait for the login function to be called
    await waitFor(() => expect(loginMock).toHaveBeenCalledWith({ username: 'testuser', password: 'password' }));

    // Check that navigate was called to redirect to home page
    expect(mockedUsedNavigate).toHaveBeenCalledWith('/');
  });

  test('displays error message on login failure', async () => {
    const loginMock = jest.fn().mockRejectedValue(new Error('Login failed'));

    render(
      <Router>
        <UserContext.Provider value={{ login: loginMock }}>
          <Login />
        </UserContext.Provider>
      </Router>
    );

    // Fill in the form
    fireEvent.change(screen.getByLabelText(/Username:/i), { target: { value: 'wronguser' } });
    fireEvent.change(screen.getByLabelText(/Password:/i), { target: { value: 'wrongpassword' } });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    // Wait for the error message to appear
    await waitFor(() => expect(screen.getByText(/Failed to log in/i)).toBeInTheDocument());
  });
});
