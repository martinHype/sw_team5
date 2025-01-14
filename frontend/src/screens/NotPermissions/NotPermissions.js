import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles'; // Import your existing styles

const NotPermissions = () => {
    const navigate = useNavigate();

    return (
        <div style={styles.notFoundContainer}>
            <h1 style={styles.notFoundHeading}>Na zvolenú stránku nemáte dostatočné práva </h1>
            <p style={styles.notFoundText}>Obsah je pre Vás nedostupný</p>
            <button style={styles.notFoundButton} onClick={() => navigate('/')}>
                Späť na konferencie
            </button>
        </div>
    );
};

export default NotPermissions;