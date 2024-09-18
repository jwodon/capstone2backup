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

function TDEEChart({ tdeeLogs }) {
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
                weeks[weekKey] = { totalTDEE: 0, count: 0 };
            }
            if (log.tdee) {
                weeks[weekKey].totalTDEE += parseFloat(log.tdee);
                weeks[weekKey].count += 1;
            }
        });

        return Object.entries(weeks).map(([week, { totalTDEE, count }]) => ({
            week,
            avgTDEE: count > 0 ? (totalTDEE / count).toFixed(2) : 0,
        }));
    };

    const weeklyTDEEData = mapLogsToWeeks(tdeeLogs);

    const data = {
        labels: weeklyTDEEData.map((weekData) => weekData.week),
        datasets: [
            {
                label: 'Weekly Average TDEE',
                data: weeklyTDEEData.map((weekData) => weekData.avgTDEE),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
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
                text: 'Weekly Average TDEE',
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
                    text: 'TDEE',
                },
            },
        },
    };

    return (
        <div style={{ width: '100%', height: '100%' }}>
            {/* TDEE Line Chart */}
            <Line data={data} options={options} />
        </div>
    );
}

export default TDEEChart;
