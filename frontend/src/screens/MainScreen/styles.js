export const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f5f5f5',
        width: '100%', // Ensures full screen width
        margin: 0, // No extra margins
    },
    contentWrapper: {
        display:'flex',
        flexDirection: 'column',
        maxWidth: '900px', // Set the same max width for alignment
        width: '100%',      // Allow full expansion
        margin: '0 auto',   // Center the content horizontally
        padding: '0 20px',  // Consistent padding on both sides

    },
    header: {
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '1rem',
        textAlign: 'center',
    },
    headerTitle: {
        fontSize: '1.5rem',
        fontWeight: 'semibold',
    },
    main: {
        flex:1,
        width: '100%',      // Stretch within the contentWrapper
        backgroundColor: '#fff',
        padding: '5px 30px',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
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
        margin: '10px 0 20px', // Add spacing between title and main part
        borderRadius: '8px',
        border: '1px solid #ccc',
        fontSize: '16px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        boxSizing: 'border-box', // Prevent padding from affecting width
    },
    
    
};

