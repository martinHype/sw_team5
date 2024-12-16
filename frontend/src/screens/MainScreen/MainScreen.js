'use client'

import React, { useState } from 'react';
import { styles } from './styles';

const MainScreen = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedConference, setSelectedConference] = useState(null);

    const conferences = [
        "Konferencia 1",
        "Konferencia 2",
        "Konferencia 3",
    ];

    const handleConferenceSelect = (conference) => {
        setSelectedConference(conference);
        setIsOpen(false);
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Here you would typically handle the file upload
            console.log(`File selected for ${selectedConference}:`, file.name);
            // You can add your file upload logic here
        }
    };

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <h1 style={styles.headerTitle}>Študentská vedecká konferencia</h1>
            </header>

            <main style={styles.main}>
                <h2 style={styles.sectionTitle}>Moje konferencie</h2>

                <div style={styles.dropdown}>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        style={{
                            ...styles.dropdownButton,
                            ...(isOpen ? styles.dropdownButtonHover : {})
                        }}
                    >
            <span style={styles.dropdownButtonText}>
              {selectedConference || "Vyberte konferenciu"}
            </span>
                        <svg
                            style={{
                                ...styles.dropdownIcon,
                                ...(isOpen ? styles.dropdownIconOpen : {})
                            }}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </button>

                    {isOpen && (
                        <div style={styles.dropdownMenu}>
                            {conferences.map((conference, index) => (
                                <div
                                    key={index}
                                    style={styles.dropdownMenuItem}
                                    onClick={() => handleConferenceSelect(conference)}
                                >
                                    {conference}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {selectedConference && (
                    <div style={styles.conferenceBox}>
                        <span style={styles.conferenceName}>{selectedConference}</span>
                        <label htmlFor="file-upload" style={styles.uploadButton}>
                            Nahrať súbor
                        </label>
                        <input
                            id="file-upload"
                            type="file"
                            onChange={handleFileUpload}
                            style={{ display: 'none' }}
                        />
                    </div>
                )}
            </main>
        </div>
    );
};

export default MainScreen;

