const styles = {
    container: {
        padding: '20px',
        maxWidth: '900px',
        margin: '0 auto',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    heading: {
        textAlign: 'center',
        marginBottom: '20px',
        fontSize: '28px',
        color: '#333',
        fontWeight: 'bold',
    },
    articlesList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px', // Space between article cards
    },
    articleCard: {
        backgroundColor: '#ffffff',
        padding: '15px',
        borderRadius: '10px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    articleDetails: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
    articleTitle: {
        margin: 0,
        fontSize: '18px',
        color: '#555',
    },
    dropdownSmall: {
        height: '35px',
        fontSize: '14px',
        borderRadius: '5px',
        padding: '5px 10px',
        border: '1px solid #ccc',
        outline: 'none',
        backgroundColor: '#ffffff',
        transition: 'border-color 0.2s ease-in-out',
    },
    dropdownSmallFocus: {
        borderColor: '#3498db',
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
        color: '#d9534f',
        textAlign: 'center',
        fontSize: '18px',
        padding: '20px',
        backgroundColor: '#f8d7da',
        borderRadius: '8px',
    },
    articleAuthor: {
        fontSize: '14px',
        color: '#555',
        margin: '5px 0',
    },
};

export default styles;
