'use client';

import React, { useState } from 'react';
import { styles } from './styles';
import graduation_hat from "../../images/graduation_hat.png";
import user from "../../images/user.png";
import logout from "../../images/logout.png";

const MainScreen = () => {
    const conferences = [
        {
            name: "Konferencia 1",
            description: "Táto konferencia sa zameriava na nové trendy vo vede a technológii.",
            eventDate: "2024-12-20",
            uploadEndDate: "2024-12-15",
            articles: [
                { title: "Trendy vo vede", category: "Technológie", keywords: "veda, inovácie", createdOn: "2024-10-10" },
                { title: "Nové objavy", category: "Výskum", keywords: "objavy, výskum", createdOn: "2024-10-15" },
            ],
        },
        {
            name: "Konferencia 2",
            description: "Diskusia o inováciách v oblasti umelej inteligencie.",
            eventDate: "2025-01-10",
            uploadEndDate: "2025-01-05",
            articles: [
                { title: "AI vo výrobe", category: "AI", keywords: "AI, výroba", createdOn: "2024-11-01" },
            ],
        },
        {
            name: "Konferencia 3",
            description: "Konferencia na tému ochrany životného prostredia.",
            eventDate: "2025-02-15",
            uploadEndDate: "2025-02-10",
            articles: [],
        },
        {
            name: "Konferencia 4",
            description: "Diskusia o inováciách v oblasti umelej inteligencie.",
            eventDate: "2025-01-10",
            uploadEndDate: "2025-01-05",
            articles: [
                { title: "AI vo výrobe", category: "AI", keywords: "AI, výroba", createdOn: "2024-11-01" },
            ],
        },
    ];

    const [searchTerm, setSearchTerm] = useState('');

    const filteredConferences = conferences.filter((conference) =>
        conference.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const [visibleArticles, setVisibleArticles] = useState(
        conferences.reduce((acc, _, index) => {
            acc[index] = true; // Open all articles by default
            return acc;
        }, {})
    );
    const [hoveredArticle, setHoveredArticle] = useState(null);
    

    // Toggle visibility of articles for a specific conference
    const toggleArticles = (index) => {
        setVisibleArticles((prev) => ({
            ...prev,
            [index]: !prev[index], // Toggle the visibility for the specific conference
        }));
    };

    

    return (
        <div style={styles.container}>
            <header style={styles.header}>
            {/* Logo */}
            <div style={styles.headerContainer}>
                <img
                    src={graduation_hat}
                    alt="Logo"
                    style={{ height: "50px", width: "auto" }}
                />
                {/* Navigation */}
                <div style={styles.nav}>
                    <h1 style={styles.navTitle}>Študentská vedecká konferencia</h1>
                </div>
                {/* Icons */}
                <div style={styles.icons}>
                <img
                src={user}
                alt="User profile"
                style={{ height: "30px", width: "auto" }}
                />
                <img
                    src={logout}
                    alt="logout"
                    style={{ height: "30px", width: "auto" }}
                />
                </div>
            </div>
            
        </header>

            <div style={styles.contentWrapper}>
                

                {/* Main Content */}
                <main style={styles.main}>
                <h2 style={styles.sectionTitle}>Konferencie</h2>

                {/* Search Bar */}
                <input
                    type="text"
                    placeholder="Hľadajte konferenciu..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={styles.searchBar}
                />
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
                                    {/* Show/Hide Articles Button (Only if there are articles) */}
                                    {conference.articles.length > 0 && (
                                        <button
                                            onClick={() => toggleArticles(index)}
                                            style={styles.toggleButton}
                                        >
                                            {visibleArticles[index] ? 'Skryť články' : 'Zobraziť články'}
                                        </button>
                                    )}

                                    {/* Sublist of Articles */}
                                    <div style={styles.articlesSection}>
                                    {/* Articles List */}
                                    {visibleArticles[index] && conference.articles.length > 0 && (
                                        <div style={styles.articlesSection}>
                                            <ul style={styles.articleList}>
                                                {conference.articles.map((article, idx) => (
                                                    <li
                                                        key={idx}
                                                        style={{
                                                            ...styles.articleItem,
                                                            backgroundColor: hoveredArticle === idx ? '#ffffff' : '#f9f9f9',
                                                        }}
                                                        onMouseEnter={() => setHoveredArticle(idx)}
                                                        onMouseLeave={() => setHoveredArticle(null)}
                                                    >
                                                        <h3 style={styles.articleTitle}>{article.title}</h3>
                                                        <p style={styles.articleText}>Tato praca sa zaobera vyskumom v oblasti ...</p>
                                                        <p style={styles.articleText}><strong>{article.category}</strong></p>
                                                        <p style={styles.articleText}>{article.keywords}</p>
                                                        <span style={styles.articleDate}>{article.createdOn}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
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
