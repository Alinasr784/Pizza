import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './js/header'
import Landing from './js/landing'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header />
    <Landing />
  </React.StrictMode>
);