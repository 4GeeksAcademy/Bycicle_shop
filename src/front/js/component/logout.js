import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext';

function LogoutComponent({ onLogout }) {
    // console.log("LogoutComponent is rendered");
    const navigate = useNavigate();
    const { actions } = useContext(Context);

    const handleLogout = () => {
        console.log("handleLogout is called");
        console.log(navigate);
        actions.logout(navigate);
    };

    return (
        <div>
            <button className="btn-logout" onClick={onLogout}>
                Logout
            </button>
        </div>
    );
}

export default LogoutComponent;
