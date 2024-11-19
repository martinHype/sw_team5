import React from 'react';
import styles from './styles';
import graduationHat from "./images/graduation_hatG.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const Navbar = () => {
    const handleLogout = async () => {
        const token = localStorage.getItem('authToken');
        try {
            const response = await axios.post(
                'http://localhost:8080/api/logout',
                {},
                {
                    headers: {
                        'Authorization': `Bearer e4bb0f92e698e338e38b6cb9b285d386ef3ea4c19d116ee0fad386609b1b5f4f`, // Include the token in the Authorization header
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.status === 200) {
                alert('You have been logged out successfully.');
                localStorage.removeItem('authToken'); // Clear client-side auth token
                navigate('/'); // Redirect to the login page
            }
        } catch (error) {
            console.error('Logout Error:', error);
            alert(`Failed to log out: ${error.response?.data?.message || error.message}`);
        }
    };

    return (
        <div style={styles.navbar}>
            <div style={styles.logo}>
                <img src={graduationHat} style={styles.img} alt={}/>
                <p style={styles.text}> ŠTUDENTSKÁ VEDECKÁ KONFERENCIA</p>
            </div>
            <div style={styles.navLinks}>
                <a href="#" style={styles.link}>
                    Vyhľadávanie
                </a>
                <a href="#" style={styles.link}>
                    Nový
                </a>
                <a href="#" style={styles.link}>
                    História
                </a>
                <a href="#" style={styles.link}>
                    Moje práce
                </a>
            </div>
            <div style={styles.icons}>
                <FontAwesomeIcon icon={faUser} style={styles.icon} title="Profil"/>
                <FontAwesomeIcon
                    icon={faSignOutAlt}
                    style={styles.icon}
                    title="Odhlásiť sa"
                    onClick={handleLogout} // Attach logout functionality
                />
            </div>
        </div>
    );
};

export default Navbar;
