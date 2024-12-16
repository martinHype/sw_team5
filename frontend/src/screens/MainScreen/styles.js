export const styles = {
    container: {
        minHeight: '100vh',
        backgroundColor: 'white',
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
        maxWidth: '48rem',
        margin: '0 auto',
        padding: '2rem 1rem',
    },
    sectionTitle: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        marginBottom: '1.5rem',
    },
    dropdown: {
        position: 'relative',
    },
    dropdownButton: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem',
        textAlign: 'left',
        border: '1px solid #e2e8f0',
        borderRadius: '0.5rem',
        backgroundColor: 'white',
        transition: 'background-color 0.2s',
    },
    dropdownButtonHover: {
        backgroundColor: '#f7fafc',
    },
    dropdownButtonText: {
        fontSize: '1.25rem',
        fontWeight: 'semibold',
    },
    dropdownIcon: {
        width: '1.5rem',
        height: '1.5rem',
        transition: 'transform 0.2s',
    },
    dropdownIconOpen: {
        transform: 'rotate(180deg)',
    },
    dropdownMenu: {
        position: 'absolute',
        width: '100%',
        marginTop: '0.5rem',
        backgroundColor: 'white',
        border: '1px solid #e2e8f0',
        borderRadius: '0.5rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        zIndex: 10,
    },
    dropdownMenuItem: {
        padding: '1rem',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
    },
    dropdownMenuItemHover: {
        backgroundColor: '#f7fafc',
    },
    conferenceBox: {
        marginTop: '1rem',
        padding: '1rem',
        border: '1px solid #e2e8f0',
        borderRadius: '0.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    conferenceName: {
        fontSize: '1.25rem',
        fontWeight: 'semibold',
    },
    uploadButton: {
        padding: '0.5rem 1rem',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '0.25rem',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
    },
    uploadButtonHover: {
        backgroundColor: '#45a049',
    },
};

