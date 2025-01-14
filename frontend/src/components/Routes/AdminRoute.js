import React from "react";
import { Navigate } from "react-router-dom";

// Helper function to check if the user has the "Admin" role
const userHasAdminRole = () => {
    try {
        // Get the user roles from sessionStorage
        const userRoles = sessionStorage.getItem("userRoles");
        if (!userRoles) return false; // If no roles found, return false

        // Split roles into an array and trim whitespace
        const rolesArray = userRoles.split(",").map(role => role.trim());
        return rolesArray.includes("admin"); // Check if "Admin" is present
    } catch (error) {
        console.error("Error checking user roles:", error);
        return false; // Return false if an error occurs
    }
};

const AdminRoute = ({ children }) => {
    const token = sessionStorage.getItem("authToken"); // Check if the auth token exists

    // Redirect if no token or the user does not have the "Admin" role
    if (!token || !userHasAdminRole()) {

        return <Navigate to="/permission" />;
    }

    return children; // Render the children if authenticated and authorized
};

export default AdminRoute;
