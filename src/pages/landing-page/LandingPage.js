import React, { useState, useEffect } from "react";
import "./landingPage.scss";

import SignupForm from "../../components/signup-form/SignupForm";
import LoginForm from "../../components/login-form/LoginForm";

function LandingPage() {
  const [state, setState] = useState({
    component: <LoginForm />,
    urlText: "Don't"
  });

  function handleClick(e) {
    e.preventDefault()
    if (state.urlText == "Don't") {
      setState({
        component: <SignupForm />,
        urlText: null
      });
    } else {
      setState({
        component: <LoginForm />,
        urlText: "Don't"
      });
    }
  }

  return (
    <div className="landingPage-container">
      <div className="form-section">
        <h2>Welcome to Vaad Bayit</h2>
        <div className="form">{state.component}</div>
        <p>
          Don't have an account?{" "}
          <a href="#" onClick={handleClick}>
            signup
          </a>
        </p>
      </div>
      <div className="visual-section"></div>
    </div>
  );
}

export default LandingPage;
