import React, { useState } from 'react';
import axios from 'axios';
import styles from './styles'; // Import your styles
import { useNavigate } from 'react-router-dom';

const CreateConference = () => {
    const [formData, setFormData] = useState({
        eventName: '',
        eventDate: '',
        uploadEndDate: '',
    });
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const fetchSuggestions = async (query) => {
        if (!query) {
            setSuggestions([]);
            return;
        }

        const token = sessionStorage.getItem('authToken');

        try {
            const response = await axios.get('http://localhost:8080/api/categories', {
                params: { query },
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            setSuggestions(response.data);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        }
    };

    const handleCategoryInputChange = (e) => {
        const value = e.target.value;
        setNewCategory(value);
        fetchSuggestions(value);
    };

    const handleAddCategory = (category) => {
        if (!category.trim()) return; // Prevent empty categories
        if (categories.includes(category.trim())) return; // Prevent duplicates
        setCategories([...categories, category.trim()]);
        setNewCategory(''); // Clear input
        setSuggestions([]); // Clear suggestions
    };

    const handleRemoveCategory = (index) => {
        const updatedCategories = categories.filter((_, i) => i !== index);
        setCategories(updatedCategories);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = sessionStorage.getItem('authToken');

        try {
            const response = await axios.post(
                'http://localhost:8080/api/events',
                {
                    event_name: formData.eventName,
                    event_date: formData.eventDate,
                    event_upload_EndDate: formData.uploadEndDate,
                    categories, // Send the categories array
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            console.log('Server Response:', response.data);

            // Reset the form
            setFormData({
                eventName: '',
                eventDate: '',
                uploadEndDate: '',
            });
            setCategories([]);

            console.log("Idem presmerovať");
            navigate('/conferences');

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

                {/* Categories */}
                <div style={styles.formGroup}>
                    <label style={styles.label}>Kategórie:</label>
                    <div style={styles.categoryInputContainer}>
                        <input
                            type="text"
                            value={newCategory}
                            onChange={handleCategoryInputChange}
                            style={styles.input}
                            placeholder="Pridať novú kategóriu"
                        />
                        <button
                            type="button"
                            onClick={() => handleAddCategory(newCategory)}
                            style={styles.addButton}
                        >
                            Pridať
                        </button>
                    </div>
                    {suggestions.length > 0 && (
                        <ul style={styles.suggestions}>
                            {suggestions.map((suggestion, index) => (
                                <li
                                    key={index}
                                    style={styles.suggestionItem}
                                    onClick={() => handleAddCategory(suggestion)}
                                >
                                    {suggestion}
                                </li>
                            ))}
                        </ul>
                    )}
                    <ul style={styles.categoryList}>
                        {categories.map((category, index) => (
                            <li key={index} style={styles.categoryItem}>
                                <span>{category}</span>
                                <button
                                    type="button"
                                    onClick={() => handleRemoveCategory(index)}
                                    style={styles.removeButton}
                                >
                                    X
                                </button>
                            </li>
                        ))}
                    </ul>
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
