import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './styles';

const ProfileComponent = () => {
    const [profile, setProfile] = useState({
        email: '',
        firstname: '',
        lastname: '',
    });
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            const token = sessionStorage.getItem('authToken');
            try {
                const response = await axios.get('http://localhost:8080/api/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setProfile(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching profile:', error.response?.data || error.message);
            }
        };

        fetchProfile();
    }, []);

    const handleSaveChanges = async () => {
        const token = sessionStorage.getItem('authToken');
        try {
            await axios.put(
                'http://localhost:8080/api/profile',
                {
                    email: profile.email,
                    firstname: profile.firstname,
                    lastname: profile.lastname,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setSuccessMessage('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error.response?.data || error.message);
            setErrorMessage('Error updating profile.');
        }
    };

    const handlePasswordChange = async () => {
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match.');
            return;
        }

        const token = sessionStorage.getItem('authToken');
        try {
            await axios.post(
                'http://localhost:8080/api/profile/change-password',
                {
                    current_password: prompt('Please enter your current password:'),
                    new_password: password,
                    new_password_confirmation: confirmPassword,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setSuccessMessage('Password changed successfully!');
            setPassword('');
            setConfirmPassword('');
        } catch (error) {
            console.error('Error changing password:', error.response?.data || error.message);
            setErrorMessage('Error changing password.');
        }
    };


    return (
        <div style={styles.formContainer}>
            <h1>Profile</h1>
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

            <div style={styles.formGroup}>
                <label style={styles.label}>Email</label>
                <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    style={styles.input}
                />
            </div>

            <div style={styles.formGroup}>
                <label style={styles.label}>First Name</label>
                <input
                    type="text"
                    value={profile.firstname}
                    onChange={(e) => setProfile({ ...profile, firstname: e.target.value })}
                    style={styles.input}
                />
            </div>

            <div style={styles.formGroup}>
                <label style={styles.label}>Last Name</label>
                <input
                    type="text"
                    value={profile.lastname}
                    onChange={(e) => setProfile({ ...profile, lastname: e.target.value })}
                    style={styles.input}
                />
            </div>


            <button onClick={handleSaveChanges} style={styles.button}>
                Save Changes
            </button>

            <h2>Change Password</h2>
            <div style={styles.formGroup}>
                <label style={styles.label}>New Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                />
            </div>

            <div style={styles.formGroup}>
                <label style={styles.label}>Confirm New Password</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={styles.input}
                />
            </div>

            <button onClick={handlePasswordChange} style={styles.button}>
                Change Password
            </button>
        </div>
    );
};

export default ProfileComponent;
