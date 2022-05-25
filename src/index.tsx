import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AuthService from './service/authService';
import DbService from './service/dbService';

const authService = new AuthService();
const dbService = new DbService();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App authService={authService} dbService={dbService} />
  </React.StrictMode>
);
