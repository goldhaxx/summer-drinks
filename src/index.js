// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga4';
import App from './App';
import './index.css';

// Initialize Google Analytics 4
ReactGA.initialize('G-QHLK36HFG7');

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
