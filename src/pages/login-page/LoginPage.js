import React, { useState }from "react";
import "./loginPage.scss";

import { Link, useHistory } from "react-router-dom";

import LoginForm from "../../components/login-form/LoginForm";
import SignupForm from "../../components/signup-form/SignupForm";

function LandingPage() {
    let history = useHistory();
    function handleClick() {
        history.push("/signup")
    }  
  return (
    <div className="landing-container">
      <h1>Welcome to Vaad Bayit app</h1>
      <LoginForm />
      <p>Don't have an account? <a href="#" onClick={handleClick}>signup</a></p>
    </div>
  );
}

export default LandingPage;
