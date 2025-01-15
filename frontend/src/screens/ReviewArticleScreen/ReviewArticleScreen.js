import React, { useState,useEffect } from "react";
import styles from "./styles.js";
import axios from "axios";
import image_pdf from "../../images/pdf.png";
import image_doc from "../../images/doc.png";
import { useParams, useNavigate } from "react-router-dom";
import ViewModeEvaluation from "../../components/Reviewer/ViewModeEvaluation/ViewModeEvaluation.js";
import HeaderComponent from "../../components/ScreenParts/HeaderComponent/HeaderComponent.js";
import FooterComponent from "../../components/ScreenParts/FooterComponent/FooterComponent.js";

const ReviewArticleScreen = ({editMode = true}) => {
    const { article_id } = useParams();
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [showPopup, setShowPopup] = useState(false);
    const [articleData, setArticleData] = useState({
      title: "something",
      category: "category",
      Description: "afaf",
      keywords_string: "adfa",
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
          const response = await axios.get(`http://localhost:8080/api/article/${article_id}`, {
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
          alert("Chyba pri načítaní praáce");
        }
      };

      if (article_id) fetchArticleData();
    }, [article_id]);

    const handleSubmit = async (status) => {
      console.log(article_id);
      console.log(status);
      if (!validateForm()) {
        return; // Prevent submission if validation fails
      }
      
      try {
        const response = await axios.put(
          `http://localhost:8080/api/evaluateArticle/${article_id}`, // Replace with your actual endpoint
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
        alert("Hodnotenie bolo úspešne uložené");
        navigate("/home");
        setShowPopup(false); // Close the popup
      } catch (error) {
        console.error("Error evaluating article:", error.response?.data || error.message);
        alert("Chyba pri ukladaní hodnotenia");
        throw error; // Re-throw the error for further handling
      }
      
    };
    const handleEvaluationChange = (e) => {
      const { name, type, checked, value } = e.target;
      setEvaluation({
        ...evaluation,
        [name]: type === "checkbox" ? checked : value,
      });
    };

    const validateForm = () => {
      const newErrors = {};
    
      // Validation for "Aktuálnosť a náročnosť práce"
      if (!evaluation.actuality_difficulty) {
        newErrors.actuality_difficulty = "Pole musí byť vyplnené.";
      }
    
      // Validation for "Zorientovanie sa študenta v danej problematike"
      if (!evaluation.orientation_in_theme) {
        newErrors.orientation_in_theme = "Pole musí byť vyplnené.";
      }
    
      // Validation for "Práca zodpovedá šablóne"
      if (!evaluation.work_corresponding_template) {
        newErrors.work_corresponding_template = "Pole musí byť vyplnené.";
      }
    
      // Validation for "Prínos (silné stránky) práce"
      if (!(evaluation.positive_review?.trim() || "").length) {
        newErrors.positive_review = "Pole musí byť vyplnené.";
      } else if ((evaluation.positive_review || "").length > 500) {
        newErrors.positive_review = "Text nesmie presahovať 500 znakov.";
      }

      // Validation for "Nedostatky (slabé stránky) práce"
      if (!(evaluation.negative_review?.trim() || "").length) {
        newErrors.negative_review = "Pole musí byť vyplnené.";
      } else if ((evaluation.negative_review || "").length > 500) {
        newErrors.negative_review = "Text nesmie presahovať 500 znakov.";
      }
    
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0; // Return true if no errors
    };
    


    return (
        <div style={styles.container}>
             {/* Header */}
            <HeaderComponent/>
            <main style={styles.main}>
                {/* Article Details */}
                <div style={styles.articleDetails}>
                <h1 style={styles.articleTitle}>{articleData.title}</h1>
                <p><strong>{articleData.category_name}</strong></p>
                <p>{articleData.Description}</p>
                <p><span style={styles.keywords}>{articleData.keywords_string}</span></p>

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
              {!editMode && <ViewModeEvaluation data={evaluation}/>}   
              {editMode && 
                <div>
                  <div style={{...styles.evaluationSection}}>
              <h3 style={{ fontSize: "18px", fontWeight: "bold", color: "#333", marginBottom: "15px" }}>
                Hodnotenie práce
              </h3>

              {/* Dropdown Fields */}
              <label style={styles.label}>Aktuálnosť a náročnosť práce</label>
              <div>
                <select
                  name="actuality_difficulty"
                  value={evaluation.actuality_difficulty}
                  onChange={handleEvaluationChange}
                  style={{
                    ...styles.select,
                    borderColor: errors.actuality_difficulty ? "red" : "#ccc",
                  }}
                >
                  <option value="">Vyberte hodnotenie</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="E">E</option>
                  <option value="Fx">Fx</option>
                </select>
                {errors.actuality_difficulty && (<p style={styles.errorMessage}>{errors.actuality_difficulty}</p>)}
              </div>
              
              <div>
              <label style={styles.label}>Zorientovanie sa študenta v danej problematike</label>
              
                <select
                  name="orientation_in_theme"
                  value={evaluation.orientation_in_theme}
                  onChange={handleEvaluationChange}
                  style={{
                    ...styles.select,
                    borderColor: errors.orientation_in_theme ? "red" : "#ccc",
                  }}
                >
                  <option value="">Vyberte hodnotenie</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="E">E</option>
                  <option value="Fx">Fx</option>
                </select>
                {errors.orientation_in_theme && (<p style={styles.errorMessage}>{errors.orientation_in_theme}</p>)}
              </div>
              
              <div>
              <label>Práca zodpovedá šablóne určenej pre ŠVK</label>
              
              <select
                name="work_corresponding_template"
                value={evaluation.work_corresponding_template}
                onChange={handleEvaluationChange}
                style={{
                  ...styles.select,
                  borderColor: errors.work_corresponding_template ? "red" : "#ccc",
                }}
              >
                <option value="">Vyberte možnosť</option>
                <option value="Áno">Áno</option>
                <option value="Nie">Nie</option>
              </select>
              {errors.work_corresponding_template && (<p style={styles.errorMessage}>{errors.work_corresponding_template}</p>)}
              </div>
              
              

              {/* Checkbox Fields */}
              <label style={styles.evaluationLabel}>Chyby práce</label>
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
              <div>
                <textarea
                  name="positive_review"
                  value={evaluation.positive_review}
                  onChange={handleEvaluationChange}
                  rows="3"
                  style={{
                    ...styles.evaluationtextarea,
                    borderColor: errors.positive_review ? "red" : "#ccc",
                  }}
                />
                {errors.positive_review && (
                <p style={styles.errorMessage}>{errors.positive_review}</p>
                )}
                
              </div>
              

              <label style={styles.evaluationLabel}>Nedostatky (slabé stránky) práce</label>
              <div>
                <textarea
                  name="negative_review"
                  value={evaluation.negative_review}
                  onChange={handleEvaluationChange}
                  rows="3"
                  style={{
                    ...styles.evaluationtextarea,
                    borderColor: errors.negative_review ? "red" : "#ccc",
                  }}
                />
                <p style={styles.charCount}>
                  {500 - (evaluation.negative_review?.length || 0)} znakov zostáva.
                </p>
                {errors.negative_review && (
                <p style={styles.errorMessage}>{errors.negative_review}</p>
                )}
                
              </div>
              
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
                </div>
            }
            </main>
            <FooterComponent/>
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
