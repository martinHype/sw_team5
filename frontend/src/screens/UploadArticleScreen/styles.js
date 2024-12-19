const styles = {
    header: {
      backgroundColor: "#4caf50",
      color: "white",
      display: "flex",
      alignItems: "center",
      padding: "10px 20px",
      height: "50px",

    },
    headerContainer: {
        width: "1000px", // Match the form's maxWidth
        margin: "0 auto",  // Center the content
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      },
    logo: {
      backgroundColor: "white",
      color: "black",
      padding: "10px",
      fontWeight: "bold",
      borderRadius: "5px",
    },
    nav: {
      display: "flex",
      gap: "20px",
    },
    navLink: {
      color: "white",
      textDecoration: "none",
    },
    activeLink: {
      borderBottom: "2px solid white",
    },
    icons: {
      display: "flex",
      gap: "15px",
    },
    icon: {
      fontSize: "20px",
      cursor: "pointer",
    },
    main: {
      padding: "20px",
    },
    form: {
      maxWidth: "1000px",
      margin: "0 auto",
      display: "flex",
      flexDirection: "column",
      gap: "15px",
    },
    input: {
      padding: "10px",
      fontSize: "16px",
      border: "1px solid #ccc",
      borderRadius: "5px",
    },
    textarea: {
      padding: "10px",
      fontSize: "16px",
      border: "1px solid #ccc",
      borderRadius: "5px",
    },
    fileUpload: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "10px",
    },
    uploadButton: {
      padding: "10px 15px",
      fontSize: "16px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      backgroundColor: "white",
      cursor: "pointer",
    },
    submitButton: {
      padding: "10px 20px",
      fontSize: "16px",
      backgroundColor: "green",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      alignSelf: "flex-end",
    },
    navTitle: {
        fontSize: "32px", // Adjust font size as needed
        color: "white",
        margin: 0,
        textAlign: "center",
        fontWeight: "bold",
      },
      select: {
        width: '100%',
        padding: '10px',
        marginBottom: '15px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        fontSize: '16px',
        backgroundColor: '#fff',
    },
    popupOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 999,
    },
    popup: {
      backgroundColor: "#fff",
      padding: "20px",
      borderRadius: "8px",
      textAlign: "center",
      boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
    },
    popupButtons: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: "15px",
    },
    popupButton: {
      padding: "10px 15px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "14px",
      flex: "1", // Allow buttons to size proportionally
      margin: "0 10px", // Add spacing between buttons
      maxWidth: "150px", // Limit button width
      textAlign: "center",
    },
    evaluationSection: {
      border: "2px solid #4CAF50",
      padding: "15px",
      borderRadius: "8px",
      backgroundColor: "#f9fdf9",
      marginTop: "20px",
    },
  
    evaluationSectionTitle: {
      fontSize: "20px",
      fontWeight: "bold",
      color: "#4CAF50",
      textAlign: "center",
      marginBottom: "15px",
    },
  
    evaluationLabel: {
      display: "block",
      fontSize: "16px",
      fontWeight: "600",
      marginBottom: "10px",
      color: "#333",
    },
  
    evaluationInput: {
      width: "100%",
      padding: "10px",
      fontSize: "16px",
      border: "2px solid #4CAF50",
      borderRadius: "5px",
      backgroundColor: "#ffffff",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      color: "#333",
      outline: "none",
      cursor: "pointer",
    },
  
    checkboxContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      marginBottom: "15px",
    },
  
    checkboxLabel: {
      fontSize: "14px",
      fontWeight: "500",
      color: "#555",
    },

    evaluationtextarea: {
      width: '98%',
        padding: '10px',
        marginBottom: '15px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        fontSize: '16px',
        backgroundColor: '#fff',
    },
    
  
  };
  
export default styles;
  