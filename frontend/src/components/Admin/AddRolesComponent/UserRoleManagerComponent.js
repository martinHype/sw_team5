// src/components/UserRoleManager.js
import React, { useState, useEffect } from "react";
import axios from "axios";
//import { Container, Card, Title, Email, CheckboxContainer } from "./styles";

const UserRoleManager = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const token = sessionStorage.getItem("authToken");

    // Fetch users with roles
    useEffect(() => {
        if (!token) {
            setError("Authorization token not found. Please log in again.");
            return;
        }

        axios
            .get("http://localhost:8080/api/admin/all-users", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => setUsers(response.data))
            .catch((error) => {
                console.error("Failed to fetch users:", error);
                setError("Failed to load user data. Please try again later.");
            });
    }, [token]);
    // Update user roles
    const updateUserRole = (userId, role, isAssigned) => {
        if (!token) {
            setError("Authorization token not found. Please log in again.");
            return;
        }
        axios
            .patch(
                `http://localhost:8080/api/admin/users/${userId}/roles`,
                { role, isAssigned },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            )
            .then(() => {
                console.log(`Role ${role} updated for user ${userId}`);
                // Optionally, refetch users to reflect updated roles
                setUsers((prevUsers) =>
                    prevUsers.map((user) =>
                        user.id === userId
                            ? {
                                ...user,
                                roles: isAssigned
                                    ? [...user.roles, role]
                                    : user.roles.filter((r) => r !== role),
                            }
                            : user
                    )
                );
            })
            .catch((error) => {
                console.error("Failed to update role:", error);
                setError(`Failed to update role: ${role}`);
            });
    };

    // Handle checkbox change
    const handleCheckboxChange = (userId, role, event) => {
        updateUserRole(userId, role, event.target.checked);
    };

    return (
        /*<Container>
            {error && <div style={{ color: "red", marginBottom: "20px" }}>{error}</div>}
            {users.map((user) => (
                <Card key={user.id}>
                    <Title>{user.firstname} {user.lastname}</Title>
                    <Email>{user.email}</Email>
                    <CheckboxContainer>
                        <label>
                            <input
                                type="checkbox"
                                checked={user.roles.includes("Admin")}
                                onChange={(e) => handleCheckboxChange(user.id, "Admin", e)}
                            />
                            Admin
                        </label>
                    </CheckboxContainer>
                    <CheckboxContainer>
                        <label>
                            <input
                                type="checkbox"
                                checked={user.roles.includes("Recenzent")}
                                onChange={(e) => handleCheckboxChange(user.id, "Recenzent", e)}
                            />
                            Recenzent
                        </label>
                    </CheckboxContainer>
                </Card>
            ))}
        </Container>*/
        "Hello"
    );
};

export default UserRoleManager;
