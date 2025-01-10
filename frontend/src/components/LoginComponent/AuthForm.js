import React, { useState } from 'react';
import styles from './styles';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import graduationHat from "../../images/graduation_hatG.png";
import iconEye from "../../images/icons/eye-regular.svg";
import iconEyeClosed from "../../images/icons/eye-slash-solid.svg";
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
    const navigate = useNavigate();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    //variable to indicate if there was an error
    const [error, setError] = useState(false);
    //variable to show password control
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errorMessage,setErrorMessage] = useState("");

    const toggleForm = () => {
        setIsRegister(!isRegister);
        setError(false);
        setShowPassword(false);
        setShowConfirmPassword(false);
        formData.password = "";
        formData.confirmPassword = "";
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword); // Toggle password visibility state
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword); // Toggle password visibility state
    };


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const register = async () => {
        if(!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim() || !formData.password.trim() || !formData.confirmPassword.trim()){
            setError(true);
            setErrorMessage("Prosim vyplnte vsetky povinne polia");
            return;
        }

        if(!emailRegex.test(formData.email)){
            setError(true);
            setErrorMessage("Email adresa nie je spravneho formatu");
            return;
        }
        if(formData.password.length < 6){
            setError(true);
            setErrorMessage("Heslo musi byt dlhsie ako 6 znakov");
            return;
        }
        if(formData.password.trim() !== formData.confirmPassword.trim()){
            setError(true);
            setErrorMessage("Hesla sa nezhodnuju");
            return;
        }
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
            const roles = response.data.roles;
            const userId = response.data.user.iduser;
            sessionStorage.setItem("authToken", token);
            sessionStorage.setItem("userRoles", roles);
            sessionStorage.setItem("userId", userId);

            setError(false);
            if(token){
                setError(false);
                navigate("/home");
            } // Switch to login form
        } catch (error) {
            if(error.response){
                const statusCode = error.response.status;
                if(statusCode === 409){
                    setErrorMessage("Pouzivatel s emailom uz existuje");
                }
            }
            console.error('Error registering:', error.response?.data || error.message);
            setError(true);
        }
    };


    const login = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/login', {
                email: formData.email,
                password: formData.password,
            });
            console.log(response.status);
            const token = response.data.token;
            const roles = response.data.roles;
            const userId = response.data.user.iduser;
            sessionStorage.setItem("authToken", token);
            sessionStorage.setItem("userRoles", roles);
            sessionStorage.setItem("userId", userId);
            // Navigate to main screen
            if(token){
                setError(false);
                navigate("/home");
            }
            
        } catch (error) {
            formData.password = "";
            console.error('Error:', error.response?.data || error.message);
            setError(true);
        }
    };


    return (
        <div style={styles.container}>
            <div style={{ ...styles.formWrapper, ...(isRegister ? styles.register : styles.login) }}>
                <div style={styles.logo}>
                    <img src={graduationHat} style={styles.img} alt="Page logo"/>
                    <p style={styles.text}> ŠTUDENTSKÁ VEDECKÁ KONFERENCIA</p>
                </div>
                <form style={styles.form} onSubmit={(e) => e.preventDefault()}>
                    {isRegister ? (
                        <>
                            <input
                                type="text"
                                name="firstName"
                                placeholder="Meno"
                                value={formData.firstName}
                                onChange={handleChange}
                                style={(error && !formData.firstName)?styles.input_error : styles.input}
                                required
                            />
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Priezvisko"
                                value={formData.lastName}
                                onChange={handleChange}
                                style={(error && !formData.lastName)?styles.input_error : styles.input}
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="E-mail"
                                value={formData.email}
                                onChange={handleChange}
                                style={(error && (!formData.email || !emailRegex.test(formData.email)))?styles.input_error : styles.input}
                            />
                            <div style={styles.inputContainer}>
                            <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Heslo"
                                    value={formData.password}
                                    onChange={handleChange}
                                    style={(error && (!formData.password|| formData.confirmPassword !== formData.password || formData.password.length < 6))?styles.input_error : styles.input}
                                    required
                                />
                            <img src={showPassword ? iconEye:iconEyeClosed} style={styles.eyeIcon} onClick={togglePasswordVisibility} alt="Hide password icon"/>
                                
                            </div>
                            <div style={styles.inputContainer}>
                            <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    placeholder="Zopakujte heslo"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    style={(error && (!formData.confirmPassword || formData.confirmPassword !== formData.password))?styles.input_error : styles.input}
                                    required
                                />
                            <img src={showConfirmPassword ? iconEye:iconEyeClosed} style={styles.eyeIcon} onClick={toggleConfirmPasswordVisibility} alt="Show password icon"/>
                                
                            </div>
                            <select
                                name="university"
                                value={formData.university}
                                onChange={handleChange}
                                style={styles.select}
                            >
                                <option value="" disabled hidden>
                                    Vyberte univerzitu
                                </option>
                                <option value="value1">UKF FPVAI</option>
                                <option value="value2">MB FPV</option>
                                <option value="value3">UCM FPV</option>
                            </select>
                            {error && (
                                <p style={styles.error_message}>{errorMessage}</p>
                                )}
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
                                style={error?styles.input_error : styles.input}
                                required
                            />
                            <div style={styles.inputContainer}>
                            <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Heslo"
                                    value={formData.password}
                                    onChange={handleChange}
                                    style={error?styles.input_error : styles.input}
                                    required
                                />
                            <img src={showPassword ? iconEye:iconEyeClosed} style={styles.eyeIcon} onClick={togglePasswordVisibility} alt="Show password icon"/>
                                
                            </div>
                            
                            {error && (
                                <p style={styles.error_message}>Poskytnuté údaje sú nesprávne.</p>
                                )}
                            <button type="button" onClick={login} style={styles.btn}>
                                Prihlásiť
                            </button>
                        </>
                    )}
                </form>
                <a href="#!" onClick={toggleForm} style={styles.link}>
                    {isRegister ? 'Prihlásiť sa' : 'Registrovať sa'}
                </a>
            </div>
        </div>
    );
};

export default AuthForm;

