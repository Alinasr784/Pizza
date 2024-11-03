import React from "react";
import { useNavigate } from "react-router-dom";
if (window.innerWidth > 599) {
  import("../css/header-tablet.css");
} else {
  import("../css/header-phone.css");
}
function Btn() {
  const navigate = useNavigate();
  return (
    <div
      className="btn"
      onClick={() => {
        navigate("/menu");
      }}
    >
      Order Online
    </div>
  );
}
function Logo() {
  return (
    <div className="logo">
      <img src="PIZZA.png" className="content" />
    </div>
  );
}
function NavItem(props) {
  return (
    <div className="navItem">
      <div className="content" onClick={props.onClick}>
        {props.name}{" "}
      </div>
    </div>
  );
}
function Header() {
  const navigate = useNavigate();
  const handleMenuClick = (path) => {
    navigate(path);
  };
  const headerDes = () => {
    if (window.innerWidth > 599) {
      return (
        <div>
          <div className="container">
            <div className="header">
              <div className="contain">
                <Logo />
                <div className="navItems">
                  <NavItem
                    name={"Home"}
                    onClick={() => {
                      handleMenuClick("/");
                    }}
                  />
                  <NavItem
                    name={"Menu"}
                    onClick={() => {
                      handleMenuClick("/menu");
                    }}
                  />
                  <NavItem name={"Blog"} />
                  <NavItem name={"About"} />
                </div>
                <Btn />
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <Logo />
          <div className="container">
            <div className="header">
              <div className="contain">
                <div className="navItems">
                  <NavItem
                    name={"Home"}
                    onClick={() => {
                      handleMenuClick("/");
                    }}
                  />
                  <NavItem
                    name={"Menu"}
                    onClick={() => {
                      handleMenuClick("/menu");
                    }}
                  />
                  <NavItem name={"Blog"} />
                  <NavItem name={"About"} />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  return <div>{headerDes()}</div>;
}

export default Header;
