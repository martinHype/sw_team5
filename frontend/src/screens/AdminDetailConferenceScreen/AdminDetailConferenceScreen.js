import React from 'react';
import Navbar from '../../components/NavbarComponent/Navbar.js';
import ConferenceDetailComponent from "../../components/Admin/DetailConferenceComponent/ConferenceDetailComponent.js";

const AdminDetailConference = () => {
    return (
        <div>
            <Navbar />
            <ConferenceDetailComponent />
        </div>
    );
};

export default AdminDetailConference;