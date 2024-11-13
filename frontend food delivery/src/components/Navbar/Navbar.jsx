import React, { useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";

const Navbar = ({setShowSignin}) => {
    const [line, setLine] = useState("home");
  return (
    <div className="navbar">
      <img src={assets.logo} alt="" />
      <ul className="menu-list">
        <li onClick={() => setLine("home")} className={line === "home"?"active" : ""}>home</li>
        <li onClick={() => setLine("menu")} className={line === "menu"?"active" : ""}>menu</li>
        <li onClick={() => setLine("mobile-app")} className={line === "mobile-app"?"active" : ""}>mobile-app</li>
        <li onClick={() => setLine("contact-us")} className={line === "contact-us"?"active" : ""}>contact-us</li>
      </ul>
      <div className="navbar-right">
        <div className="basket">
          <img src={assets.basket_icon} alt="" />
          <div className="dot"></div>
        </div>
        <div className="search">
          <img src={assets.search_icon} alt="" />
        </div>
        <button onClick={() => setShowSignin(true)}>sign in</button>
      </div>
    </div>
  );
};

export default Navbar;
