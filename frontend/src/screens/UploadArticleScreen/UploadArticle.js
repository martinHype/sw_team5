import React, { useState } from "react";
import styles from "./styles.js";
import graduation_hat from "../../images/graduation_hat.png";
import user from "../../images/user.png";
import logout from "../../images/logout.png";
import FileDropArea from "../../components/FileUploadComponent/FileUpload.js";
import axios from 'axios';

const UploadArticle = () => {

  const [ArticleData, setArticleData] = useState({
    title: "",
    Description: "",
    category:"",
  });

  const handleChange = (e) => {
    setArticleData({
      ...ArticleData,
      [e.target.name]: e.target.value || "", // Ensure fallback for undefined
    });
  };

  const createArticle = async () => {
    console.log(ArticleData.category);
    try {
      const response = await axios.post(
        'http://localhost:8080/api/article', {
          title: ArticleData.title,
          description: ArticleData.Description,
          category:parseInt(ArticleData.category,10)
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer 3|t0kB1SkRq0GQtwr9ssdQurOIqBHZpZWC6wmLO6qV899bd315',
        },
      });
      console.log(response.status);
      //sessionStorage.getItem("authToken");
      
  } catch (error) {
      console.error('Error logging in:', error.response?.data || error.message);
  }
  };

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
        <form style={styles.form} onSubmit={(e) => e.preventDefault()}>
          <label>Názov práce</label>
          <input 
            type="text" 
            name="title"
            placeholder="Názov práce" 
            value={ArticleData.title}
            onChange={handleChange}
            style={styles.input} />
          <label>Sekcia</label>
          <select 
          name="category"
          style={styles.select}
          onChange={handleChange}
          value={ArticleData.category}
          >
                <option value="" hidden>Vyberte sekciu</option>
                <option value="1">Biológia, ekológia a environmentalistika</option>
                <option value="2">Geografia a regionálny rozvoj a Geológia</option>
                <option value="3">Informatika</option>
                <option value="4">Chémia, Fyzika a matematika</option>
                <option value="5">Odborová didaktika</option>
                <option value="6">PhD</option>
            </select>
          <label>Popis práce</label>
          <textarea 
            name="Description"
            value={ArticleData.description}
            onChange={handleChange}
            placeholder="Popis práce" 
            rows="10"
            style={styles.textarea}/>
          <label>Kľúčové slová</label>
          <input 
          name="keywords"
          type="text" 
          placeholder="Kľúčové slová" 
          style={styles.input} />

          <label>Dokumenty</label>
          <FileDropArea/>
          {/* Submit Button */}
          <button type="submit" style={styles.submitButton} onClick={createArticle}>
            Nahrať prácu
          </button>
          
        </form>
        
        
      </main>

    </div>
  );
};

export default UploadArticle;