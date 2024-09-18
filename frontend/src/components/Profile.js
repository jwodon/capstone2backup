import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../App';
import Api from '../api';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const { currentUser, setCurrentUser, logout } = useContext(UserContext);
    const [formData, setFormData] = useState({});
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser) {
            setFormData({
                email: currentUser.email,
                age: currentUser.age,
                gender: currentUser.gender,
                height: currentUser.height,
                starting_weight: currentUser.starting_weight,
                goal_weight: currentUser.goal_weight,
                goal_weight_loss_per_week: currentUser.goal_weight_loss_per_week,
                start_date: currentUser.start_date,
                activity_level: currentUser.activity_level,
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
        <div>
            <h2>Profile</h2>
            <form onSubmit={handleSubmit}>
                {/* Form fields go here */}
                <button type="submit">Update</button>
            </form>
            <button onClick={handleDeleteUser}>Delete Account</button>
        </div>
    );
}

export default Profile;
