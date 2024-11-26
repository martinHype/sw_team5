import React from "react";

const MainScreen = () => {

    return (
        <div>
            <h1>Welcome to the Main Screen</h1>
            <button onClick={handleLogout} style={{ padding: "10px 20px", marginTop: "20px", cursor: "pointer" }}>
                Logout
            </button>
        </div>
    );
};

export default MainScreen;
