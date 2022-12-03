import { Auth0Provider } from '@auth0/auth0-react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import Provider from './context/StateContext';
import 'swiper/css/bundle';

// const domain = process.env.REACT_APP_AUTH0_DOMAIN;
// const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Auth0Provider
    domain='dev-l5g55ixfwmv0k503.us.auth0.com'
    clientId='OjCum0xKv3BOxRkCA2klaU3S0UspFjfR'
    redirectUri={window.location.origin}
  >
    <Provider>
      <App />
    </Provider>
  </Auth0Provider>
  // </React.StrictMode>
);
