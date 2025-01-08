import React from 'react';
import Navbar from '../../components/NavbarComponent/Navbar.js';
import UserRoleManager from "../../components/Admin/AddRolesComponent/UserRoleManagerComponent.js";

const ConferenceUserScreen = () => {
    return (
        <div>
            <Navbar />
            <UserRoleManager />
        </div>
    );
};

export default ConferenceUserScreen;