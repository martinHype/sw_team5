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
    const [articleData, setArticleData] = useState({
      title: "",
      category: "",
      Description: "",
      keywords: "",
      files: [], // This will hold file information
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

      // Fetch article data on screen load
    useEffect(() => {
      const fetchArticleData = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/article/${article_id}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
            },
          });
          setArticleData(response.data[0]); // Assuming the response is an array with one object
        } catch (error) {
          console.error("Error fetching article data:", error.response?.data || error.message);
        }
      };

      if (article_id) fetchArticleData();
    }, [article_id]);

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
                {[].map((file, index) => (
                <div
                    key={index}
                    style={styles.fileCard}
                    onMouseOver={(e) => {
                    e.currentTarget.style.opacity = "0.6";
                    }}
                    onMouseOut={(e) => {
                    e.currentTarget.style.opacity = "1";
                    }}
                >
                    <img
                  src={file.type === "application/pdf" ? image_pdf : image_doc } // Replace with actual file icon path
                  alt="file icon"
                  style={styles.fileImage}
                />
                    <a href={file.url} download style={styles.fileName}>
                    {file.name}
                    </a>
                </div>
                ))}
                </div>
                </div>
            
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
                  />
                  Chýba názov práce v slovenskom alebo anglickom jazyku
                </label>

                <label style={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="abstrakt_chyba"
                    checked={evaluation.abstrakt_chyba}
                    onChange={handleEvaluationChange}
                  />
                  Chýba abstrakt v slovenskom alebo anglickom jazyku
                </label>

                <label style={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="abstrakt_rozsah"
                    checked={evaluation.abstrakt_rozsah}
                    onChange={handleEvaluationChange}
                  />
                  Abstrakt nesplňa rozsah 100 - 150 slov
                </label>

                <label style={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="uvod_vysledky"
                    checked={evaluation.uvod_vysledky}
                    onChange={handleEvaluationChange}
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
              />

              <label style={styles.evaluationLabel}>Nedostatky (slabé stránky) práce</label>
              <textarea
                name="weak_points"
                value={evaluation.weak_points}
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
                <option value="7">publikovať v predloženej forme</option>
                <option value="8">publikovať po zapracovaní pripomienok</option>
                <option value="9">neprijať pre publikovanie</option>
              </select>
            </div>
            </div>
            </main>
            <footer style={styles.footer}>
                <p style={styles.footerText}>© 2024 Študentská vedecká konferencia. Všetky práva vyhradené.</p>
            </footer>
        </div>
    );
};

export default ReviewArticleScreen;
