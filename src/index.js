import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 
    <Auth0Provider 
      domain='dev-kvadgzfb.us.auth0.com' 
      clientId='WbMlEyljryoJF9xogY6Q25iPmB2oZdDM' 
      redirectUri={window.location.origin}
    >
    <App />
    </Auth0Provider>
 
);
