import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import "../../style/pages/dashboard.css"
import cerrarSesion from "../../img/cerrar-sesion.png"

export const Logout = () => {
    const { logout } = useAuth0();
    return (
        <>
            <img className="imgLogout" src={cerrarSesion} alt='Cerrar Sesión' onClick={() => logout({ returnTo: window.location.origin })} />
        </> 
    );
}
