import React from "react";
import "./signupPage.scss";

import history from "../../history";
import SignupForm from "../../components/signup-form/SignupForm";

function LandingPage() {
  function handleClick() {
    history.push("/login");
  }
  return (
    <div className="landing-container">
      <h1>Welcome to Vaad Bayit app</h1>
      <SignupForm />
      <p>
        Have an account?{" "}
        <a href="#" onClick={handleClick}>
          login
        </a>
      </p>
    </div>
  );
}

export default LandingPage;
