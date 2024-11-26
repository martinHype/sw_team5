import React from "react";
import { useNavigate } from "react-router-dom";

const MainScreen = () => {

    const navigate = useNavigate();
    return (
        <div>
            <h1>Študentská vedecká konferencia</h1>
            <button onClick={() => navigate("/uploadarticle")}>
                Nahrat pracu
            </button>
        </div>
    );
};

export default MainScreen;
