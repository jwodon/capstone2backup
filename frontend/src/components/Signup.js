import React, { useContext, useState } from 'react';
import { UserContext } from '../App';
import { useNavigate } from 'react-router-dom';
import Api from '../api';


function Signup() {
    const { login } = useContext(UserContext);
    const [formData, setFormData] = useState({});
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
            await Api.signup(formData);
            await login({ username: formData.username, password: formData.password });
            navigate('/');
        } catch (err) {
            setError('Failed to sign up. Please try again.');
        }
    };

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                {/* Form fields go here */}
                <button type="submit">Sign Up</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
}

export default Signup;
