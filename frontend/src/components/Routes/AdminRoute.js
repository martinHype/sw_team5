import React from "react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
    const token = sessionStorage.getItem("authToken"); // Check if token exists
    return token ? children : <Navigate to="/" />; // Redirect unauthenticated users to login
};

export default AdminRoute;