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
    detailCard: {
        backgroundColor: '#D9D9D9', // Light gray background
        padding: '20px',
        borderRadius: '10px', // Rounded corners
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Optional shadow for depth
        marginBottom: '20px',
    },
    buttons: {
        display: 'flex',
        justifyContent: 'start',
        gap: '10px',
    },
    button: {
        padding: '10px 15px',
        backgroundColor: '#00A357',
        color: '#fff',
        border: 'none',
        borderRadius: '5px', // Rounded corners
        cursor: 'pointer',
        fontSize: '16px',
        transition: 'background-color 0.3s ease',
    },
    buttonHover: {
        backgroundColor: '#002a17', // Darker blue for hover effect
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
