const styles = {
    container: {
        padding: '20px',
        maxWidth: '800px',
        margin: '0 auto',
    },
    heading: {
        textAlign: 'center',
        marginBottom: '20px',
    },
    filters: {
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '10px', // Add spacing between inputs and button
    },
    input: {
        padding: '8px',
        fontSize: '16px',
        width: '200px',
    },
    button: {
        padding: '10px 15px',
        backgroundColor: '#00A357',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
    },
    conferenceList: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px',
    },
    conferenceItem: {
        padding: '15px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        backgroundColor: '#fff',
        cursor: 'pointer',
        transition: 'box-shadow 0.2s ease',
    },
    noData: {
        textAlign: 'center',
        color: '#999',
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
    },
};

export default styles;
