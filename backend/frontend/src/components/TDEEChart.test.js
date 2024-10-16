// src/components/TDEEChart.test.js
import React from 'react';
import { render } from '@testing-library/react';
import TDEEChart from './TDEEChart';

test('renders TDEEChart without crashing', () => {
  const tdeeLogs = [
    { date: '2023-01-01', tdee: '2000' },
    { date: '2023-01-02', tdee: '2100' },
    // Add more sample data if needed
  ];

  const { container } = render(<TDEEChart tdeeLogs={tdeeLogs} />);
  expect(container).toBeInTheDocument();
});
