import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <div className="footer">
      <br className="br" />
      <div className="footer-top">
        <img src={assets.app_store} alt="" />
        <img src={assets.play_store} alt="" />
      </div>
      <div className="footer-buttom">
        <div className="footer-left">
          <div className="footer-left-images">
            <img src={assets.facebook_icon} alt="facebook icon" />
            <p>Facebook</p>
          </div>
          <div className="footer-left-images">
            <img src={assets.twitter_icon} alt="twitter icon" />
            <p>Twitter</p>
          </div>
          <div className="footer-left-images">
            <img src={assets.linkedin_icon} alt="linkedin icon" />
            <p>Linkedin</p>
          </div>
        </div>
        <div className="footer-middle">
            <h3>COMPANY</h3>
            <p>Home</p>
            <p>About us</p>
            <p>FAQ</p>
        </div>
        <div className="footer-right">
          <p>Contact Us.</p>
          <p>+012 345 678</p>
          <p>tomato@tomato.com</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
