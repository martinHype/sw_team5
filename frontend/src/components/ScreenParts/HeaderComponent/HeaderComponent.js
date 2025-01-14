import React, { useState } from "react";
import styles from "./styles";
import axios from "axios";
import graduation_hat from "../../../images/graduation_hat.png";
import user from "../../../images/user.png";
import logout from "../../../images/logout.png";
import {useNavigate} from "react-router-dom";

const HeaderComponent = () => {
    const navigate = useNavigate();
  const [isHoveringLogout, setIsHoveringLogout] = useState(false);
  const handleLogout = async () => {
    try {
      const authToken = sessionStorage.getItem("authToken");
      if (authToken) {
        // Make the logout request to the server
        await axios.post(
          "http://localhost:8080/api/logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        // Remove the authToken from sessionStorage
        sessionStorage.removeItem("authToken");
        
        // Redirect the user to the login screen or refresh the page
        window.location.href = "/"; // Update the URL based on your routing setup
      }
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
      alert("Chyba pri odhlasovaní. Skúste to znova.");
    }
  };
    const profile = () =>{
        navigate('/profile')
    }

  return (
    <header style={styles.header}>
      {/* Logo */}
      <div style={styles.headerContainer}>
        <img
          src={graduation_hat}
          alt="Logo"
          style={{ height: "50px", width: "auto" }}
        />
        {/* Navigation */}
        <div style={styles.nav}>
          <h1 style={styles.navTitle}>Študentská vedecká konferencia</h1>
        </div>
        {/* Icons */}
        <div style={styles.icons}>
          <img
            src={user}
            alt="User profile"
            style={{ height: "30px", width: "auto" }}
            onClick={profile}
          />
           <img
            src={logout}
            alt="logout"
            style={{
              height: "30px",
              width: "auto",
              cursor: "pointer",
              opacity: isHoveringLogout ? 0.7 : 1, // Adjust opacity on hover
              transition: "opacity 0.3s ease", // Smooth hover transition
            }}
            onClick={handleLogout}
            onMouseEnter={() => setIsHoveringLogout(true)} // Hover effect start
            onMouseLeave={() => setIsHoveringLogout(false)} // Hover effect end
          />
        </div>
      </div>
    </header>
  );
};

export default HeaderComponent;
