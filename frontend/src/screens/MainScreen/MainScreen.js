'use client';

import React, { useEffect, useState } from 'react';
import { styles } from './styles';
import graduation_hat from "../../images/graduation_hat.png";
import user from "../../images/user.png";
import logout from "../../images/logout.png";
import { useNavigate } from 'react-router-dom';

const MainScreen = () => {
    const [events, setEvents] = useState([]);
    const [visibleArticles, setVisibleArticles] = useState({});
    const navigate = useNavigate();
    //const [loading, setLoading] = useState(true);
    //const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/studentevents',{
                    method:"GET",
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + sessionStorage.getItem('authToken'),
                      },
                }); // Replace with your API URL
                if (!response.ok) throw new Error('Failed to fetch events');
                const data = await response.json();
                setEvents(data);
                console.log(data);
                const initialVisibility = data.reduce((acc, event) => {
                    acc[event.idevent] = true;
                    return acc;
                }, {});
                setVisibleArticles(initialVisibility);
                //setEvents(data);
                //setLoading(false);
            } catch (err) {
                console.log(err.message);
                
            }
        };
        fetchEvents();
    }, []);

    const [searchTerm, setSearchTerm] = useState('');

    const filteredEvents = events.filter((event) =>
        event.event_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const [hoveredArticle, setHoveredArticle] = useState(null);
    

    // Toggle articles visibility
    const toggleArticles = (id) => {
        setVisibleArticles((prev) => ({
            ...prev,
            [id]: !prev[id],
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
                        {filteredEvents.map((event) => (
                            <li key={event.idevent} style={styles.listItem}>
                                <div style={styles.listItemContent}>
                                    <button 
                                    style={styles.addButton}
                                    onClick={() => navigate('/uploadarticle', { state: { 
                                        formMode:"New",
                                        conferenceName: event.idevent
                                     } })}
                                    >Pridať prácu</button>
                                    <span style={styles.listItemText}>{event.event_name}</span>
                                    <p style={styles.conferenceDescription}>This is the event description</p>
                                    <div style={styles.datesContainer}>
                                        <div style={styles.dateField}>
                                            <label style={styles.dateLabel}>Event Date:</label>
                                            <span style={styles.dateValue}>{event.event_date}</span>
                                        </div>
                                        <div style={styles.dateField}>
                                            <label style={styles.dateLabel}>Upload End Date:</label>
                                            <span style={styles.dateValue}>{event.event_upload_EndDate}</span>
                                        </div>
                                    </div>
                                    {/* Show/Hide Articles Button (Only if there are articles) */}
                                    {event.articles.length > 1 && (
                                        <button
                                            onClick={() => toggleArticles(event.idevent)}
                                            style={styles.toggleButton}
                                        >
                                            {visibleArticles[event.idevent] ? 'Skryť články' : 'Zobraziť články'}
                                        </button>
                                    )}

                                    {/* Sublist of Articles */}
                                    <div style={styles.articlesSection}>
                                    {/* Articles List */}
                                    {visibleArticles[event.idevent] && event.articles.length > 0 && (
                                        <div style={styles.articlesSection}>
                                            <ul style={styles.articleList}>
                                                {event.articles.map(article => (
                                                    <li
                                                        key={article.idarticle}
                                                        style={{
                                                            ...styles.articleItem,
                                                            backgroundColor: hoveredArticle === article.idarticle ? '#ffffff' : '#f9f9f9',
                                                        }}
                                                        onMouseEnter={() => setHoveredArticle(article.idarticle)}
                                                        onMouseLeave={() => setHoveredArticle(null)}
                                                        onClick={() => navigate('/uploadarticle', 
                                                            { state: {
                                                                formMode:"View", 
                                                                articleid: article.idarticle,
                                                                title:article.title,
                                                                description:article.Description,
                                                                category:article.category_idcategory,
                                                            } })}
                                                    >
                                                        <h3 style={styles.articleTitle}>{article.title}</h3>
                                                        <p style={styles.articleText}>{article.Description}</p>
                                                        <p style={styles.articleText}><strong>{article.category_idcategory}</strong></p>
                                                        <p style={styles.articleText}>some keywords</p>
                                                        <span style={styles.articleDate}>{article.created_at}</span>
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
