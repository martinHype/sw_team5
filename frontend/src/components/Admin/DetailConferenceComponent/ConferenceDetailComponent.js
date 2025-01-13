import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './styles'; // Import your styles

const ConferenceDetailComponent = () => {
    const { id } = useParams();
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

                setConference(response.data.data);
            } catch (error) {
                console.error('Error fetching conference details:', error.response?.data || error.message);
                setError('Nepodarilo sa načítať detaily konferencie.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchConference();
    }, [id]);

    const isDownloadEnabled = () => {
        if (!conference || !conference.event_upload_EndDate) return false;
        const uploadEndDate = new Date(conference.event_upload_EndDate);
        const currentDate = new Date();
        return currentDate >= uploadEndDate;
    };

    const handleDownload = async () => {
        try {
            const token = sessionStorage.getItem('authToken');
            const response = await axios.get(
                `http://localhost:8080/api/admin/download-conference/${conference.event_name}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    responseType: 'blob', // Ensure the response is treated as a file
                }
            );

            // Create a blob and trigger the download
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${conference.event_name}_articles.zip`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Error downloading articles:', error.response?.data || error.message);
            setError('Nepodarilo sa stiahnuť súbory.');
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
                    onClick={() => navigate(`/admin/conferences/edit/${id}`)}
                >
                    Editovať
                </button>
                <button
                    style={styles.button}
                    onClick={() => navigate(`/admin/conference/${id}/roles`)}
                >
                    Pridať roly
                </button>
                <button
                    style={{
                        ...styles.button,
                        ...(isDownloadEnabled() ? {} : styles.disabledButton),
                    }}
                    onClick={handleDownload}
                    disabled={!isDownloadEnabled()}
                >
                    Stiahnuť súbory
                </button>
            </div>
        </div>
    );
};

export default ConferenceDetailComponent;
