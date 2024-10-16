// src/App.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the navigation bar', () => {
  render(<App />);
  const navElement = screen.getByRole('navigation');
  expect(navElement).toBeInTheDocument();
});

test('renders the home page', () => {
  render(<App />);
  const headingElement = screen.getByText(/Welcome to TrackTDEE!/i);
  expect(headingElement).toBeInTheDocument();
});
