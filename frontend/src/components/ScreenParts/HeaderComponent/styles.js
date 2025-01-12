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
        maxWidth: "1000px", // Match the main's max width
        margin: "0 auto",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%", // Allow for responsiveness
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
};

export default styles;