import React from "react";
import "./loginPage.scss";

import history from "../../history";
import LoginForm from "../../components/login-form/LoginForm";

function LandingPage() {
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
