const styles = {
  dropZone: (filesLength,isHoverd) => ({
    border: "2px dashed #4CAF50",
    borderRadius: "10px",
    padding: "20px",
    textAlign: "center",
    maxWidth: "1000px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center", // Center content vertically
     // Center content horizontally
    gap: "10px",
    cursor: "pointer",
    position: "relative",
    height: "150px",
    alignItems: filesLength > 0 ? "flex-start":"center",
    backgroundColor: filesLength >= 2 ? "rgba(128, 128, 128, 0.3)" : isHoverd ? "rgba(76, 175, 80, 0.3)" : "rgba(76, 175, 80, 0.1)" , // Gray out if 2 files
    cursor: filesLength >= 2 ? "not-allowed" : "pointer",
  }),
  filePreviewContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  fileItem: {
    position: "relative", // Needed for delete button positioning
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "5px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "10px",
    backgroundColor: "#fff",
    maxWidth: "100px",
  },
  fileContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "5px",
  },
  fileImage: {
    width: "50px",
    height: "50px",
  },
  fileName: {
    fontSize: "14px",
    color: "#007bff",
    textDecoration: "underline",
    textAlign: "center",
    maxWidth: "80px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  deleteButton: {
    position: "absolute",
    top: "-5px",
    right: "-5px",
    width: "20px",
    height: "20px",
    backgroundColor: "red",
    color: "white",
    border: "none",
    borderRadius: "50%",
    fontSize: "14px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyMessage: {
    justifyContent:"center",
    flexDirection: "column",
    alignItems:"center",
    display:"flex",
    fontSize: "16px",
    color: "#4CAF50",
  },
  emptyImage: {
    width: "60px", // Adjust the size of the image
    height: "auto",
    marginBottom: "10px",
  },
};

export default styles;