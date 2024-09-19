import React, { useState, createContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Corrected import statement
import Home from './components/Home';
import NavBar from './components/NavBar';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import About from './components/About';
import ChartsPage from './components/ChartsPage';
import Api from './api';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';
import './styles/Home.css';

export const UserContext = createContext(null);

function App() {
    const [currentUser, setCurrentUser] = useState(null);
    const [tdeeLogs, setTDEELogs] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token'));

    useEffect(() => {
        async function fetchUser() {
            if (token) {
                try {
                    const decodedToken = jwtDecode(token);
                    const { username } = decodedToken;
                    Api.token = token;
                    let user = await Api.getCurrentUser(username);

                    // Format the start_date before setting the user
                    if (user && user.start_date) {
                        const date = new Date(user.start_date);
                        if (!isNaN(date)) {
                            user.start_date = date.toISOString().split('T')[0];
                        } else {
                            console.error('Invalid start_date in user data:', user.start_date);
                            user.start_date = '';
                        }
                    }

                    setCurrentUser(user);

                    if (user && user.start_date) {
                        const logs = await Api.fetchTDEELogs(user.id, user.start_date);
                        setTDEELogs(logs);
                    }
                } catch (err) {
                    console.error('App fetchUser error', err);
                    setCurrentUser(null);
                }
            } else {
                setCurrentUser(null);
            }
        }
        fetchUser();
    }, [token]);

    const logout = () => {
        setCurrentUser(null);
        Api.token = null;
        localStorage.removeItem('token');
    };

    const login = async (data) => {
        try {
            const token = await Api.login(data);
            setToken(token);
            localStorage.setItem('token', token);
            Api.token = token;
            const decodedToken = jwtDecode(token);
            const { username } = decodedToken;
            let user = await Api.getCurrentUser(username);

            // Format the start_date before setting the user
            if (user && user.start_date) {
                const date = new Date(user.start_date);
                if (!isNaN(date)) {
                    user.start_date = date.toISOString().split('T')[0];
                } else {
                    console.error('Invalid start_date in user data:', user.start_date);
                    user.start_date = '';
                }
            }

            setCurrentUser(user);

            if (user && user.start_date) {
                const logs = await Api.fetchTDEELogs(user.id, user.start_date);
                setTDEELogs(logs);
            }
            return user; // Return the user data
        } catch (err) {
            console.error('Login failed', err);
            throw err;
        }
    };

    return (
        <Router>
            <UserContext.Provider value={{ currentUser, tdeeLogs, setTDEELogs, logout, login }}>
                <div className="App">
                    <NavBar />
                    <div className="container mt-4">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/charts" element={<ChartsPage />} />
                        </Routes>
                    </div>
                </div>
            </UserContext.Provider>
        </Router>
    );
}

export default App;
