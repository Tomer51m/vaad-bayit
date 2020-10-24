import React from "react";
import "./signupPage.scss";

import history from "../../history";
import SignupForm from "../../components/signup-form/SignupForm";

function SignupPage() {
  function handleClick(e) {
    e.preventDefault();
    history.push("/login");
  }
  return (
    <div className="signupPage-container">
      <h1>Welcome to Vaad Bayit app</h1>
      <div className="form-container">
        <SignupForm />
      </div>
      <p>
        Have an account?{" "}
        <a href="#" onClick={handleClick}>
          login
        </a>
      </p>
    </div>
  );
}

export default SignupPage;
