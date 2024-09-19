import React, { useContext } from 'react';
import TDEEChart from './TDEEChart';
import WeightChart from './WeightChart';
import { UserContext } from '../App';
import '../styles/ChartsPage.css';

function ChartsPage() {
  const { tdeeLogs } = useContext(UserContext);

  return (
    <div className="charts-page">
      <h1 className="charts-title">Your Progress Charts</h1>
      <div className="chart-section">
        <div className="chart-container">
          <TDEEChart tdeeLogs={tdeeLogs} />
        </div>
        <div className="chart-container">
          <WeightChart tdeeLogs={tdeeLogs} />
        </div>
      </div>
    </div>
  );
}

export default ChartsPage;
