import React, { useState,useEffect } from "react";
import styles from "./styles.js";
import graduation_hat from "../../images/graduation_hat.png";
import user from "../../images/user.png";
import logout from "../../images/logout.png";
import FileDropArea from "../../components/FileUploadComponent/FileUpload.js";
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UploadArticle = ({ formMode = "New" }) => {
  const { article_id } = useParams();
  const location = useLocation();
  const { conferenceId } = location.state || {};
  const navigate = useNavigate();
  
  const [showPopup, setShowPopup] = useState(false);
  const [categories, setCategories] = useState([]);
  const [ArticleData, setArticleData] = useState({
    title: "",
    Description: "",
    category_idcategory:0,
  });
  
  useEffect(() => {
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
  }, [article_id,conferenceId,categories,ArticleData]);

  

  const handleChange = (e) => {
    setArticleData({
      ...ArticleData,
      [e.target.name]: e.target.value || "", // Ensure fallback for undefined
    });
  }
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
              `http://localhost:8080/api/article/${id_article}/upload`,
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
            readOnly={formMode === "View" && "locked"} />
          <label>Sekcia</label>
          <select 
          name="category_idcategory"
          style={styles.select}
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
          <label>Popis práce</label>
          <textarea 
            name="Description"
            value={ArticleData.Description}
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
          <FileDropArea fieldMode={formMode} articleId={article_id}/>
          {/* Submit Button */}
          {formMode !== "View" && <button type="submit" style={styles.submitButton} onClick={() => setShowPopup(true)}>
              {formMode === "New" && "Nahrať prácu"}
              {formMode === "Edit" && "Uložiť zmeny"}
          </button>}
          
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