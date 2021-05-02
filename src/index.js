import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter basename='/pennyDAO_official'>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
