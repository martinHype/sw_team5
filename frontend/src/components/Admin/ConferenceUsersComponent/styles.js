const styles = {
    container: {
        padding: '20px',
        maxWidth: '800px',
        margin: '0 auto',
    },
    heading: {
        textAlign: 'center',
        marginBottom: '20px',
        fontSize: '24px',
    },
    usersList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px', // Space between user cards
    },
    userCard: {
        backgroundColor: '#D9D9D9',
        padding: '10px',
        borderRadius: '10px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        alignItems: 'center', // Center align the dropdown with the name
        justifyContent: 'space-between',
    },
    userDetails: {
        display: 'flex',
        alignItems: 'center', // Align name and dropdown in the same row
        gap: '10px', // Add space between name and dropdown
    },
    userName: {
        margin: 0,
        fontSize: '14px',
    },
    dropdownSmall: {
        height: '30px', // Smaller height for dropdown
        fontSize: '12px', // Smaller font for dropdown text
        borderRadius: '5px',
        padding: '4px 8px',
        border: '1px solid #ccc',
    },
    loaderContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    },
    loader: {
        border: '5px solid #f3f3f3',
        borderTop: '5px solid #3498db',
        borderRadius: '50%',
        width: '50px',
        height: '50px',
        animation: 'spin 1s linear infinite',
    },
    error: {
        color: 'red',
        textAlign: 'center',
        fontSize: '18px',
    },
};

export default styles;
