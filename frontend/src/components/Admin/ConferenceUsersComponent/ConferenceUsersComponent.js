import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './styles'; // Import your styles

const ConferenceUsersComponent = ({ conferenceId }) => {
    const { id } = useParams();
    const [conference, setConference] = useState(null);
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchConferenceAndUsers = async () => {
            const token = sessionStorage.getItem('authToken');
            setIsLoading(true);
            setError(null);

            try {
                // Fetch conference details
                const conferenceResponse = await axios.get(`http://localhost:8080/api/admin/get-event-detail/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                // Fetch registered users
                const usersResponse = await axios.get(`http://localhost:8080/api/admin/conference/${id}/users`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                // Fetch available roles
                const rolesResponse = await axios.get(`http://localhost:8080/api/admin/roles`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setConference(conferenceResponse.data.data);
                setUsers(Object.values(usersResponse.data));
                setRoles(Object.values(rolesResponse.data));
            } catch (error) {
                console.error('Error fetching data:', error.response?.data || error.message);
                setError('Nepodarilo sa načítať údaje.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchConferenceAndUsers();
    }, [conferenceId]);

    const handleRoleChange = async (userId, newRole) => {
        const token = sessionStorage.getItem('authToken');

        try {
            await axios.post(
                `http://localhost:8080/api/users/${userId}/assign-role`,
                { role: newRole, conferenceId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            alert('Rola bola úspešne zmenená.');
        } catch (error) {
            console.error('Error assigning role:', error.response?.data || error.message);
            alert('Pri zmene roly nastala chyba.');
        }
    };

    if (isLoading) {
        return (
            <div style={styles.loaderContainer}>
                <div style={styles.loader}></div>
            </div>
        );
    }

    if (error) {
        return <div style={styles.error}>{error}</div>;
    }

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>{conference.event_name}</h2>

            {/* TODO dropdown nemá mať žiadnu hodnotu ak nema priradenu rolu
                    medzi menom a Dropdown ma byt space-between
             */}
            <div style={styles.usersList}>
                {users.map((user) => (
                    <div style={styles.userCard}>
                        {/* User's Name with Dropdown */}
                        <div style={styles.userDetails}>
                            <p style={styles.userName}>
                                <strong>{user.firstname} {user.lastname}</strong>
                            </p>
                            <select
                                id={`role-${user.iduser}`}
                                value={user.role ? user.role.role_name : ''} // Show role name or empty if no role
                                onChange={(e) => handleRoleChange(user.iduser, e.target.value)}
                                style={styles.dropdownSmall}
                            >
                                <option value="">Prideliť rolu</option>
                                {roles.map((role) => (
                                    <option key={role.idrole} value={role.role_name}>
                                        {role.role_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default ConferenceUsersComponent;
