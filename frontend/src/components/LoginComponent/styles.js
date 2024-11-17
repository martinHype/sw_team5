const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
    },
    formWrapper: {
        width: '300px',
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        overflow: 'hidden',
        transition: 'height 0.5s ease, transform 0.5s ease',
    },
    login: {
        height: '250px',
    },
    register: {
        height: '450px',
    },
    logo: {
        marginBottom: '20px',
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#aaa',
        backgroundColor: '#e0e0e0',
        padding: '10px',
        borderRadius: '5px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    input: {
        marginBottom: '15px',
        padding: '10px',
        fontSize: '16px',
        border: '1px solid #ccc',
        borderRadius: '5px',
    },
    btn: {
        padding: '10px',
        fontSize: '16px',
        fontWeight: 'bold',
        backgroundColor: '#4caf50',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginBottom: '15px',
    },
    link: {
        fontSize: '14px',
        color: '#007bff',
        textDecoration: 'none',
        cursor: 'pointer',
    },
};

export default styles;