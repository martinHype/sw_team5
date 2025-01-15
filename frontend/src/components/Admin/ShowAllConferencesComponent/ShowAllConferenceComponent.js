import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './styles'; // Import your styles
import { format } from 'date-fns';

const ShowAllConferenceComponent = () => {
    const [conferences, setConferences] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedDate, setSelectedDate] = useState(''); // For date filter
    const [searchQuery, setSearchQuery] = useState(''); // For name filter

    const [filters, setFilters] = useState({ date: '', name: '', isHistorical: false }); // Store applied filters


    const navigate = useNavigate();

    // Fetch conferences from the backend
    const fetchConferences = useCallback(async () => {
        const token = sessionStorage.getItem('authToken');
        setIsLoading(true);
        setError(null);

        try {
            let response;

            if (filters.isHistorical) {
                // Fetch historical conferences
                response = await axios.get('http://localhost:8080/api/get-admin-events', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    params: {
                        historical: true, // Parameter pre historické konferencie
                    },
                });
            } else if (filters.date || filters.name) {
                // Ak sú zadané iné filtre
                response = await axios.get('http://localhost:8080/api/get-admin-events', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    params: {
                        date: filters.date || undefined,
                        name: filters.name || undefined,
                    },
                });
            } else {
                // Ak nie sú žiadne filtre, načítaj všetko
                response = await axios.get('http://localhost:8080/api/get-admin-events', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            }

            setConferences(response.data.data || []);
        } catch (error) {
            console.error('Error fetching conferences:', error.response?.data || error.message);
            setError('Pri načítaní konferencií nastala chyba.');
        } finally {
            setIsLoading(false);
        }
    }, [filters]);



    // Fetch conferences on component mount and when filters are applied
    useEffect(() => {

        fetchConferences();
    }, [filters,fetchConferences]);

    // Handle date change
    const handleDateChange = (e) => {
        setSelectedDate(e.target.value); // Update local state only
    };

    const handleShowHistorical = () => {
        setFilters({ date: '', name: '', isHistorical: true }); // Nastaví filter na historické konferencie
    };

    // Handle name change
    const handleSearchQueryChange = (e) => {
        setSearchQuery(e.target.value); // Update local state only
    };

    // Apply filters
    const handleApplyFilters = () => {
        setFilters({ date: selectedDate, name: searchQuery }); // Update applied filters
    };

    // Handle reload button click
    const handleReload = () => {
        setFilters({ date: '', name: '' }); // Reset filters and fetch all conferences
        setSelectedDate('');
        setSearchQuery('');
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
            <h2 style={styles.heading}>Zoznam konferencií</h2>

            {/* Filters */}
            <div style={styles.filters}>
                {/* Date Picker */}
                <input
                    type="date"
                    onChange={handleDateChange}
                    value={selectedDate}
                    style={styles.input}
                />

                {/* Name Filter */}
                <input
                    type="text"
                    placeholder="Filtrovať podľa názvu"
                    onChange={handleSearchQueryChange}
                    value={searchQuery}
                    style={styles.input}
                />

                {/* Apply Filters Button */}
                <button onClick={handleApplyFilters} style={styles.button}>
                    Filtrovať
                </button>

                {/* Reload Button */}
                <button onClick={handleReload} style={styles.button}>
                    Refresh
                </button>

                <button onClick={handleShowHistorical} style={styles.button}>
                    Historické
                </button>

            </div>

            {/* Conference List */}
            {conferences.length === 0 ? (
                <p style={styles.noData}>Žiadne konferencie na zobrazenie.</p>
            ) : (
                <div style={styles.conferenceList}>
                    {conferences.map((conference) => (
                        <div
                            key={conference.idevent} // Ensure key is unique
                            style={styles.conferenceItem}
                            onClick={() => navigate(`/admin/conference/${conference.idevent}`)}
                        >
                            <h3>{conference.event_name}</h3>
                            <p>Dátum konferencie: {format(new Date(conference.event_date), 'dd.MM.yyyy')}</p>
                            <p>
                                Dátum ukončenia nahrávania:{' '}
                                {format(new Date(conference.event_upload_EndDate), 'dd.MM.yyyy')}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ShowAllConferenceComponent;
