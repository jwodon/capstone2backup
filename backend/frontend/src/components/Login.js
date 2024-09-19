import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import '../styles/Login.css'; // Import CSS for styling

function Login() {
    const { login } = useContext(UserContext); // Removed setCurrentUser; it's handled in login
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
            await login(formData); // Call login function; setCurrentUser is handled inside
            navigate('/'); // Redirect to the home page upon successful login
        } catch (err) {
            setError('Failed to log in. Please check your credentials.');
        }
    };

    return (
        <div className="login-container">
            <h2>Welcome Back!</h2>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input 
                        type="text" 
                        name="username" 
                        id="username"
                        value={formData.username} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input 
                        type="password" 
                        name="password" 
                        id="password"
                        value={formData.password} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
            <div className="signup-prompt">
                <p>Don't have an account?</p>
                <button className="btn btn-secondary" onClick={() => navigate('/signup')}>Sign Up</button>
            </div>
        </div>
    );
}

export default Login;
