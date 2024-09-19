import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../App';

function CurrentStats({ tdeeLogs }) {
    const { currentUser } = useContext(UserContext);
    const [currentDate, setCurrentDate] = useState('');
    const [currentWeight, setCurrentWeight] = useState(0);
    const [weightChange, setWeightChange] = useState(0);
    const [currentTDEE, setCurrentTDEE] = useState(0);

    useEffect(() => {
        if (currentUser && tdeeLogs.length > 0) {
            const today = new Date().toISOString().split('T')[0];
            setCurrentDate(today);

            const latestLog = tdeeLogs
                .filter((log) => log.weight > 0)
                .sort((a, b) => new Date(b.date) - new Date(a.date))[0];

            if (latestLog) {
                const latestWeight = Number(latestLog.weight);
                setCurrentWeight(latestWeight);
                const startingWeight = Number(currentUser.starting_weight) || 0;
                setWeightChange((latestWeight - startingWeight).toFixed(2));
            }

            const latestTDEELog = tdeeLogs
                .filter((log) => log.tdee)
                .sort((a, b) => new Date(b.date) - new Date(a.date))[0];

            if (latestTDEELog) {
                setCurrentTDEE(Number(latestTDEELog.tdee) || 0);
            }
        }
    }, [currentUser, tdeeLogs]);

    return (
        <div className="current-stats">
            <table className="table table-bordered">
                <tbody>
                    <tr>
                        <td>
                            <strong>Today's Date:</strong>
                        </td>
                        <td>{currentDate}</td>
                    </tr>
                    <tr>
                        <td>
                            <strong>Current Weight (lbs):</strong>
                        </td>
                        <td>{currentWeight.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td>
                            <strong>Weight Change (lbs):</strong>
                        </td>
                        <td>{weightChange}</td>
                    </tr>
                    <tr>
                        <td>
                            <strong>Current TDEE:</strong>
                        </td>
                        <td>{currentTDEE}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default CurrentStats;
