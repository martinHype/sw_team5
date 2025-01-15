import React from 'react';
import Navbar from '../../components/NavbarComponent/Navbar.js';
import ProfileComponent from "../../components/ProfileComponent/ProfileComponent";


const ProfileScreen = () => {
    return (
        <div>
            <Navbar />
            <ProfileComponent />
        </div>
    );
};

export default ProfileScreen;