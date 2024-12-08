import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './styles'; // Import your styles

const ConferenceDetailComponent = () => {
    const { id } = useParams(); // Get the conference ID from the URL
    const [conference, setConference] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchConference = async () => {
            const token = sessionStorage.getItem('authToken');
            setIsLoading(true);
            setError(null);

            try {
                const response = await axios.get(`http://localhost:8080/api/admin/get-event-detail/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setConference(response.data.data); // Update state with the conference details
            } catch (error) {
                console.error('Error fetching conference details:', error.response?.data || error.message);
                setError('Nepodarilo sa načítať detaily konferencie.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchConference();
    }, [id]);

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

    if (!conference) {
        return <div style={styles.error}>Konferencia neexistuje.</div>;
    }

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>{conference.event_name}</h2>

            {/* Conference Details */}
            <div style={styles.detailCard}>
                <p><strong>Popis:</strong> {conference.description || 'Bez popisu.'}</p>
                <p><strong>Dátum konferencie:</strong> {new Date(conference.event_date).toLocaleDateString()}</p>
                <p><strong>Dátum ukončenia nahrávania:</strong> {new Date(conference.event_upload_EndDate).toLocaleDateString()}</p>
                <p><strong>Heslo:</strong> {conference.password || 'Heslo nie je nastavené.'}</p>
            </div>

            {/* Buttons */}
            <div style={styles.buttons}>
                <button
                    style={styles.button}
                    onClick={() => navigate(`/admin/conference/${id}/edit`)} // Navigate to edit page
                >
                    Editovať
                </button>
                <button
                    style={styles.button}
                    onClick={() => navigate(`/admin/conference/${id}/roles`)} // Navigate to add roles page
                >
                    Pridať roly
                </button>
            </div>
        </div>
    );
};

export default ConferenceDetailComponent;
