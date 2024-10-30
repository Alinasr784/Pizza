import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './js/header'
import Landing from './js/landing'
import Apps from './js/apps'
import CardPage from './js/cards'
import Shop from './js/shop'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header />
    <Landing />
    <Apps />
    <CardPage />
    <Shop/>
  </React.StrictMode>
);