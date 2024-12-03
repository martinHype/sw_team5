import React, { useState, useRef } from "react";
import styles from "./styles";
import image_pdf from "../../images/pdf.png";
import image_doc from "../../images/doc.png";
import downloadIcon from "../../images/download_green.png";

const FileDropArea = () => {
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);


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
    if (files.length < 2) {
        fileInputRef.current.click(); // Allow clicking only if less than 2 files
      }
  };

  const handleFileSelect = (event) => {
    if (files.length + event.target.files.length <= 2) {
        setFiles((prevFiles) => [...prevFiles, ...Array.from(event.target.files)]);
        const file = event.target.files[0];
        saveFileToLocalStorage(file);
      }
    
  };



  const handleDrop = (event) => {
    event.preventDefault();
    if (files.length + event.dataTransfer.files.length <= 2) {
        setFiles((prevFiles) => [...prevFiles, ...Array.from(event.dataTransfer.files)]);
      }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleRemoveFile = (indexToRemove) => {
    setFiles((prevFiles) => prevFiles.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div
      onClick={handleClick}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={styles.dropZone(files.length,isHovered)}
    >
      <input
        type="file"
        ref={fileInputRef}
        multiple
        style={{ display: "none" }}
        onChange={handleFileSelect}
      />
      {files.length > 0 ? (
        <div style={styles.filePreviewContainer}>
          {files.map((file, index) => (
            <div key={index} style={styles.fileItem}>
              {/* File Image/Name */}
              <div style={styles.fileContent}>
                <img
                  src={file.type === "application/pdf" ? image_pdf : image_doc } // Replace with actual file icon path
                  alt="file icon"
                  style={styles.fileImage}
                />
                <a
                  href="#"
                  style={styles.fileName}
                  onClick={(e) => e.preventDefault()}
                >
                  {file.name}
                </a>
              </div>
              {/* Delete Button */}
              <button
                style={styles.deleteButton}
                onClick={(event) => {
                    event.stopPropagation(); // Prevent triggering the parent click event
                    handleRemoveFile(index);
                  }}
              >
                ✖
              </button>
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
