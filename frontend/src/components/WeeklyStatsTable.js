import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../App';
import Api from '../api';

// Helper function to get the dates for a specific week
const getWeekDates = (startDate, weekOffset) => {
    const start = new Date(startDate);
    const startOfWeek = new Date(start);
    const day = startOfWeek.getDay();
    const difference = (day === 0 ? -6 : 1) - day; // Adjust to Monday
    startOfWeek.setDate(startOfWeek.getDate() + difference);
    startOfWeek.setDate(startOfWeek.getDate() + weekOffset * 7);

    const weekDates = [];
    for (let i = 0; i < 7; i++) {
        const date = new Date(startOfWeek);
        date.setDate(startOfWeek.getDate() + i);
        weekDates.push(date);
    }
    return weekDates;
};

// Helper function to map logs to weeks
const mapLogsToWeeks = (startDate, logs) => {
    const weeks = [];
    const start = new Date(startDate);
    const lastLogDate = new Date(logs[logs.length - 1].date);
    const endOfWeek = new Date(lastLogDate);
    endOfWeek.setDate(endOfWeek.getDate() + ((7 - lastLogDate.getDay() + 1) % 7));
    const totalWeeks = Math.ceil((endOfWeek - start) / (7 * 24 * 60 * 60 * 1000));

    for (let i = 0; i < totalWeeks; i++) {
        const weekDates = getWeekDates(startDate, i);
        const weekLogs = weekDates.map((date) => {
            const log = logs.find((log) => new Date(log.date).toDateString() === date.toDateString());
            return log || { date: date.toISOString().split('T')[0], weight: '', calories_intake: '' };
        });
        weeks.push({ weekDates, weekLogs });
    }
    return weeks;
};

function WeeklyStatsTable({ startDate, tdeeLogs, setTDEELogs }) {
    const [weeks, setWeeks] = useState([]);
    const { currentUser } = useContext(UserContext);

    useEffect(() => {
        if (currentUser && startDate) {
            const fetchLogs = async () => {
                try {
                    const logs = await Api.fetchTDEELogs(currentUser.id, startDate);
                    const mappedWeeks = mapLogsToWeeks(startDate, logs);
                    setWeeks(mappedWeeks);
                } catch (error) {
                    console.error('Error fetching TDEE logs:', error);
                }
            };
            fetchLogs();
        }
    }, [currentUser, startDate]);

    const handleChange = (event, weekIndex, dayIndex, type) => {
        if (weekIndex < 0 || weekIndex >= weeks.length) return;
        const updatedWeeks = [...weeks];
        updatedWeeks[weekIndex].weekLogs[dayIndex][type] = event.target.value;
        setWeeks(updatedWeeks);
    };

    const calculateAverage = (data) => {
        const validNumbers = data.map((value) => parseFloat(value)).filter((value) => !isNaN(value) && value > 0);
        const sum = validNumbers.reduce((acc, curr) => acc + curr, 0);
        return validNumbers.length > 0 ? (sum / validNumbers.length).toFixed(2) : '0';
    };

    const calculateTDEE = (currentWeekLogs, previousWeekLogs, startingWeight) => {
        const validLogs = currentWeekLogs.filter((log) => log.weight > 0 && log.calories_intake > 0);
        const weekCount = validLogs.length;
        const avgCalories = parseFloat(calculateAverage(validLogs.map((log) => log.calories_intake)));
        const avgWeightCurrentWeek = parseFloat(calculateAverage(validLogs.map((log) => log.weight)));
        let avgWeightPreviousWeek;

        if (previousWeekLogs && previousWeekLogs.length > 0) {
            avgWeightPreviousWeek = parseFloat(
                calculateAverage(previousWeekLogs.filter((log) => log.weight > 0).map((log) => log.weight))
            );
        } else {
            avgWeightPreviousWeek = startingWeight;
        }

        if (weekCount === 0 || isNaN(avgCalories) || isNaN(avgWeightCurrentWeek) || isNaN(avgWeightPreviousWeek)) {
            return '0.00';
        }

        const weightDiff = avgWeightCurrentWeek - avgWeightPreviousWeek;
        const tdee = avgCalories + (-weightDiff * 3500) / weekCount;
        return tdee.toFixed(2);
    };

    const saveWeeklyData = async (weekIndex) => {
        if (!currentUser || !currentUser.id || weekIndex < 0 || weekIndex >= weeks.length) return;

        const weekLogs = weeks[weekIndex]?.weekLogs;
        if (!weekLogs) return;

        const logsToSave = weekLogs.map((log) => ({
            userId: currentUser.id,
            date: log.date,
            weight: parseFloat(log.weight) || 0,
            caloriesIntake: parseFloat(log.calories_intake) || 0,
            tdee: calculateTDEE(weekLogs, weeks[weekIndex - 1]?.weekLogs || [], currentUser.starting_weight),
            calorieDeficitSurplus: 0,
        }));

        try {
            await Promise.all(logsToSave.map((log) => Api.saveLog(log)));
            const updatedLogs = await Api.fetchTDEELogs(currentUser.id, startDate);
            setTDEELogs(updatedLogs);
        } catch (error) {
            console.error('Error saving weekly data:', error);
            alert('Failed to save data. Please try again.');
        }
    };

    const addNewWeek = async () => {
        const newWeeks = [...weeks];
        const newWeekIndex = newWeeks.length;
        const newWeekDates = getWeekDates(startDate, newWeekIndex);

        const newWeek = {
            weekDates: newWeekDates,
            weekLogs: newWeekDates.map((date) => ({
                date: date.toISOString().split('T')[0],
                weight: '',
                calories_intake: '',
            })),
        };

        newWeeks.push(newWeek);
        setWeeks(newWeeks);
        await saveWeeklyData(newWeekIndex);
    };

    return (
        <div className="table-container">
            <div className="add-week-container">
                <button className="add-week-button" onClick={addNewWeek}>
                    Add New Week
                </button>
            </div>
            <table className="table table-bordered table-hover stats-table">
                <thead className="thead-dark">
                    <tr>
                        <th rowSpan="2">Week</th>
                        <th rowSpan="2">Stats</th>
                        <th colSpan="7">Days</th>
                        <th rowSpan="2">Weight Avg</th>
                        <th rowSpan="2">Calories Avg</th>
                        <th rowSpan="2">TDEE</th>
                    </tr>
                    <tr>
                        <th>Mon</th>
                        <th>Tue</th>
                        <th>Wed</th>
                        <th>Thu</th>
                        <th>Fri</th>
                        <th>Sat</th>
                        <th>Sun</th>
                    </tr>
                </thead>
                <tbody>
                    {weeks.map((week, weekIndex) => {
                        const weightAvg = calculateAverage(week.weekLogs.map((log) => log.weight));
                        const caloriesAvg = calculateAverage(week.weekLogs.map((log) => log.calories_intake));
                        const tdee = calculateTDEE(
                            week.weekLogs,
                            weeks[weekIndex - 1]?.weekLogs || [],
                            currentUser.starting_weight
                        );

                        return (
                            <React.Fragment key={weekIndex}>
                                <tr>
                                    <td rowSpan="2">
                                        Week {weekIndex + 1} ({week.weekDates[0].toLocaleDateString()} -{' '}
                                        {week.weekDates[6].toLocaleDateString()})
                                    </td>
                                    <td className="multi-row">Weight</td>
                                    {week.weekLogs.map((log, dayIndex) => (
                                        <td key={`weight-${weekIndex}-${dayIndex}`}>
                                            <input
                                                type="number"
                                                value={log.weight}
                                                onChange={(event) => handleChange(event, weekIndex, dayIndex, 'weight')}
                                                onBlur={() => saveWeeklyData(weekIndex)}
                                                min="0"
                                                max="1000"
                                                step="0.1"
                                            />
                                        </td>
                                    ))}
                                    <td rowSpan="2">{weightAvg}</td>
                                    <td rowSpan="2">{caloriesAvg}</td>
                                    <td rowSpan="2">{tdee}</td>
                                </tr>
                                <tr>
                                    <td className="multi-row">Calories</td>
                                    {week.weekLogs.map((log, dayIndex) => (
                                        <td key={`calories-${weekIndex}-${dayIndex}`}>
                                            <input
                                                type="number"
                                                value={log.calories_intake}
                                                onChange={(event) =>
                                                    handleChange(event, weekIndex, dayIndex, 'calories_intake')
                                                }
                                                onBlur={() => saveWeeklyData(weekIndex)}
                                                min="0"
                                                max="10000"
                                                step="1"
                                            />
                                        </td>
                                    ))}
                                </tr>
                            </React.Fragment>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default WeeklyStatsTable;
