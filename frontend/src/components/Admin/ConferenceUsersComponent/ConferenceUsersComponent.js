import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './styles'; // Import your styles

const ConferenceArticlesComponent = ({ conferenceId }) => {
    const { id } = useParams();
    const [conference, setConference] = useState(null);
    const [articles, setArticles] = useState([]);
    const [reviewers, setReviewers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchConferenceAndArticles = async () => {
            const token = sessionStorage.getItem('authToken');
            setIsLoading(true);
            setError(null);

            try {
                // Fetch conference details
                const conferenceResponse = await axios.get(`http://localhost:8080/api/admin/get-event-detail/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                // Fetch articles assigned to the conference
                const articlesResponse = await axios.get(`http://localhost:8080/api/admin/conference/${id}/articles`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                // Fetch users with the reviewers role
                const reviewersResponse = await axios.get(`http://localhost:8080/api/admin/roles/reviewers`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setConference(conferenceResponse.data.data);
                setArticles(
                    Object.values(articlesResponse.data).map((article) => ({
                        ...article,
                        user: article.user || { firstname: 'Unknown', lastname: '' }, // Default if user is null
                    }))
                );
                setReviewers(Object.values(reviewersResponse.data));
            } catch (error) {
                console.error('Error fetching data:', error.response?.data || error.message);
                setError('Nepodarilo sa načítať údaje.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchConferenceAndArticles();
    }, [conferenceId]);

    const handleReviewerChange = async (articleId, userId) => {
        const token = sessionStorage.getItem('authToken');

        try {
            await axios.post(
                `http://localhost:8080/api/admin/articles/${articleId}/assign-reviewer`,
                { reviewer_id: userId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            alert('Recenzent bol úspešne priradený.');
            const articlesResponse = await axios.get(`http://localhost:8080/api/admin/conference/${id}/articles`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setArticles(Object.values(articlesResponse.data));
        } catch (error) {
            console.error('Error assigning reviewer:', error.response?.data || error.message);
            alert('Pri priraďovaní recenzenta nastala chyba.');
        }
    };

    if (isLoading) {
        return (
            <div style={styles.loaderContainer}>
                <div style={styles.loader}></div>
            </div>
        );
    }

    if (error) {
        return <div style={styles.error}>{error}</div>;
    }

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>{conference.event_name}</h2>
            <div style={styles.articlesList}>
                {articles.map((article) => (
                    <div style={styles.articleCard} key={article.idarticle}>
                        <div style={styles.articleDetails}>
                            <p style={styles.articleTitle}><strong>{article.title}</strong></p>
                            <p style={styles.articleAuthor}>Author: {article.user.firstname} {article.user.lastname}</p>
                            <p style={styles.articleDescription}>{article.Description}</p>
                            <select
                                id={`article-${article.idarticle}`}
                                value={article.reviewer_id || ''} // Show reviewer_id or empty if none assigned
                                onChange={(e) => handleReviewerChange(article.idarticle, e.target.value)}
                                style={styles.dropdownSmall}
                            >
                                <option
                                    value="">{article.idreviewer ? `Assigned: ${reviewers.find(reviewer => reviewer.iduser === article.idreviewer)?.firstname || ''} ${reviewers.find(reviewer => reviewer.iduser === article.idreviewer)?.lastname || ''}` : 'Prideliť recenzenta'}</option>
                                {reviewers.map((reviewer) => (
                                    <option key={reviewer.iduser} value={reviewer.iduser}>
                                        {reviewer.firstname} {reviewer.lastname}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ConferenceArticlesComponent;
