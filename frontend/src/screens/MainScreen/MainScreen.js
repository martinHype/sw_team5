'use client';

import React from 'react';
import { styles } from './styles';

const MainScreen = () => {
    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <h1 style={styles.headerTitle}>Študentská vedecká konferencia</h1>
            </header>

            <main style={styles.main}>
                <h2 style={styles.sectionTitle}>Moje konferencie</h2>
            </main>
        </div>
    );
};

export default MainScreen;
