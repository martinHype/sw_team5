const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
    },
    formWrapper: {
        maxWidth: '300px',
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        overflow: 'hidden',
        transition: 'height 0.5s ease, transform 0.5s ease',
    },
    login: {
        minHeight: '250px',
    },
    register: {
        minHeight: '450px',
    },
    logo: {
        marginBottom: '20px',
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#aaa',
        padding:'5px',
        backgroundColor: '#f2f2f2',
        borderRadius: '5px',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        gap:'1px'
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
    input_error: {
        marginBottom: '15px',
        padding: '10px',
        fontSize: '16px',
        border: '1px solid red',
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
    error_message:{
        color: 'red',
        marginTop: '10px',
        textAlign: 'center'
    },
    img: {
        maxWidth: '70px',
        maxHeight: '70px',
    },
    text: {
        fontSize: '18px', // Adjust text size
        fontWeight: 'bold',
        color: '#333', // Adjust text color
        textAlign: 'center',
    },
    select: {
        width: '100%',
        padding: '10px',
        marginBottom: '15px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        fontSize: '16px',
        backgroundColor: '#fff',
    },
    inputContainer: {// Enables positioning of the eye icon
        position: "relative", // For positioning the icon
        width: "100%", // Ensure the container spans the full width
        display: "flex", // Ensures proper layout
        flexDirection: "column",
    },
    eyeIcon: {
        position: "absolute",
        right: "10px",
        top: "40%",
        transform: "translateY(-50%)",
        cursor: "pointer",
        width: "20px", // Adjust the icon size
        height: "20px",
    },
    passwordInput:{
        width: "100%", // Input field spans the full width
        padding: "10px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        fontSize: "16px",
        boxSizing: "border-box", // Ensures padding doesn't affect width
    }
};

export default styles;