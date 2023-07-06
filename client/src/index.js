import { Auth0Provider } from '@auth0/auth0-react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import Provider from './context/StateContext';
import 'swiper/css/bundle';

const { REACT_APP_AUTH0_DOMAIN, REACT_APP_AUTH0_CLIENTID } = process.env;
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Auth0Provider
    domain={REACT_APP_AUTH0_DOMAIN}
    clientId={REACT_APP_AUTH0_CLIENTID}
    // redirectUri={window.location.origin}
  >
    <Provider>
      <App />
    </Provider>
  </Auth0Provider>
  // </React.StrictMode>
);
