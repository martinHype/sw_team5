const styles = {
    formContainer: {
        maxWidth: '600px',
        margin: '20px auto',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        backgroundColor: '#fff',
    },
    formGroup: {
        marginBottom: '15px',
    },
    label: {
        display: 'block',
        marginBottom: '5px',
        fontWeight: 'bold',
    },
    input: {
        width: '100%',
        padding: '8px',
        marginBottom: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
    button: {
        padding: '10px 15px',
        backgroundColor: '#00A357',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        margin: '0 auto',
        display: 'block',
    },
    categoryInputContainer: {
        display: 'flex',
        gap: '10px',
        alignItems: 'center',
    },
    categoryList: {
        listStyleType: 'none',
        padding: 0,
        margin: '10px 0',
    },
    categoryItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '8px',
        padding: '8px',
        backgroundColor: '#f9f9f9',
        border: '1px solid #ddd',
        borderRadius: '4px',
    },
    removeButton: {
        padding: '4px 8px',
        backgroundColor: '#FF4C4C',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '12px',
    },
    addButton: {
        padding: '10px 15px',
        backgroundColor: '#007BFF',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
    },
    suggestions: {
        listStyleType: 'none',
        padding: '0',
        margin: '5px 0',
        backgroundColor: '#fff',
        border: '1px solid #ccc',
        borderRadius: '4px',
        maxHeight: '150px',
        overflowY: 'auto',
    },
    suggestionItem: {
        padding: '8px',
        cursor: 'pointer',
    },
    suggestionItemHover: {
        backgroundColor: '#f0f0f0',
    },
    textarea: {
        width: '100%',
        minHeight: '100px', // Minimum height for the textarea
        padding: '8px',
        marginBottom: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        resize: 'vertical', // Allow the user to resize the height
        fontFamily: 'inherit', // Match the font of the input fields
        fontSize: '14px',
    },

};

export default styles;
