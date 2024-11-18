import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
    const token = sessionStorage.getItem("authToken"); // Check if token exists
    return token ? <Navigate to="/home" /> : children; // Redirect authenticated users to main
};

export default PublicRoute;