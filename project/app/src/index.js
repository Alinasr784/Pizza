import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // استيراد Router و Routes و Route
import Header from './js/header';
import Landing from './js/landing';
import Apps from './js/apps';
import CardPage from './js/cards';
import Shop from './js/shop';
import FormBold from './js/comOrder'; 
import CartBtn from './js/cartbtn';
import Menu from './js/menu';
const root = ReactDOM.createRoot(document.getElementById('root'));
function Home(){
  return (
    <div>
      <Landing/>
      <Apps />
      <CardPage/>
      <Shop/>
      <CartBtn/>
    </div>
      
  )
}
function Store() {
  return(
  <>
    <Menu/>
    <CartBtn/>
  </>
  )
}
root.render(
  <React.StrictMode>
    <Router> 
      <Header />
      <Routes> 
        <Route path="/" element={<Home />} /> {/* الصفحة الرئيسية */}
        <Route path="/checkout" element={<FormBold />} /> {/* صفحة الدفع */}
        <Route path="/menu" element={<Store />} />
      </Routes>
    </Router>
  </React.StrictMode>
);