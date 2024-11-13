import React, { useState } from "react";
import { assets } from "../../assets/assets";
import "./Signin.css";

const Signin = ({ showSignin, setShowSignin }) => {
  const [username, setName] = useState();
  const [password, setPassword] = useState();
  const [info, setInfo] = useState("Sign Up");
  const [haveAccount, setHaveAccount] = useState(false);
  return (
    <div className="login">
      <form className="login-form">
        <div className="top-section">
          <h2>welcome</h2>
          <button className="top-button" onClick={() => setShowSignin(false)}>X</button>
        </div>
        <div className="login-container">
          <div className="right-section">
            <div className="text">{info}</div>

            <div className="inputs">
              <div className="input">
                <img src={assets.person} alt="" className="img" />
                <input
                  type="text"
                  placeholder="Username"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="input">
                <img src={assets.password} alt="" className="img" />
                <input
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {info === "Register" && (
                <div className="input">
                  <img src={assets.email} alt="" className="img" />
                  <input
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              )}
            </div>
            {haveAccount ? (
              <p className="input-pargraph">
                Already have an account?
                <span
                  onClick={() => {
                    setInfo("Sign Up");
                    setHaveAccount(false);
                  }}
                >
                  Sign Up
                </span>
              </p>
            ) : (
              <p>
                Don't have an account?
                <span
                  onClick={() => {
                    setInfo("Register");
                    setHaveAccount(true);
                  }}
                >
                  Register
                </span>
              </p>
            )}

            <button className="register-button">{info}</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signin;
