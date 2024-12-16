'use client';

import React, { useState } from 'react';
import { styles } from './styles';

const MainScreen = () => {
    const conferences = [
        {
            name: "Konferencia 1",
            description: "Táto konferencia sa zameriava na nové trendy vo vede a technológii.",
            eventDate: "2024-12-20",
            uploadEndDate: "2024-12-15",
        },
        {
            name: "Konferencia 2",
            description: "Diskusia o inováciách v oblasti umelej inteligencie.",
            eventDate: "2025-01-10",
            uploadEndDate: "2025-01-05",
        },
        {
            name: "Konferencia 3",
            description: "Konferencia na tému ochrany životného prostredia.",
            eventDate: "2025-02-15",
            uploadEndDate: "2025-02-10",
        },
        {
            name: "Konferencia 4",
            description: "Významné diskusie o pokrokoch v medicíne.",
            eventDate: "2025-03-01",
            uploadEndDate: "2025-02-25",
        },
        {
            name: "Konferencia 5",
            description: "Príležitosti v oblasti podnikania a marketingu.",
            eventDate: "2025-03-20",
            uploadEndDate: "2025-03-15",
        },
    ];
    const [searchTerm, setSearchTerm] = useState('');

    const filteredConferences = conferences.filter((conference) =>
        conference.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={styles.container}>
        <header style={styles.header}>
            <h1 style={styles.headerTitle}>Študentská vedecká konferencia</h1>
        </header>

        {/* Shared Wrapper */}
        <div style={styles.contentWrapper}>
            {/* Title */}
            <h2 style={styles.sectionTitle}>Konferencie</h2>
            {/* Search Bar */}
            {/* Search Bar */}
            <input
                type="text"
                placeholder="Hľadajte konferenciu..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={styles.searchBar}
            />
            {/* Main Content */}
            <main style={styles.main}>
                <ul style={styles.list}>
                    {filteredConferences.map((conference, index) => (
                        <li key={index} style={styles.listItem}>
                            <div style={styles.listItemContent}>
                                <button style={styles.addButton}>Pridať prácu</button>
                                <span style={styles.listItemText}>{conference.name}</span>
                                <p style={styles.conferenceDescription}>{conference.description}</p>
                                <div style={styles.datesContainer}>
                                    <div style={styles.dateField}>
                                        <label style={styles.dateLabel}>Event Date:</label>
                                        <span style={styles.dateValue}>{conference.eventDate}</span>
                                    </div>
                                    <div style={styles.dateField}>
                                        <label style={styles.dateLabel}>Upload End Date:</label>
                                        <span style={styles.dateValue}>{conference.uploadEndDate}</span>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </main>
        </div>

        <footer style={styles.footer}>
            <p style={styles.footerText}>© 2024 Študentská vedecká konferencia. Všetky práva vyhradené.</p>
        </footer>
    </div>
    );
};

export default MainScreen;
