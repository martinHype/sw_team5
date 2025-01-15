export const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh', // Ensures the container takes up the full viewport height
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f5f5f5',
    },
    contentWrapper: {
        flex: 1, // Allows content to grow and fill remaining space
        maxWidth: '1000px',
        width: '100%',
        margin: '0 auto',
        padding: '0 20px',
    },
    header: {
        position: 'sticky',
        top: 0,
        zIndex: 1000,
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
    main: {
        flex: 1, // Ensures the main part grows to fill available space
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        overflowY: 'auto', // Makes the content scrollable when overflowing
        minHeight: 'calc(100vh - 200px)', // Adjusts height to account for header and footer
        boxSizing: 'border-box', // Prevent padding from affecting height
        margin:'10px'
    },
    sectionTitle: {
        fontSize: '35px',
        fontWeight: 'bold',
        margin: 0, // Reset default margins for precision
        marginTop:'20px'
    },
    list: { 
        listStyleType: 'none', 
        padding: 0 
    },
    listItem: { 
        position: 'relative', // For button positioning
        marginBottom: '20px', 
        padding: '15px', 
        borderRadius: '8px', 
        backgroundColor: '#f9f9f9', 
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', 
        border: '1px solid #e0e0e0',
    },
    listItemContent: { 
        display: 'flex', 
        flexDirection: 'column' 
    },
    listItemText: { 
        fontSize: '25px',  // Increased font size from 16px to 20px
        fontWeight: 'bold', // Added bold for emphasis
        color: '#333', 
    },
    datesContainer: { 
        display: 'flex', 
        justifyContent: 'space-between' 
    },
    dateField: { 
        display: 'flex', 
        flexDirection: 'column', 
        width: '48%' 
    },
    dateLabel: { 
        marginBottom: '5px', 
        fontSize: '14px', 
        color: '#555' 
    },
    dateValue: { 
        fontSize: '16px', 
        fontWeight: 'normal', 
        color: '#333' 
    },
    conferenceDescription: {
        fontSize: '14px', // Smaller than the title
        color: '#666',    // Muted text color
        marginBottom: '10px', // Spacing between description and dates
        lineHeight: '1.4',    // Better readability
    },
    addButton: { 
        position: 'absolute',
        top: '10px',
        right: '10px',
        backgroundColor: '#4CAF50', // Green button
        color: '#ffffff', // White text
        border: 'none',
        padding: '8px 12px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: 'bold',
        transition: 'background-color 0.3s ease',
    },
    
    addButtonHover: {
        backgroundColor: '#45a049', // Slightly darker green on hover
    },
    footer: {
        backgroundColor: '#4CAF50',
        color: '#ffffff',
        textAlign: 'center',
        padding: '10px 0',
        fontSize: '14px',
        borderTop: '1px solid #3e8e41',
        marginTop: 'auto', // Ensures footer stays at the bottom
    },
    
    footerText: {
        margin: 0,
        fontSize: '14px',
        fontWeight: '400',
    },
    searchBar: {
        flex:1,
        width: '100%',      // Stretch to fill the contentWrapper
        padding: '10px',    
        margin: '10px 0', // Add spacing between title and main part
        borderRadius: '8px',
        border: '1px solid #ccc',
        fontSize: '16px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        boxSizing: 'border-box', // Prevent padding from affecting width
    },
    articlesSection: {
        marginTop: '10px', // Add space between the dates and articles
        padding: '10px',
        borderTop: '1px solid #ddd',
    },
    
    articlesTitle: {
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '10px',
    },
    
    articleList: {
        listStyleType: 'none',
        padding: 0,
    },
    
    articleItem: {
        position: 'relative',
        padding: '10px',
        marginBottom: '10px',
        backgroundColor: '#f9f9f9',
        borderRadius: '5px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        transition: 'background-color 0.3s ease',
        cursor: 'pointer', // Makes the mouse cursor a clickable pointer
    },
    
    articleTitle: {
        fontSize: '16px',
        fontWeight: 'bold',
        marginBottom: '5px',
    },
    
    articleText: {
        margin: '5px 0',
        fontSize: '14px',
        color: '#555',
    },
    
    articleDate: {
        position: 'absolute',
        bottom: '10px',
        right: '15px',
        fontSize: '12px',
        color: '#777',
    },
    toggleButton: {
        marginTop: '10px',
        padding: '12px 12px',
        backgroundColor: '#4CAF50', // Green background
        color: '#fff', // White text
        border: 'none',
        borderRadius: '6px', // Slightly rounded corners
        fontSize: '12px',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease, transform 0.2s ease',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    
    toggleButtonHover: {
        backgroundColor: '#45a049', // Darker green on hover
        transform: 'scale(1.05)', // Slightly enlarge on hover
    },
    statusLabel: {
        position: "absolute",
        top: "10px",
        right: "10px",
        color: "#fff",
        fontSize: "0.9em",
        fontWeight: "bold",
        padding: "5px 10px",
        borderRadius: "12px",
        textTransform: "uppercase",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
    },
    popupOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    popupContainer: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
        width: '400px',
        textAlign: 'center',
    },
    inputField: {
        width: '95%',
        padding: '10px',
        margin: '10px 0',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '20px',
    },
    cancelButton: {
        padding: '10px 20px',
        backgroundColor: '#ddd',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    submitButton: {
        padding: '10px 20px',
        backgroundColor: '#4CAF50',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    errorText: {
        color: 'red',
        fontSize: '14px',
        marginTop: '10px',
    },
    
    
};

