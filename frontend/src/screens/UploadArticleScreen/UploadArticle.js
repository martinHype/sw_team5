import React, { useState,useEffect } from "react";
import styles from "./styles.js";
import graduation_hat from "../../images/graduation_hat.png";
import user from "../../images/user.png";
import logout from "../../images/logout.png";
import FileDropArea from "../../components/FileUploadComponent/FileUpload.js";
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UploadArticle = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const { conferenceName,formMode, articleid, title, description, category, reviewerId, ownerid } = location.state || {};
  const [showPopup, setShowPopup] = useState(false);
  //console.log(conferenceName);
  const [ArticleData, setArticleData] = useState({
    title: "",
    Description: "",
    category:"",
    reviewerId:0,
    ownerid:0

  });
  const [evaluation, setEvaluation] = useState({
    aktualnost: "",
    zorientovanie: "",
    vhodnost: "",
    rozsah: "",
    analyza: "",
    prehladnost: "",
    formalna_uroven: "",
    sablona_sv: "",
    nazov_chyba: false,
    abstrakt_chyba: false,
    abstrakt_rozsah: false,
    uvod_vysledky: false,
    zdroje_chyba: false,
    bibliografia_chyba: false,
    obrazky_chyba: false,
    popis_chyba: false,
    strong_points: "",
    weak_points: "",
    final_assessment:"",
  });
  useEffect(() => {
    if (formMode === "Edit" || formMode === "Review" || formMode === "View") {
      setArticleData({
        title: title || "",
        description: description || "",
        category: category || "",
        reviewerId:reviewerId,
        ownerid:ownerid,
      });
    }
  }, [formMode, title, description, category]);

  

  const handleChange = (e) => {
    setArticleData({
      ...ArticleData,
      [e.target.name]: e.target.value || "", // Ensure fallback for undefined
    });
  };
  const handleEvaluationChange = (e) => {
    const { name, type, checked, value } = e.target;
    setEvaluation({
      ...evaluation,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  const uploadFiles = async (id_article) =>{
      try{
        const filesData = localStorage.getItem('files');
        if (!filesData) {
          console.error(`No files found in localStorage under the key: ${id_article}`);
          return;
        }
        const files = JSON.parse(filesData);

        files.forEach(async (file) => {
          try{
            const response = await axios.post(
              'http://localhost:8080/api/upload',
              {
                file_content: file.content,
                file_name: file.name,
                file_type: file.type,
                article_id: id_article, // Replace with dynamic article ID if needed
              },
              {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + sessionStorage.getItem('authToken'),
                },
              }
            );
            console.log(`File ${file.name} uploaded successfully:`, response.data);
            navigate('/home');
          } catch (error){
            console.error(`Error uploading file ${file.name}:`, error.response?.data || error.message);
          }
        });
        

        localStorage.removeItem('files');
        navigate("/home");



      } catch(error){
        console.error('Error logging in:', error.response?.data || error.message);
      }
  };
  const handleSubmit = (status) => {
    console.log(articleid);
    if(articleid){
      let sendStatus = status;
      if(formMode == "Review"){
        console.log(evaluation.final_assessment);
        sendStatus = (status === 4) ? 6 : parseInt(evaluation.final_assessment, 10) || status;
      }
      updateArticle(sendStatus);
    }else{
      createArticle(status);
    }
    navigate("/home");
    
    setShowPopup(false); // Close the popup
  };

  const updateArticle = async (actualStatus) => {
    try {
      const { conferenceName } = location.state || {};
      const response = await axios.post(
        'http://localhost:8080/api/article/update-status', {
          articleid:articleid,
          statusid:actualStatus,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + sessionStorage.getItem('authToken'),
        },
      });
      console.log(response);
      //navigate('/home');
      //const id_article = response.data.article_id;


      
      //sessionStorage.getItem("authToken");
      
  } catch (error) {
      console.error('Error logging in:', error.response?.data || error.message);
  }
  };
  // function that will create a new article
  const createArticle = async (actualStatus) => {
    try {
      const { conferenceName } = location.state || {};
      const response = await axios.post(
        'http://localhost:8080/api/article', {
          title: ArticleData.title,
          description: ArticleData.Description,
          category:parseInt(ArticleData.category,10),
          event:conferenceName,
          status:actualStatus,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + sessionStorage.getItem('authToken'),
        },
      });
      console.log(response);
      const id_article = response.data.article_id;


      uploadFiles(id_article);

      
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
            style={styles.input}
            readOnly={formMode === "View" || formMode === "Review" || formMode === "Edit" && "locked"} />
          <label>Sekcia</label>
          <select 
          name="category"
          style={styles.select}
          onChange={handleChange}
          value={ArticleData.category}
          disabled={formMode === "View" || formMode === "Review"}
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
            style={styles.textarea}
            readOnly={formMode === "View" || formMode === "Review"}/>
          <label>Kľúčové slová</label>
          <input 
          name="keywords"
          type="text" 
          placeholder="Kľúčové slová" 
          style={styles.input}
          readOnly={formMode === "View"} />

          <label>Dokumenty</label>
          <FileDropArea disabled={formMode === "View"}/>
          {/* Reviewer Feedback (Only in Review or View Mode) */}
          {/* Evaluation Section */}
          {((formMode === "Review" && reviewerId === parseInt(sessionStorage.getItem("userId"),10)) || formMode === "View") && (
            <div style={styles.evaluationSection}>
              <h3 style={{ fontSize: "18px", fontWeight: "bold", color: "#333", marginBottom: "15px" }}>
                Hodnotenie práce
              </h3>

              {/* Dropdown Fields */}
              <label>Aktuálnosť a náročnosť práce</label>
              <select
                name="aktualnost"
                value={evaluation.aktualnost}
                onChange={handleEvaluationChange}
                style={styles.select}
                disabled={formMode === "View"}
              >
                <option value="">Vyberte hodnotenie</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
                <option value="Fx">Fx</option>
              </select>

              <label>Zorientovanie sa študenta v danej problematike</label>
              <select
                name="zorientovanie"
                value={evaluation.zorientovanie}
                onChange={handleEvaluationChange}
                style={styles.select}
                disabled={formMode === "View"}
              >
                <option value="">Vyberte hodnotenie</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="E">E</option>
                <option value="Fx">Fx</option>
              </select>

              <label>Práca zodpovedá šablóne určenej pre ŠVK</label>
              <select
                name="sablona_sv"
                value={evaluation.sablona_sv}
                onChange={handleEvaluationChange}
                style={styles.select}
                disabled={formMode === "View"}
              >
                <option value="">Vyberte možnosť</option>
                <option value="Áno">Áno</option>
                <option value="Nie">Nie</option>
              </select>

              {/* Checkbox Fields */}
              <div style={styles.checkboxContainer}>
                <label style={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="nazov_chyba"
                    checked={evaluation.nazov_chyba}
                    onChange={handleEvaluationChange}
                    disabled={formMode === "View"}
                  />
                  Chýba názov práce v slovenskom alebo anglickom jazyku
                </label>

                <label style={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="abstrakt_chyba"
                    checked={evaluation.abstrakt_chyba}
                    onChange={handleEvaluationChange}
                    disabled={formMode === "View"}
                  />
                  Chýba abstrakt v slovenskom alebo anglickom jazyku
                </label>

                <label style={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="abstrakt_rozsah"
                    checked={evaluation.abstrakt_rozsah}
                    onChange={handleEvaluationChange}
                    disabled={formMode === "View"}
                  />
                  Abstrakt nesplňa rozsah 100 - 150 slov
                </label>

                <label style={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="uvod_vysledky"
                    checked={evaluation.uvod_vysledky}
                    onChange={handleEvaluationChange}
                    disabled={formMode === "View"}
                  />
                  Chýbajú "Úvod", "Výsledky a diskusia" alebo "Záver"
                </label>
              </div>

              {/* Textarea Fields */}
              <label style={styles.evaluationLabel}>Prínos (silné stránky) práce</label>
              <textarea
                name="strong_points"
                value={evaluation.strong_points}
                onChange={handleEvaluationChange}
                rows="3"
                style={styles.evaluationtextarea}
                readOnly={formMode === "View"}
              />

              <label style={styles.evaluationLabel}>Nedostatky (slabé stránky) práce</label>
              <textarea
                name="weak_points"
                value={evaluation.weak_points}
                onChange={handleEvaluationChange}
                rows="3"
                style={styles.evaluationtextarea}
                readOnly={formMode === "View"}
              />
              {/* Final Evaluation Field */}
              <div style={styles.evaluationSection}>
              <h3 style={styles.evaluationSectionTitle}>Záverečný posudok</h3>

              <label style={styles.evaluationLabel}>Vyberte konečné rozhodnutie:</label>
              <select
                name="final_assessment"
                value={evaluation.final_assessment}
                onChange={handleEvaluationChange}
                style={styles.evaluationInput}
                disabled={formMode === "View"}
              >
                <option value="" disabled>Vyberte hodnotenie</option>
                <option value="7">publikovať v predloženej forme</option>
                <option value="8">publikovať po zapracovaní pripomienok</option>
                <option value="9">neprijať pre publikovanie</option>
              </select>
            </div>
            </div>
          )}

          {/* Submit Button */}
          {(formMode === "New" || formMode === "Edit" || (formMode === "Review" && reviewerId === parseInt(sessionStorage.getItem("userId"), 10))) && (
          <button type="submit" style={styles.submitButton} onClick={() => setShowPopup(true)}>
              {formMode === "New" && "Nahrať prácu"}
              {formMode === "Edit" && "Uložiť zmeny"}
              {formMode === "Review" && "Uložiť hodnotenie"}
          </button>)}
          
        </form>
        
        
      </main>
      {/* Popup */}
      {showPopup && (
        <div style={styles.popupOverlay} onClick={() => setShowPopup(false)}>
          <div style={styles.popup}>
            <p>Chcete túto prácu odoslať na hodnotenie?</p>
            <div style={styles.popupButtons}>
              <button
                style={{ ...styles.popupButton, backgroundColor: "#d3d3d3" }}
                onClick={() => handleSubmit(4)}
              >
                Uložiť ako Koncept
              </button>
              <button
                style={{ ...styles.popupButton, backgroundColor: "#4CAF50", color: "#fff" }}
                onClick={() => handleSubmit(5)}
              >
                
                {formMode === "New"  && "Poslať na hodnotenie"}
              {formMode === "Edit" && "Poslať na hodnotenie"}
              {formMode === "Review" && "Odoslat hodnotenie"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadArticle;