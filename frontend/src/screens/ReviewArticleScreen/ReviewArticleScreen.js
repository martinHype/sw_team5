import React, { useState,useEffect } from "react";
import styles from "./styles.js";
import axios from "axios";
import graduation_hat from "../../images/graduation_hat.png";
import user from "../../images/user.png";
import logout from "../../images/logout.png";
import image_pdf from "../../images/pdf.png";
import image_doc from "../../images/doc.png";
import { useParams } from "react-router-dom";

const ReviewArticleScreen = () => {
    const { article_id } = useParams();
    const [showPopup, setShowPopup] = useState(false);
    const [articleData, setArticleData] = useState({
      title: "something",
      category: "category",
      Description: "afaf",
      keywords: "adfa",
      files: [], // This will hold file information
    });
    const [evaluation, setEvaluation] = useState({
        actuality_difficulty: "",
        orientation_in_theme: "",
        work_corresponding_template: "",
        missing_slovak_or_english_title: false,
        missing_slovak_or_english_abstract: false,
        missing_abstract_length: false,
        missing_part: false,
        positive_review: "",
        negative_review: "",
        final_assessment:"",
      });

      // Fetch article data on screen load
    useEffect(() => {
      console.log(article_id);
      const fetchArticleData = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/article/1`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
            },
          });
          console.log(response.data);
          setArticleData(response.data); // Assuming the response is an array with one object
          setEvaluation(response.data);
        } catch (error) {
          console.error("Error fetching article data:", error.response?.data || error.message);
        }
      };

      if (article_id) fetchArticleData();
    }, [article_id]);

    const handleSubmit = async (status) => {
      console.log(article_id);
      console.log(status);
      try {
        const response = await axios.post(
          "http://localhost:8080/api/evaluateArticle", // Replace with your actual endpoint
          {
            articleid:article_id,
            statusid:status,
            actuality_difficulty: evaluation.actuality_difficulty,
            orientation_in_theme: evaluation.orientation_in_theme,
            work_corresponding_template: evaluation.work_corresponding_template,
            missing_slovak_or_english_title: evaluation.missing_slovak_or_english_title,
            missing_slovak_or_english_abstract: evaluation.missing_slovak_or_english_abstract,
            missing_abstract_length: evaluation.missing_abstract_length,
            missing_part: evaluation.missing_part,
            positive_review:evaluation.positive_review,
            negative_review:evaluation.negative_review
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${sessionStorage.getItem("authToken")}`, // Replace with your auth token logic
            },
          }
        );
    
        console.log("Article evaluated successfully:", response.data);
        return response.data;
      } catch (error) {
        console.error("Error evaluating article:", error.response?.data || error.message);
        throw error; // Re-throw the error for further handling
      }
      setShowPopup(false); // Close the popup
    };
      const handleEvaluationChange = (e) => {
        const { name, type, checked, value } = e.target;
        setEvaluation({
          ...evaluation,
          [name]: type === "checkbox" ? checked : value,
        });
      };
    return (
        <div style={styles.container}>
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
            <main style={styles.main}>
                {/* Article Details */}
                <div style={styles.articleDetails}>
                <h1 style={styles.articleTitle}>{articleData.title}</h1>
                <p><strong>{articleData.category_name}</strong></p>
                <p>{articleData.Description}</p>
                <p><span style={styles.keywords}>Key words</span></p>

                {/* Files Section */}
                <h3>Stiahnuť súbory</h3>
                <div style={styles.fileList}>
                {articleData?.documents?.length > 0 ? (
                  articleData.documents.map((file, index) => (
                    <a
                      key={index}
                      href={file.url}
                      download
                      style={{ textDecoration: "none" }} // Ensure no underline on the link
                    >
                      <div
                        style={styles.fileCard}
                        onMouseOver={(e) => {
                          e.currentTarget.style.opacity = "0.6";
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.opacity = "1";
                        }}
                      >
                        <img
                          src={file.name.endsWith(".pdf") ? image_pdf : image_doc} // Check file type for icon
                          alt="file icon"
                          style={styles.fileImage}
                        />
                        <p style={styles.fileName}>{file.name}</p>
                      </div>
                    </a>
                  ))
                ) : (
                  <p>No files available for download.</p>
                )}
              </div>

                </div>
            
            <div style={styles.evaluationSection}>
              <h3 style={{ fontSize: "18px", fontWeight: "bold", color: "#333", marginBottom: "15px" }}>
                Hodnotenie práce
              </h3>

              {/* Dropdown Fields */}
              <label>Aktuálnosť a náročnosť práce</label>
              <select
                name="actuality_difficulty"
                value={evaluation.actuality_difficulty}
                onChange={handleEvaluationChange}
                style={styles.select}
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
                name="orientation_in_theme"
                value={evaluation.orientation_in_theme}
                onChange={handleEvaluationChange}
                style={styles.select}
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
                name="work_corresponding_template"
                value={evaluation.work_corresponding_template}
                onChange={handleEvaluationChange}
                style={styles.select}
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
                    name="missing_slovak_or_english_title"
                    checked={evaluation.missing_slovak_or_english_title}
                    onChange={handleEvaluationChange}
                  />
                  Chýba názov práce v slovenskom alebo anglickom jazyku
                </label>

                <label style={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="missing_slovak_or_english_abstract"
                    checked={evaluation.missing_slovak_or_english_abstract}
                    onChange={handleEvaluationChange}
                  />
                  Chýba abstrakt v slovenskom alebo anglickom jazyku
                </label>

                <label style={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="missing_abstract_length"
                    checked={evaluation.missing_abstract_length}
                    onChange={handleEvaluationChange}
                  />
                  Abstrakt nesplňa rozsah 100 - 150 slov
                </label>

                <label style={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="missing_part"
                    checked={evaluation.missing_part}
                    onChange={handleEvaluationChange}
                  />
                  Chýbajú "Úvod", "Výsledky a diskusia" alebo "Záver"
                </label>
              </div>

              {/* Textarea Fields */}
              <label style={styles.evaluationLabel}>Prínos (silné stránky) práce</label>
              <textarea
                name="positive_review"
                value={evaluation.positive_review}
                onChange={handleEvaluationChange}
                rows="3"
                style={styles.evaluationtextarea}
              />

              <label style={styles.evaluationLabel}>Nedostatky (slabé stránky) práce</label>
              <textarea
                name="negative_review"
                value={evaluation.negative_review}
                onChange={handleEvaluationChange}
                rows="3"
                style={styles.evaluationtextarea}
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
              >
                <option value="" disabled>Vyberte hodnotenie</option>
                <option value="4">publikovať v predloženej forme</option>
                <option value="5">publikovať po zapracovaní pripomienok</option>
                <option value="6">neprijať pre publikovanie</option>
              </select>
            </div>
            </div>
            <button type="submit" style={styles.submitButton} onClick={() => setShowPopup(true)}>
              Uložiť hodnotenie
            </button>
            </main>
            <footer style={styles.footer}>
                <p style={styles.footerText}>© 2024 Študentská vedecká konferencia. Všetky práva vyhradené.</p>
            </footer>
            {/* Popup */}
            {showPopup && (
              <div style={styles.popupOverlay} onClick={() => setShowPopup(false)}>
                <div style={styles.popup}>
                  <p>Chcete hodnotenie uzavriet?</p>
                  <div style={styles.popupButtons}>
                    <button
                      style={{ ...styles.popupButton, backgroundColor: "#d3d3d3" }}
                      onClick={() => handleSubmit(3)}
                    >
                      Uložiť ako Koncept
                    </button>
                    <button
                      style={{ ...styles.popupButton, backgroundColor: "#4CAF50", color: "#fff" }}
                      onClick={() => handleSubmit(parseInt(evaluation.final_assessment,10))}
                    >
                    Odoslat hodnotenie
                    </button>
                  </div>
                </div>
              </div>
            )}
        </div>
    );
};

export default ReviewArticleScreen;
