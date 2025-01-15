import React, { useState,useEffect } from "react";
import styles from "./styles.js";
import FileDropArea from "../../components/FileUploadComponent/FileUpload.js";
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import HeaderComponent from "../../components/ScreenParts/HeaderComponent/HeaderComponent.js";
import FooterComponent from "../../components/ScreenParts/FooterComponent/FooterComponent.js";

const UploadArticle = ({ formMode = "New" }) => {
  const { article_id } = useParams();
  const location = useLocation();
  const { conferenceId } = location.state || {};
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [categories, setCategories] = useState([]);
  const [ArticleData, setArticleData] = useState({
    title: "",
    Description: "",
    category_idcategory:0,
    keywords_string:"",
  });
  
  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    localStorage.removeItem('files');
    localStorage.removeItem('filesToDelete');
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/admin/events/${conferenceId}/categories`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + sessionStorage.getItem('authToken'),
          },
        });
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error.response?.data || error.message);
        alert("Chyba pri načítaní kategorii zo systému");
      }
    };
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
          ArticleData.category_idcategory = response.data.category_idcategory;
          ArticleData.keywords_string = response.data.keywords_string;
          //setEvaluation(response.data);
          console.log(ArticleData);
        } catch (error) {
          console.error("Error fetching article data:", error.response?.data || error.message);
          alert("Chyba pri načítaní práce zo systému");
        }
      };
    
    fetchCategories();
    if (article_id) 
      fetchArticleData();
    console.log(categories);
  }, [article_id,conferenceId]);

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Dynamicky uprav ArticleData
    setArticleData({
      ...ArticleData,
      [name]: value || "",
    });

    // Odstráň chybu, ak bolo pole opravené
  if (errors[name]) {
    const updatedErrors = { ...errors };

    if (name === "title" && value.trim() && value.length <= 255) {
      delete updatedErrors.title;
    } else if (name === "Description" && value.trim() && value.length <= 500) {
      delete updatedErrors.Description;
    } else if (name === "category_idcategory" && value) {
      delete updatedErrors.category_idcategory;
    } else if (name === "keywords_string") {
      // Rozdeľ hodnotu podľa čiarky a trimuj medzery
      const keywordsArray = value.split(",").map(word => word.trim());
      if (keywordsArray.length === 3 && keywordsArray.every(word => word)) {
        // Ak sú presne tri slová a žiadne z nich nie je prázdne
        delete updatedErrors.keywords_string;
      }
    }
    setErrors(updatedErrors);
  }
  }
  const uploadFiles = async (id_article) =>{
      try{
        const filesData = localStorage.getItem('files');
        if (!filesData) {
          console.error(`No files found in localStorage under the key: ${id_article}`);
          return;
        }
        const files = JSON.parse(filesData).filter(item => item.isFetched === false);
        console.log("files to import "+ files.length);
        console.log("article to attach" + id_article);
        files.forEach(async (file) => {
          try{
            const response = await axios.post(
              `http://localhost:8080/api/article/${id_article}/upload`,
              {
                file_content: file.content,
                file_name: file.name,
                file_type: file.type
              },
              {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + sessionStorage.getItem('authToken'),
                },
              }
            );
            console.log(`File ${file.name} uploaded successfully:`, response.data);
          } catch (error){
            console.error(`Error uploading file ${file.name}:`, error.response?.data || error.message);
          }
        });
        

        localStorage.removeItem('files');
        if(formMode === "New"){
          alert("Práca bola úspešne pridaná do systému.")
        }else{
          alert("Práca bola úspešne zmenena.");
        }
        
        navigate("/home");



      } catch(error){
        console.error('Error logging in:', error.response?.data || error.message);
        alert("Chyba pri nahrávaní súborov do systému");
      }
  };
  const deleteFiles = async () => {
    const filesToDelete = localStorage.getItem('filesToDelete');
    if(!filesToDelete){
      console.error(`No files to delete`);
          return;
    }
    const deleteFiles = JSON.parse(filesToDelete);
    deleteFiles.forEach(async (file) => {
      try {
      
        const response = await axios.delete(
          `http://localhost:8080/api/document/${file.documentid}`,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
            },
          }
        );
        console.log(response.data);

      } catch (error) {
        console.error("Error fetching files:", error.response?.data || error.message);
        alert("Chyba pri mazani suboru");
      }
    })
    
  }
  const handleSubmit = (status) => {
    console.log(article_id);

    if (!validateForm() && status === 2) {
      return; // Prevent submission if form is invalid
    }
    if(article_id){
      let sendStatus = status;
      updateArticle(sendStatus);
    }else{
      createArticle(status);
    }
    navigate("/home");
    
    setShowPopup(false); // Close the popup
  };

  const updateArticle = async (actualStatus) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/article/${article_id}/updateArticle`, {
          articleid:article_id,
          statusid:actualStatus,
          title: ArticleData.title,
          description: ArticleData.Description,
          category:parseInt(ArticleData.category_idcategory,10),
          key_words:ArticleData.keywords_string,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + sessionStorage.getItem('authToken'),
        },
      });
      console.log(response);
      deleteFiles();
      uploadFiles(article_id);
      
  } catch (error) {
      console.error('Error logging in:', error.response?.data || error.message);
      alert("Chyba uloženia úprav práce");
  }
  };
  // function that will create a new article
  const createArticle = async (actualStatus) => {
    try {
      const { conferenceId } = location.state || {};
      const response = await axios.post(
        'http://localhost:8080/api/article', {
          title: ArticleData.title,
          description: ArticleData.Description,
          category:parseInt(ArticleData.category_idcategory,10),
          event:conferenceId,
          status:actualStatus,
          key_words:ArticleData.keywords_string,
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
      alert("Chyba pri nahrávaní práce, prosím skúste to ešte raz.");
  }
  };

  const validateForm = () => {
    const newErrors = {};
  
    // Title validation
    if (!ArticleData.title.trim()) {
      newErrors.title = "Pole musí byť vyplnené.";
    } else if (ArticleData.title.length > 255) {
      newErrors.title = "Názov práce nesmie presahovať 255 znakov.";
    }
  
    // Description validation
    if (!ArticleData.Description.trim()) {
      newErrors.Description = "Pole musí byť vyplnené.";
    } else if (ArticleData.Description.length > 500) {
      newErrors.Description = "Popis práce nesmie presahovať 500 znakov.";
    }
  
    // Category validation
    if (!ArticleData.category_idcategory) {
      newErrors.category_idcategory = "Musíte vybrať sekciu.";
    }
  
    // Validation for keywords
    if (!ArticleData.keywords_string?.trim()) {
      newErrors.keywords_string = "Pole musí byť vyplnené.";
    } else {
      const keywordsArray = ArticleData.keywords_string.split(",").map(word => word.trim());
      if (keywordsArray.length !== 3) {
        newErrors.keywords_string = "Musíte zadať presne tri slová oddelené čiarkou.";
      }
      // Optional: Check for empty words
      if (keywordsArray.some(word => !word)) {
        newErrors.keywords_string = "Každé slovo musí obsahovať znaky a byť oddelené čiarkou.";
      }
    }

    // Validation for uploaded files
    const files = JSON.parse(localStorage.getItem("files") || "[]");
    if (files.length !== 2) {
      newErrors.files = "Musíte nahrať presne 2 súbory.";
    }

  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };
  

  return (
    <div style={styles.container}>
      {/* Header */}
      <HeaderComponent/>

      {/* Form Section */}
      <main style={styles.main}>
        <form style={styles.form} onSubmit={(e) => e.preventDefault()}>
          <label>Názov práce</label>
          {/*Title */}
          <div>
          <input 
            type="text" 
            name="title"
            placeholder="Názov práce" 
            value={ArticleData.title}
            onChange={handleChange}
            style={{
              ...styles.input,
              borderColor: errors.title ? "red" : "#ccc",
            }}
            readOnly={formMode === "View" && "locked"} />
            {formMode !== "View" && (<p style={styles.charCount}>{255 - ArticleData.title.length} znakov zostáva.</p>)}
            {errors.title && <p style={styles.errorMessage}>{errors.title}</p>}
          </div>
          {/*Categoria */}
          <label>Sekcia</label>
          <div>
          <select 
          name="category_idcategory"
          style={{
            ...styles.select,
            borderColor: errors.category_idcategory ? "red" : "#ccc",
          }}
          onChange={handleChange}
          value={ArticleData.category_idcategory}
          disabled={formMode === "View"}
          >
                <option value="" hidden>Vyberte sekciu</option>
                {categories.map((category) => (
                <option key={category.idcategory} value={category.idcategory}>
                  {category.category_name}
                </option>
              ))}
            </select>
            {errors.category_idcategory && <p style={styles.errorMessage}>{errors.category_idcategory}</p>}
          </div>
          
          <label>Popis práce</label>
          {/*Description */}
          <div>
          <textarea 
            name="Description"
            value={ArticleData.Description}
            onChange={handleChange}
            placeholder="Popis práce" 
            rows="10"
            style={{
              ...styles.textarea,
              borderColor: errors.Description ? "red" : "#ccc",
            }}
            readOnly={formMode === "View" || formMode === "Review"}/>
            {formMode !== "View" && (<p style={styles.charCount}>{500 - ArticleData.Description.length} znakov zostáva.</p>)}
            {errors.Description && <p style={styles.errorMessage}>{errors.Description}</p>}
          </div>
          
            
          <label>Kľúčové slová</label>
          {/* Klucove slova */}
          <div>
            <input 
            name="keywords_string"
            type="text" 
            placeholder="Zadajte tri slová oddelené čiarkou (napr. slovo1, slovo2, slovo3)"
            value={ArticleData.keywords_string || ""}
            onChange={handleChange}
            style={{
              ...styles.input,
              borderColor: errors.keywords_string ? "red" : "#ccc",
            }}
            readOnly={formMode === "View"} />
            {formMode !== "View" && (<p style={styles.hint}>Zadajte presne tri slová oddelené čiarkou (napr. slovo1, slovo2, slovo3).</p>)}
            {errors.keywords_string && <p style={styles.errorMessage}>{errors.keywords_string}</p>}
          </div>
          

          <label>Dokumenty</label>
          <div>
          <FileDropArea fieldMode={formMode} articleId={article_id}/>
          {formMode !== "View" && (<p style={styles.hint}>
            Nahrajte presne 2 súbory: jeden vo formáte <strong>PDF</strong> a druhý vo formáte <strong>DOCX</strong>.
          </p>)}
          {errors.files && <p style={styles.errorMessage}>{errors.files}</p>}
          </div>
          
          {/* Submit Button */}
          {formMode !== "View" && <button type="submit" style={styles.submitButton} onClick={() => setShowPopup(true)}>
              {formMode === "New" && "Nahrať prácu"}
              {formMode === "Edit" && "Uložiť zmeny"}
          </button>}
          
        </form>
        
        
      </main>
      <FooterComponent/>
      {/* Popup */}
      {showPopup && (
        <div style={styles.popupOverlay} onClick={() => setShowPopup(false)}>
          <div style={styles.popup}>
            <p>Chcete túto prácu odoslať na hodnotenie?</p>
            <div style={styles.popupButtons}>
              <button
                style={{ ...styles.popupButton, backgroundColor: "#d3d3d3" }}
                onClick={() => handleSubmit(1)}
              >
                Uložiť ako Koncept
              </button>
              <button
                style={{ ...styles.popupButton, backgroundColor: "#4CAF50", color: "#fff" }}
                onClick={() => handleSubmit(2)}
              >
                
                {formMode === "New"  && "Poslať na hodnotenie"}
              {formMode === "Edit" && "Poslať na hodnotenie"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadArticle;