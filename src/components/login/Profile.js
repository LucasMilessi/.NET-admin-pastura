import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Dashboard } from '../../pages/Dashboard';
import carga from '../../img/carga.gif'

export const Profile = () => {
    const { user, isAuthenticated, isLoading} = useAuth0();
    if(isLoading){
        return(
        <>
            <img src={carga} />
        </>
        );
    }

    return (
        isAuthenticated && (
            <Dashboard user={ user } />
        )
    );

}