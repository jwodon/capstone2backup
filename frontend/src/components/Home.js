import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import CurrentStats from './CurrentStats';
import WeeklyStatsTable from './WeeklyStatsTable';
import Api from '../api';
import { UserContext } from '../App';
import '../styles/Home.css';
import '../styles/App.css';

function Home() {
    const { currentUser } = useContext(UserContext);
    const [startDate, setStartDate] = useState(null);
    const [tdeeLogs, setTDEELogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (currentUser && currentUser.start_date) {
            setStartDate(currentUser.start_date);
        }
    }, [currentUser]);

    useEffect(() => {
        const fetchData = async () => {
            if (!currentUser || !currentUser.id || !startDate) {
                setLoading(false);
                return;
            }

            setLoading(true);
            try {
                const logs = await Api.fetchTDEELogs(currentUser.id, startDate);
                setTDEELogs(logs);
            } catch (error) {
                setError('Failed to fetch TDEE logs. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [currentUser, startDate]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="home-container">
            {currentUser ? (
                <div className="welcome-message">
                    <h1>Welcome back, {currentUser.username}! Let's track your progress today.</h1>
                    <CurrentStats tdeeLogs={tdeeLogs} />
                    <div className="container mt-4">
                        <div className="row">
                            <div className="table-column">
                                <WeeklyStatsTable
                                    startDate={startDate}
                                    tdeeLogs={tdeeLogs}
                                    setTDEELogs={setTDEELogs}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="signup-prompt">
                    <h1>Welcome to TrackTDEE!</h1>
                    <p>
                        TrackTDEE helps you monitor your Total Daily Energy Expenditure and progress easily.
                        Sign up to start tracking your fitness goals today!
                    </p>
                    <div className="action-buttons">
                        <Link to="/signup" className="btn btn-primary">
                            Sign Up
                        </Link>
                        <Link to="/login" className="btn btn-secondary">
                            Log In
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;
