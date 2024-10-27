import React from 'react';
import '../css/header.css'
function Btn() {
  return (
    <div className="btn">Order Online</div>
  )
}
function Logo() {
  return (
    <div className="logo">
      <img src="PIZZA.png" className="content" />
    </div>
  )
}
function NavItem(props) {
  return (
    <div className="navItem">
      <div className="content">{props.name} </div>
    </div>
  )
}
function Header() {
  return (
    <div className="container">
      <div className="header">
        <div className="contain">
          <Logo />
          <div className="navItems">
            <NavItem name={'Home'} />
            <NavItem name={'Menu'} />
            <NavItem name={'Blog'} />
            <NavItem name={'About'} />
          </div>
          <Btn />
        </div>
      </div>
    </div>
  )
}

export default Header 