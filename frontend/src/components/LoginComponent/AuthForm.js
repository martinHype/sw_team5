import React, { useState } from 'react';
import styles from './styles';
import axios from 'axios';

const AuthForm = () => {

    const [isRegister, setIsRegister] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        university: '',
    });
    const [error, setError] = useState(null);

    const toggleForm = () => {
        setIsRegister(!isRegister);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const testAPI = async () => {
        try{
            const response = await axios.get('http://localhost:8080/api/check_table');
            console.log(response.data);
        }catch(error){
            console.log(error.message);
        }
    };

    const register = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/register', {
                firstname: formData.firstName,
                lastname: formData.lastName,
                email: formData.email,
                password: formData.password,
                password_confirmation: formData.confirmPassword
                //university: formData.university,
            });
            const token = response.data.token;
            sessionStorage.setItem("authToken", token);
            alert('Registration successful!');
            setIsRegister(false); // Switch to login form
        } catch (error) {
            console.error('Error registering:', error.response?.data || error.message);
            setError(error.response?.data?.message || 'Registration failed');
        }
    };


    const login = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/login', {
                email: "martintest.batora@student.ukf.sk",
                password: "student123",
            });
            const token = response.data.token;
            sessionStorage.setItem("authToken", token);
            alert('Login successful!');
        } catch (error) {
            console.log(error.message);
            console.error('Error logging in:', error.response?.data || error.message);
            setError(error.response?.data?.message || 'Login failed');
        }
    };


    return (
        <div style={styles.container}>
            <div style={{ ...styles.formWrapper, ...(isRegister ? styles.register : styles.login) }}>
                <div style={styles.logo}>LOGO</div>
                <form style={styles.form} onSubmit={(e) => e.preventDefault()}>
                    {isRegister ? (
                        <>
                            <input
                                type="text"
                                name="firstName"
                                placeholder="Meno"
                                value={formData.firstName}
                                onChange={handleChange}
                                style={styles.input}
                            />
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Priezvisko"
                                value={formData.lastName}
                                onChange={handleChange}
                                style={styles.input}
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="E-mail"
                                value={formData.email}
                                onChange={handleChange}
                                style={styles.input}
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Heslo"
                                value={formData.password}
                                onChange={handleChange}
                                style={styles.input}
                            />
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Zopakujte heslo"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                style={styles.input}
                            />
                            <input
                                type="text"
                                name="university"
                                placeholder="Univerzita"
                                value={formData.university}
                                onChange={handleChange}
                                style={styles.input}
                            />
                            <button type="button" onClick={register} style={styles.btn}>
                                Registrovať
                            </button>
                        </>
                    ) : (
                        <>
                            <input
                                type="email"
                                name="email"
                                placeholder="E-mail"
                                value={formData.email}
                                onChange={handleChange}
                                style={styles.input}
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Heslo"
                                value={formData.password}
                                onChange={handleChange}
                                style={styles.input}
                            />
                            <button type="button" onClick={login} style={styles.btn}>
                                Prihlásiť
                            </button>
                        </>
                    )}
                </form>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <a href="#!" onClick={toggleForm} style={styles.link}>
                    {isRegister ? 'Prihlásiť sa' : 'Registrovať sa'}
                </a>
            </div>
        </div>
    );
};

export default AuthForm;