import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import Api from '../api';

function Login() {
    const { setCurrentUser, login } = useContext(UserContext); // Ensure login is extracted from context
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setFormData((fData) => ({ ...fData, [name]: value }));
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
            await login(formData); // Call the login function from context
            setCurrentUser({ username: formData.username }); // Optionally set user data
            navigate('/');
        } catch (err) {
            setError('Failed to log in. Please check your credentials.');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input type="text" name="username" value={formData.username} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <button type="submit">Login</button>
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
}

export default Login;
