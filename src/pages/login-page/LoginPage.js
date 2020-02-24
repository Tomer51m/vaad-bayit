import React from "react";
import "./loginPage.scss";

import history from "../../history";
import LoginForm from "../../components/login-form/LoginForm";

function LoginPage() {
  function handleClick(e) {
    e.preventDefault()
    history.push("/signup");
  }
  return (
    <div className="loginPage-container">
      <h1>Welcome to Vaad Bayit app</h1>
      <div className="form-container">
        <LoginForm />
      </div>
      <p>
        Don't have an account?{" "}
        <a href="#" onClick={handleClick}>
          signup
        </a>
      </p>
    </div>
  );
}

export default LoginPage;
