import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { HelmetProvider } from 'react-helmet-async';
import { StoreProvider } from './Store';
import axios from 'axios'

// axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.baseURL = "https://e-shopbackend-0m19.onrender.com"
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <StoreProvider>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </StoreProvider>
);

reportWebVitals();
