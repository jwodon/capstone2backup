import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function WeightChart({ tdeeLogs }) {
    const mapLogsToWeeks = (logs) => {
        const weeks = {};
        logs.forEach((log) => {
            const date = new Date(log.date);
            const startOfWeek = new Date(date);
            const day = startOfWeek.getDay();
            const difference = (day === 0 ? -6 : 1) - day;
            startOfWeek.setDate(startOfWeek.getDate() + difference);

            const weekKey = `${startOfWeek.toLocaleDateString()} - ${new Date(
                startOfWeek.getTime() + 6 * 24 * 60 * 60 * 1000
            ).toLocaleDateString()}`;

            if (!weeks[weekKey]) {
                weeks[weekKey] = { totalWeight: 0, count: 0 };
            }
            if (log.weight) {
                weeks[weekKey].totalWeight += parseFloat(log.weight);
                weeks[weekKey].count += 1;
            }
        });

        return Object.entries(weeks).map(([week, { totalWeight, count }]) => ({
            week,
            avgWeight: count > 0 ? (totalWeight / count).toFixed(2) : 0,
        }));
    };

    const weeklyWeightData = mapLogsToWeeks(tdeeLogs);

    const data = {
        labels: weeklyWeightData.map((weekData) => weekData.week),
        datasets: [
            {
                label: 'Weekly Average Weight',
                data: weeklyWeightData.map((weekData) => weekData.avgWeight),
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: false,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Weekly Average Weight',
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Weeks',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Weight',
                },
            },
        },
    };

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <Line data={data} options={options} />
        </div>
    );
}

export default WeightChart;
