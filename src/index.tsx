import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AuthService from './service/authService';
import DbService from './service/dbService';
import ImageUploader from './service/ImageUploader';

const authService = new AuthService();
const dbService = new DbService();
const imageUploader = new ImageUploader();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App
      authService={authService}
      dbService={dbService}
      imageUploader={imageUploader}
    />
  </React.StrictMode>
);
