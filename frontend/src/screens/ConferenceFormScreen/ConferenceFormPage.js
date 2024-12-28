import React from 'react';
import Navbar from '../../components/NavbarComponent/Navbar.js';
import ConferenceForm from '../../components/Admin/ConferenceFormComponent/ConferenceForm.js';

const ConferenceFormPage = ({ isEditMode = false }) => {
    return (
        <div>
            <Navbar />
            <ConferenceForm isEditMode={isEditMode}/>
        </div>
    );
};

export default ConferenceFormPage;
