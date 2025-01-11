import React from "react";
import styles from "./styles";
import graduation_hat from "../../images/graduation_hat.png";
import user from "../../images/user.png";
import logout from "../../images/logout.png";

const HeaderComponent = () => {
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
          />
          <img
            src={logout}
            alt="logout"
            style={{ height: "30px", width: "auto" }}
          />
        </div>
      </div>
    </header>
  );
};

export default HeaderComponent;
