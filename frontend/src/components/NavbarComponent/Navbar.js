import React from 'react';
import styles from './styles';
import graduationHat from "./images/graduation_hatG.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const handleLogout = async () => {
        console.log(sessionStorage.getItem('authToken'))
        try {
            // Send a POST request to the logout route
            await axios.post(
                'http://localhost:8080/api/logout',
                {},
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                    },
                }
            );

            // Clear the token from localStorage
            sessionStorage.removeItem('authToken');
            navigate('/');

            // For testing, display an alert to confirm logout
            alert("Logged out successfully!");
        } catch (error) {
            console.error("Logout failed:", error);
            alert("Logout failed!");
        }
    };

    return (
        <div style={styles.navbar}>
            <div style={styles.logo}>
                <img src={graduationHat} style={styles.img} alt="Graduation hat"/>
                <p style={styles.text}> ŠTUDENTSKÁ VEDECKÁ KONFERENCIA</p>
            </div>
            <div style={styles.navLinks}>
                <a href="#" style={styles.link}>
                    Vyhľadávanie
                </a>
                <a href="/create-conference" style={styles.link}>
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
