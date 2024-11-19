import React from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const MainScreen = () => {

    const navigate = useNavigate();
    const handleLogout = async () => {

        console.log(sessionStorage.getItem('authToken'))
        try {
            // Send a POST request to the logout route
            await axios.post(
                'http://localhost:8080/api/logout',
                {},
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
                    },
                }
            );

            // Clear the token from localStorage
            sessionStorage.removeItem('authToken');
            navigate('/');

            // For testing, display an alert to confirm logout
            alert("Logged out successfully!");
        } catch (error) {
            console.error("Logout failed:", error);
            alert("Logout failed!");
        }
    };

    return (
        <div>
            <h1>Welcome to the Main Screen</h1>
            <button onClick={handleLogout} style={{ padding: "10px 20px", marginTop: "20px", cursor: "pointer" }}>
                Logout
            </button>
        </div>
    );
};

export default MainScreen;
