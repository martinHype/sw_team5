import React, { useState } from 'react';
import axios from 'axios'; // For API requests
import styles from './styles'; // Import your styles

const CreateConference = () => {
    const [formData, setFormData] = useState({
        eventName: '',
        eventDate: '',
        uploadEndDate: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = sessionStorage.getItem('authToken');

        try {
            const response = await axios.post('http://localhost:8080/api/events', {
                event_name: formData.eventName,
                event_date: formData.eventDate,
                event_upload_EndDate: formData.uploadEndDate,
            },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Attach Bearer token
                        'Content-Type': 'application/json',
                    },
                });

            alert('Formulár bol úspešne odoslaný.');
            console.log('Server Response:', response.data);

            // Reset the form
            setFormData({
                eventName: '',
                eventDate: '',
                uploadEndDate: '',
            });
        } catch (error) {
            console.error('Chyba pri ukladaní:', error.response?.data || error.message);
            alert('Pri ukladaní konferencie nastala chyba.');
        }
    };

    return (
        <div style={styles.formContainer}>
            <form onSubmit={handleSubmit}>
                {/* Event Name */}
                <div style={styles.formGroup}>
                    <label style={styles.label}>Názov konferencie:</label>
                    <input
                        type="text"
                        name="eventName"
                        value={formData.eventName}
                        onChange={handleChange}
                        style={styles.input}
                        placeholder="Zadajte názov konferencie"
                        required
                    />
                </div>

                {/* Event Date */}
                <div style={styles.formGroup}>
                    <label style={styles.label}>Dátum konferencie:</label>
                    <input
                        type="date"
                        name="eventDate"
                        value={formData.eventDate}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    />
                </div>

                {/* Upload End Date */}
                <div style={styles.formGroup}>
                    <label style={styles.label}>Dátum ukončenia nahrávania:</label>
                    <input
                        type="date"
                        name="uploadEndDate"
                        value={formData.uploadEndDate}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    />
                </div>

                {/* Submit Button */}
                <button type="submit" style={styles.button}>
                    Odoslať
                </button>
            </form>
        </div>
    );
};

export default CreateConference;
