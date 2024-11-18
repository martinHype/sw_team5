import React, { useState } from "react";
import styles from "./styles";

const CreateConference = () => {
    const [conference, setConference] = useState({
        name: "",
        description: "",
        date: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setConference({ ...conference, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Konferencia bola vytvorená:", conference);
        alert("Konferencia bola úspešne vytvorená!");
        setConference({ name: "", description: "", date: "" });
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Vytvoriť Konferenciu</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <label style={styles.label}>
                    Názov konferencie:
                    <input
                        type="text"
                        name="name"
                        value={conference.name}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                </label>
                <label style={styles.label}>
                    Popis konferencie:
                    <textarea
                        name="description"
                        value={conference.description}
                        onChange={handleChange}
                        required
                        style={styles.textarea}
                    ></textarea>
                </label>
                <label style={styles.label}>
                    Dátum:
                    <input
                        type="date"
                        name="date"
                        value={conference.date}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                </label>
                <button type="submit" style={styles.button}>
                    Vytvoriť
                </button>
            </form>
        </div>
    );
};

export default CreateConference;
