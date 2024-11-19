import React from "react";
import styles from "./styles.js";
import graduation_hat from "../../images/graduation_hat.png";
import user from "../../images/user.png";
import logout from "../../images/logout.png";
import FileDropArea from "../../components/FileUploadComponent/FileUpload.js";

const UploadArticle = () => {
  return (
    <div>
      {/* Header */}
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

      {/* Form Section */}
      <main style={styles.main}>
        <form style={styles.form}>
          <label>Názov práce</label>
          <input type="text" placeholder="Názov práce" style={styles.input} />
          <label>Sekcia</label>
          <select style={styles.select}>
                <option value="" hidden>Vyberte sekciu</option>
                <option value="value1">Biológia, ekológia a environmentalistika</option>
                <option value="value2">Geografia a regionálny rozvoj a Geológia</option>
                <option value="value3">Informatika</option>
                <option value="value3">Chémia, Fyzika a matematika</option>
                <option value="value3">Odborová didaktika</option>
                <option value="value3">PhD</option>
            </select>
          <label>Popis práce</label>
          <textarea placeholder="Popis práce" rows="10" style={styles.textarea}></textarea>
          <label>Kľúčové slová</label>
          <input type="text" placeholder="Kľúčové slová" style={styles.input} />

          <label>Dokumenty</label>
          <FileDropArea/>
          {/* Submit Button */}
          <button type="submit" style={styles.submitButton}>
            Nahrať prácu
          </button>
          
        </form>
        
        
      </main>

    </div>
  );
};

export default UploadArticle;