const styles = {
    container: {
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
    },
    heading: {
        textAlign: 'center',
        fontSize: '24px',
        marginBottom: '20px',
    },
    noData: {
        textAlign: 'center',
        fontSize: '18px',
        color: 'gray',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    tableHeader: {
        backgroundColor: '#f4f4f4',
        fontWeight: 'bold',
        border: '1px solid #ddd',
        padding: '8px',
        textAlign: 'left',
    },
    tableCell: {
        border: '1px solid #ddd',
        padding: '8px',
    },
    error: {
        color: 'red',
        textAlign: 'center',
        fontSize: '18px',
    },
    loaderContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Loader bude centrovaný vertikálne aj horizontálne
    },
    loader: {
        width: '50px',
        height: '50px',
        border: '5px solid rgba(0, 0, 0, 0.1)',
        borderRadius: '50%',
        borderTop: '5px solid #3498db', // Farba horného pásu
        animation: 'spin 1s ease-in-out infinite', // Animácia otáčania
    },
};

export default styles;
