import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './styles'; // Import your styles
import { useNavigate, useParams } from 'react-router-dom';

const ConferenceForm = ({ isEditMode = false }) => {
    const [formData, setFormData] = useState({
        eventName: '',
        eventDate: '',
        uploadEndDate: '',
        description: '',
        password: '',
        isPrivate: false,
    });
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [allSuggestions, setAllSuggestions] = useState([]);
    const [loading, setLoading] = useState(isEditMode);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (isEditMode && id) {
            const fetchEvent = async () => {
                const token = sessionStorage.getItem('authToken');
                try {
                    const response = await axios.get(`http://localhost:8080/api/admin/conference/${id}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });

                    const { event_name, event_date, event_upload_EndDate, description, password } = response.data;

                    setFormData({
                        eventName: event_name,
                        eventDate: formatDate(event_date),
                        uploadEndDate: formatDate(event_upload_EndDate),
                        description: description || '',
                        password: password || '',
                        isPrivate: !!password,
                    });

                    const categoriesResponse = await axios.get(`http://localhost:8080/api/admin/events/${id}/categories`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setCategories(categoriesResponse.data || []);
                } catch (error) {
                    console.error('Error loading conference data:', error);
                    setCategories([]);
                    alert('Chyba pri načítaní dát!');
                } finally {
                    setLoading(false);
                }
            };

            fetchEvent();
        }
    }, [isEditMode, id]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleCategoryInputChange = (e) => {
        const value = e.target.value;
        setNewCategory(value);

        if (value) {
            const filtered = allSuggestions.filter((category) =>
                category.toLowerCase().includes(value.toLowerCase())
            );

            console.log(filtered);
            setSuggestions(filtered);
        } else {
            setSuggestions([]);
        }
    };

    useEffect(() => {
        const fetchSuggestions = async () => {
            const token = sessionStorage.getItem('authToken');
            try {
                const response = await axios.get('http://localhost:8080/api/admin/categories', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setAllSuggestions(response.data || []);
            } catch (error) {
                console.error('Error fetching categories:', error);
                setAllSuggestions([]);
            }
        };

        fetchSuggestions();
    }, []);

    const handleAddCategory = (categoryName = newCategory) => {
        const trimmedCategoryName = categoryName.trim();
        if (!trimmedCategoryName || categories.some((c) => c.category_name === trimmedCategoryName)) {
            return;
        }

        setCategories([
            ...categories,
            { idcategory: null, category_name: trimmedCategoryName, is_active: true },
        ]);
        setNewCategory(''); // Vyprázdni input
        setSuggestions([]); // Skry návrhy
    };

    const deactivateCategory = (categoryId) => {
        setCategories((prevCategories) =>
            prevCategories.map((category) =>
                category.idcategory === categoryId
                    ? { ...category, isPendingDeactivation: true }
                    : category
            )
        );
    };

    const handleRemoveLocalCategory = (index) => {
        setCategories((prevCategories) => prevCategories.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = sessionStorage.getItem('authToken');

        try {
            // Update event details
            const payload = {
                event_name: formData.eventName,
                event_date: formData.eventDate,
                event_upload_EndDate: formData.uploadEndDate,
                description: formData.description,
                password: formData.isPrivate ? formData.password : null,
            };

            if (isEditMode) {
                await axios.put(`http://localhost:8080/api/admin/events/${id}`, payload, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                // Handle categories: add new ones and deactivate marked ones
                const newCategories = categories.filter((cat) => !cat.idcategory);
                const categoriesToDeactivate = categories.filter((cat) => cat.isPendingDeactivation);

                // Add new categories
                for (const category of newCategories) {
                    await axios.post('http://localhost:8080/api/admin/categories', {
                        event_id: id,
                        category_name: category.category_name,
                    }, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                }

                // Deactivate categories
                for (const category of categoriesToDeactivate) {
                    await axios.patch(`http://localhost:8080/api/admin/categories/${category.idcategory}/deactivate`, null, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                }

                alert('Konferencia bola úspešne upravená!');
            } else {
                console.log(payload);

                // Create a new conference
                const response = await axios.post('http://localhost:8080/api/admin/events', payload, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                const eventId = response.data.event.idevent;

                for (const category of categories) {
                    console.log(category);
                    await axios.post('http://localhost:8080/api/admin/categories', {
                        event_id: eventId,
                        category_name: category.category_name,
                    }, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                }

                alert('Konferencia bola úspešne vytvorená!');
            }

            // Reset state
            setFormData({
                eventName: '',
                eventDate: '',
                uploadEndDate: '',
                description: '',
                password: '',
                isPrivate: false,
            });
            setCategories([]);
            navigate('/admin/conferences');
        } catch (error) {
            console.error('Error saving conference:', error);
            alert('Chyba pri ukladaní');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div style={styles.formContainer}>
            <form onSubmit={handleSubmit}>
                <h2>{isEditMode ? 'Upraviť konferenciu' : 'Vytvoriť konferenciu'}</h2>

                <div style={styles.formGroup}>
                    <label style={styles.label}>Názov konferencie:</label>
                    <input
                        type="text"
                        name="eventName"
                        value={formData.eventName}
                        onChange={handleChange}
                        style={styles.input}
                        placeholder="Napíšte názov konferencie"
                        required
                    />
                </div>

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

                <div style={styles.formGroup}>
                    <label style={styles.label}>Dátum ukočenia nahrávania prác:</label>
                    <input
                        type="date"
                        name="uploadEndDate"
                        value={formData.uploadEndDate}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    />
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.label}>Popis konferencie:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        style={styles.textarea}
                        placeholder="Napíšte popis konferencie"
                        required
                    />
                </div>

                <div style={styles.formGroup}>
                    <label>
                        <input
                            type="checkbox"
                            name="isPrivate"
                            checked={formData.isPrivate}
                            onChange={handleChange}
                        />
                        Privátna konferencia
                    </label>
                </div>

                {formData.isPrivate && (
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Heslo:</label>
                        <input
                            type="text"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            style={styles.input}
                            placeholder="Napíšte heslo pre konferenciu"
                        />
                    </div>
                )}

                <div style={styles.formGroup}>
                    <label style={styles.label}>Kategórie:</label>
                    <div style={styles.categoryInputContainer}>
                        <input
                            type="text"
                            value={newCategory}
                            onChange={handleCategoryInputChange}
                            style={styles.input}
                            placeholder="Pridajte kategóriu"
                        />
                        <button
                            type="button"
                            onClick={()=>handleAddCategory()}
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
                                <span
                                    style={{
                                        textDecoration: category.isPendingDeactivation ? 'line-through' : 'none',
                                    }}
                                >
                                    {category.category_name}
                                </span>
                                {!category.isPendingDeactivation && (
                                    <button
                                        type="button"
                                        onClick={() =>
                                            category.idcategory
                                                ? deactivateCategory(category.idcategory)
                                                : handleRemoveLocalCategory(index)
                                        }
                                        style={styles.removeButton}
                                    >
                                        X
                                    </button>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>

                <button type="submit" style={styles.button}>
                    {isEditMode ? 'Uložiť zmeny' : 'Uložiť'}
                </button>
            </form>
        </div>
    );
};

export default ConferenceForm;
