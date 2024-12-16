const styles = {
    navbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#00A357', // Zelená farba z návrhu
        padding: '10px 20px',
        color: '#fff',
    },
    logo: {
        marginBottom: '0', // Remove bottom margin to fit better in the navbar
        fontSize: '18px', // Reduce font size for the text
        fontWeight: 'bold',
        color: '#aaa',
        padding: '2px 5px', // Smaller padding for a compact look
        backgroundColor: '#f2f2f2',
        borderRadius: '5px',
        display: 'flex',
        flexDirection: 'row', // Align image and text in a row for horizontal layout
        alignItems: 'center', // Center items vertically
        gap: '5px', // Adjust spacing between image and text
    },
    text: {
        fontSize: '14px', // Smaller text size
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },
    img: {
        width: '30px', // Smaller width for the image
        height: '30px', // Smaller height for the image
        objectFit: 'contain', // Ensure the image maintains its aspect ratio
    },
    navLinks: {
        display: 'flex',
        gap: '20px',
    },
    link: {
        textDecoration: 'none',
        color: '#fff',
        fontWeight: '500',
    },
    icons: {
        display: 'flex',
        gap: '15px',
    },
    icon: {
        fontSize: '20px',
        cursor: 'pointer',
    },
};

export default styles;
