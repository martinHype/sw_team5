import React from 'react';
import Navbar from '../../components/NavbarComponent/Navbar.js';
import ConferenceUsersComponent from "../../components/Admin/ConferenceUsersComponent/ConferenceUsersComponent.js";

const ConferenceUserScreen = () => {
    return (
        <div>
            <Navbar />
            <ConferenceUsersComponent />
        </div>
    );
};

export default ConferenceUserScreen;