import React from 'react';
import Navbar from '../../components/NavbarComponent/Navbar.js';
import ShowAllConferenceComponent from "../../components/Admin/ShowAllConferencesComponent/ShowAllConferenceComponent";

const NewConferencePage = () => {
    return (
        <div>
            <Navbar />
            <ShowAllConferenceComponent />
        </div>
    );
};

export default NewConferencePage;