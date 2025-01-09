import React, { useState, useRef, useEffect } from "react";
import styles from "./styles";
import image_pdf from "../../images/pdf.png";
import image_doc from "../../images/doc.png";
import downloadIcon from "../../images/download_green.png";
import axios from "axios";

const FileDropArea = ({fieldMode = "New", articleId = 0}) => {
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);
  //const [filesToDelete, setFilesToDelete] = useState([]);

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  useEffect(() => {
    console.log("message from FileDropArea" + fieldMode);
    if (fieldMode === "Edit" || fieldMode === "View") {
      const fetchFiles = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8080/api/document/${articleId}`,
            {
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
              },
            }
          );
           // Initialize the `files` state with fetched files
          const fetchedFiles = response.data.map((file) => ({
            id: file.id,
            name: file.name,
            type: file.name.endsWith(".pdf") ? "application/pdf" : "application/msword",
            size: null, // Backend doesn't provide size, so set it as null or a default value
            url: file.url,
            isFetched: true, // Mark these files as fetched to differentiate them
          }));

          setFiles(fetchedFiles);
        } catch (error) {
          console.error("Error fetching files:", error.response?.data || error.message);
        }
      };
  
      if (articleId !== 0) fetchFiles();
    }
  }, [fieldMode, articleId]);

  
  const saveFileToLocalStorage = (file) => {
    const reader = new FileReader();

    reader.onload = () => {
      const base64String = reader.result.split(",")[1];
      const files = JSON.parse(localStorage.getItem("files") || "[]");

      files.push({
        name: file.name,
        type: file.type,
        size: file.size,
        content: base64String,
      });

      localStorage.setItem("files", JSON.stringify(files));
    };

    reader.readAsDataURL(file);
  };

  const handleClick = () => {
    if (fieldMode !== "View" && files.length < 2) {
        fileInputRef.current.click(); // Allow clicking only if less than 2 files
      }
  };

  const handleFileSelect = (event) => {
    if (fieldMode !== "View" && files.length + event.target.files.length <= 2) {
        setFiles((prevFiles) => [...prevFiles, ...Array.from(event.target.files)]);
        const file = event.target.files[0];
        saveFileToLocalStorage(file);
      }
    
  };



  const handleDrop = (event) => {
    event.preventDefault();
    if (fieldMode !== "View" && files.length + event.dataTransfer.files.length <= 2) {
        setFiles((prevFiles) => [...prevFiles, ...Array.from(event.dataTransfer.files)]);
      }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleRemoveFile = async (indexToRemove,documentid) => {
    if (fieldMode !== "View") {
      if(documentid){
        const filesToDelete = JSON.parse(localStorage.getItem("filesToDelete") || "[]");
        filesToDelete.push({documentid: documentid});
        localStorage.setItem("filesToDelete", JSON.stringify(filesToDelete));
      }
      setFiles((prevFiles) => prevFiles.filter((_, index) => index !== indexToRemove));
    }


  };

  return (
    <div
      onClick={handleClick}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={styles.dropZone(files.length,isHovered,fieldMode === "View")}
    >
      <input
        type="file"
        ref={fileInputRef}
        multiple
        style={{ display: "none" }}
        onChange={handleFileSelect}
        disabled={fieldMode === "View"}
      />
      {files.length > 0 ? (
        <div style={styles.filePreviewContainer}>
          {files.map((file, index) => (
            <div key={index} style={styles.fileItem}>
              <a
            href={file.url}
            download
            style={{ textDecoration: "none" }}
            onClick={(event) => {
              event.stopPropagation(); // Prevent triggering the parent click event
            }}
            >
            <div
              onMouseOver={(e) => {
                e.currentTarget.style.opacity = "0.6";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.opacity = "1";
              }}
            >
              {/* File Image/Name */}
              <div style={styles.fileContent}>
                <img
                  src={file.type === "application/pdf" ? image_pdf : image_doc } // Replace with actual file icon path
                  alt="file icon"
                  style={styles.fileImage}
                />
                
                <p style={styles.fileName}>{file.name}</p>
              </div>
              
            </div>
            </a>
            {/* Delete Button */}
            {fieldMode !== "View" && (
              <button
                style={styles.deleteButton}
                onClick={(event) => {
                    event.stopPropagation(); // Prevent triggering the parent click event
                    handleRemoveFile(index,file.id);
                  }}
              >
                ✖
              </button>)}
            </div>
            
          ))}
        </div>
      ) : (
        <div style={styles.emptyMessage}>
           <img
            src={downloadIcon} // Replace with the path to your image
            alt="No files added"
            style={styles.emptyImage}
          />
          Kliknite sem alebo potiahnite súbory na nahranie
          </div>
      )}
    </div>
  );
};

export default FileDropArea;
