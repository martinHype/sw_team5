'use client';

import React, { useEffect, useState } from 'react';
import { styles } from './styles';
import graduation_hat from "../../images/graduation_hat.png";
import user from "../../images/user.png";
import logout from "../../images/logout.png";
import { useNavigate } from 'react-router-dom';
import { format } from "date-fns";
import HeaderComponent from '../../components/ScreenParts/HeaderComponent/HeaderComponent';
import FooterComponent from '../../components/ScreenParts/FooterComponent/FooterComponent';

const MainScreen = () => {
    const [events, setEvents] = useState([]);
    const [visibleArticles, setVisibleArticles] = useState({});
    const navigate = useNavigate();
    const [userRole, setUserRole] = useState([]);
    const [loggedInUserId, setLoggedInUserId] = useState(null);
    const today = new Date();


    const statusColors = {
        "Koncept": "#d3d3d3", // Light Grey
        "Čaká na recenziu": "#2196F3", // Blue
        "Prebieha kontrola":"#FFD700", // Yellow
        "Publikovať v predloženej forme": "#4CAF50", // Green
        "Publikovať po zapracovaní pripomienok": "#FF9800", // Orange
        "Neprijať pre publikovanie": "#F44336", // Red
        "Práca ohodnotená":"#708090",
    };
    //const [loading, setLoading] = useState(true);
    //const [error, setError] = useState(null);
    useEffect(() => {
        const rolesString = sessionStorage.getItem("userRoles");
        const rolesArray = rolesString ? rolesString.split(",") : [];

        const userId = sessionStorage.getItem("userId");
        console.log(rolesArray);
        setUserRole(rolesArray);
        setLoggedInUserId(parseInt(userId, 10));
        
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

    const handlenavigation = (article,event) => {
        if (String(article.idreviewer) === sessionStorage.getItem("userId")) {
            if(article.acticle_status_idacticle_status > 3)
                navigate(`/viewreviewarticle/${article.idarticle}`);
            else
                navigate(`/reviewarticle/${article.idarticle}`);
        }else{
            if(article.acticle_status_idacticle_status === 1){
                navigate(`/editarticle/${article.idarticle}`,{ state: {
                    conferenceId: event.idevent
                 } });
            }else if(today.getTime() <= new Date(event.event_upload_EndDate).getTime()){
                navigate(`/viewarticle/${article.idarticle}`,{ state: {
                    conferenceId: event.idevent
                 } });
            }else{
                navigate(`/viewreviewarticle/${article.idarticle}`);
            }
        }
      };

    

    return (
        <div style={styles.container}>
            <HeaderComponent/>

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
                                
                                    {userRole.includes('student') && !event.articles.some((article) => article.user_iduser === loggedInUserId) && <button 
                                    style={styles.addButton}
                                    onClick={() => navigate('/uploadarticle', { state: { 
                                        formMode:"New",
                                        conferenceId: event.idevent
                                     } })}
                                    >Pridať prácu</button>}
                                    <span style={styles.listItemText}>{event.event_name}</span>
                                    <p style={styles.conferenceDescription}>{event.description}</p>
                                    <div style={styles.datesContainer}>
                                        <div style={styles.dateField}>
                                            <label style={styles.dateLabel}>Event Date:</label>
                                            <span style={styles.dateValue}>{format(new Date(event.event_date), 'dd.MM.yyyy')}</span>
                                        </div>
                                        <div style={styles.dateField}>
                                            <label style={styles.dateLabel}>Upload End Date:</label>
                                            <span style={styles.dateValue}>{format(new Date(event.event_upload_EndDate), 'dd.MM.yyyy')}</span>
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
                                                        onClick={() => handlenavigation(article,event)}
                                                    >
                                                        <h3 style={styles.articleTitle}>{article.title}</h3>
                                                        <p style={styles.articleText}>{article.Description}</p>
                                                        <p style={styles.articleText}><strong>{article.category_name}</strong></p>
                                                        <p style={styles.articleText}>Key words</p>
                                                        <span style={styles.articleDate}>{format(new Date(article.created_at), 'dd.MM.yyyy')}</span>
                                                        {/* Status Label */}
                                                        <div
                                                            style={{
                                                                ...styles.statusLabel,
                                                                backgroundColor:
                                                                    statusColors[(article.acticle_status_idacticle_status > 3 && today.getTime() <= new Date(event.event_upload_EndDate).getTime() && article.user_iduser === loggedInUserId)  ? "Práca ohodnotená": article.acticle_status_name] ||
                                                                    "#000000", // Default fallback color
                                                            }}
                                                        >
                                                            {(article.acticle_status_idacticle_status > 3 && today.getTime() <= new Date(event.event_upload_EndDate).getTime() && article.user_iduser === loggedInUserId)  ? "Práca ohodnotená": article.acticle_status_name}
                                                        </div>
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

            <FooterComponent/>
        </div>
    );
};

export default MainScreen;
