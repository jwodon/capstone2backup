import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../App';
import Api from '../api';
import { useNavigate } from 'react-router-dom';
import '../styles/Profile.css';

function Profile() {
    const { currentUser, setCurrentUser, logout } = useContext(UserContext);
    const [formData, setFormData] = useState({
        email: '',
        age: '',
        gender: '',
        height: '',
        starting_weight: '',
        goal_weight: '',
        goal_weight_loss_per_week: '',
        start_date: '',
        activity_level: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser) {
            setFormData({
                email: currentUser.email || '',
                age: currentUser.age || '',
                gender: currentUser.gender || '',
                height: currentUser.height || '',
                starting_weight: currentUser.starting_weight || '',
                goal_weight: currentUser.goal_weight || '',
                goal_weight_loss_per_week: currentUser.goal_weight_loss_per_week || '',
                start_date: currentUser.start_date ? new Date(currentUser.start_date).toISOString().split('T')[0] : '',
                activity_level: currentUser.activity_level || '',
            });
        }
    }, [currentUser]);

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
            const updatedUser = await Api.updateUser(currentUser.username, formData);
            setCurrentUser(updatedUser);
            navigate('/profile');
        } catch (err) {
            setError('Failed to update profile');
        }
    };

    const handleDeleteUser = async () => {
        const confirmDelete = window.confirm('Are you sure you want to delete your account?');
        if (confirmDelete) {
            await Api.deleteUser(currentUser.username);
            logout();
            navigate('/signup');
        }
    };

    return (
        <div className="profile-container">
            <h2>Your Profile</h2>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit} className="profile-form">
                <div className="form-section">
                    <h3>Personal Information</h3>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="age">Age:</label>
                        <input
                            type="number"
                            name="age"
                            id="age"
                            value={formData.age}
                            onChange={handleChange}
                            min="0"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="gender">Gender:</label>
                        <select name="gender" id="gender" value={formData.gender} onChange={handleChange} required>
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="non-binary">Non-Binary</option>
                            <option value="prefer-not-to-say">Prefer not to say</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="activity_level">Activity Level:</label>
                        <select
                            name="activity_level"
                            id="activity_level"
                            value={formData.activity_level}
                            onChange={handleChange}
                            required>
                            <option value="">Select Activity Level</option>
                            <option value="sedentary">Sedentary</option>
                            <option value="light">Lightly Active</option>
                            <option value="moderate">Moderately Active</option>
                            <option value="active">Active</option>
                            <option value="very-active">Very Active</option>
                        </select>
                    </div>
                </div>

                <div className="form-section">
                    <h3>Physical Stats</h3>
                    // In the Physical Stats section
                    <div className="form-group">
                        <label htmlFor="height">Height (inches):</label>
                        <input
                            type="number"
                            name="height"
                            id="height"
                            value={formData.height}
                            onChange={handleChange}
                            min="0"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="starting_weight">Starting Weight (lbs):</label>
                        <input
                            type="number"
                            name="starting_weight"
                            id="starting_weight"
                            value={formData.starting_weight}
                            onChange={handleChange}
                            min="0"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="goal_weight">Goal Weight (lbs):</label>
                        <input
                            type="number"
                            name="goal_weight"
                            id="goal_weight"
                            value={formData.goal_weight}
                            onChange={handleChange}
                            min="0"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="goal_weight_loss_per_week">Weekly Weight Loss Goal (lbs):</label>
                        <input
                            type="number"
                            name="goal_weight_loss_per_week"
                            id="goal_weight_loss_per_week"
                            value={formData.goal_weight_loss_per_week}
                            onChange={handleChange}
                            step="0.1"
                            required
                        />
                    </div>
                </div>

                <div className="form-section">
                    <h3>Program Start Date</h3>
                    <div className="form-group">
                        <label htmlFor="start_date">Start Date:</label>
                        <input
                            type="date"
                            name="start_date"
                            id="start_date"
                            value={formData.start_date}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="button-group">
                    <button type="submit" className="btn btn-primary">
                        Update Profile
                    </button>
                    <button type="button" onClick={handleDeleteUser} className="btn btn-danger">
                        Delete Account
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Profile;
