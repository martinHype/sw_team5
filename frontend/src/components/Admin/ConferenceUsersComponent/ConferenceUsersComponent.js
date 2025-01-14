import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select';
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

    const handleReviewerChange = async (articleId, selectedOption) => {
        const userId = selectedOption?.value;
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
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}> {/* Align dropdown properly */}
                            <label htmlFor={`article-${article.idarticle}`} style={{ marginRight: '10px', fontWeight: 'bold' }}>Reviewer:</label>
                            <Select
                                id={`article-${article.idarticle}`}
                                options={reviewers.map((reviewer) => ({
                                    value: reviewer.iduser,
                                    label: `${reviewer.firstname} ${reviewer.lastname}`,
                                }))}
                                value={
                                    article.idreviewer
                                        ? {
                                            value: article.idreviewer,
                                            label: `${reviewers.find((r) => r.iduser === article.idreviewer)?.firstname || ''} ${
                                                reviewers.find((r) => r.iduser === article.idreviewer)?.lastname || ''
                                            }`,
                                        }
                                        : null
                                }
                                onChange={(selectedOption) => handleReviewerChange(article.idarticle, selectedOption)}
                                placeholder="Prideliť recenzenta"
                                isSearchable // Enables search functionality
                                styles={{
                                    container: (provided) => ({
                                        ...provided,
                                        width: '100%',
                                    }),
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ConferenceArticlesComponent;
