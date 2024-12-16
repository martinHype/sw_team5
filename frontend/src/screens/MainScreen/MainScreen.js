'use client';

import React from 'react';
import { styles } from './styles';

const MainScreen = () => {
    const conferences = [
        "Konferencia 1",
        "Konferencia 2",
        "Konferencia 3",
        "Konferencia 4",
        "Konferencia 5",
    ];
    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <h1 style={styles.headerTitle}>Študentská vedecká konferencia</h1>
            </header>

            <main style={styles.main}>
                <h2 style={styles.sectionTitle}>Moje konferencie</h2>

                <ul style={styles.list}>
                    {conferences.map((conference, index) => (
                        <li key={index} style={styles.listItem}>
                            {conference}
                        </li>
                    ))}
                </ul>
            </main>
        </div>
    );
};

export default MainScreen;
