import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles'; // Import your existing styles

const NotFoundScreen = () => {
    const navigate = useNavigate();

    return (
        <div style={styles.notFoundContainer}>
            <h1 style={styles.notFoundHeading}>404 - Stránka nenájdená</h1>
            <p style={styles.notFoundText}>Stránka, ktorú hľadáte neexistuje</p>
            <button style={styles.notFoundButton} onClick={() => navigate('/')}>
                Späť na konferencie
            </button>
        </div>
    );
};

export default NotFoundScreen;