import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './styles'; // Import your styles
import { format } from 'date-fns';

const ShowAllConferenceComponent = () => {
    const [conferences, setConferences] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchConferences = async () => {
            const token = sessionStorage.getItem('authToken');

            try {
                const response = await axios.get('http://localhost:8080/api/all-events', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log('Response data:', response.data);
                setConferences(response.data.data);
            } catch (error) {
                console.error('Chyba pri načítaní konferencií:', error.response?.data || error.message);
                setError('Pri načítaní konferencií nastala chyba.');
            }finally {
                setIsLoading(false);
            }
        };

        fetchConferences();
    }, []);

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
            <h2 style={styles.heading}>Zoznam konferencií</h2>
            {conferences.length === 0 ? (
                <p style={styles.noData}>Žiadne konferencie na zobrazenie.</p>
            ) : (
                <table style={styles.table}>
                    <thead>
                    <tr>
                        <th style={styles.tableHeader}>Názov konferencie</th>
                        <th style={styles.tableHeader}>Dátum konferencie</th>
                        <th style={styles.tableHeader}>Dátum ukončenia nahrávania</th>
                    </tr>
                    </thead>
                    <tbody>
                    {conferences.map((conference) => (
                        <tr key={conference.idevent}>
                            <td style={styles.tableCell}>{conference.event_name}</td>
                            <td style={styles.tableCell}>
                                {format(new Date(conference.event_date), 'dd.MM.yyyy')}
                            </td>
                            <td style={styles.tableCell}>
                                {format(new Date(conference.event_upload_EndDate), 'dd.MM.yyyy')}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ShowAllConferenceComponent;
