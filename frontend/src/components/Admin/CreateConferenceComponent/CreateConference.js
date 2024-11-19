import React, { useState } from 'react';
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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        alert('Formulár bol úspešne odoslaný.');
        setFormData({
            eventName: '',
            eventDate: '',
            uploadEndDate: '',
        });
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
