const styles = {
    header: {
      backgroundColor: "#4caf50",
      color: "white",
      display: "flex",
      alignItems: "center",
      padding: "10px 20px",
      height: "80px",

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
  };
  
export default styles;
  