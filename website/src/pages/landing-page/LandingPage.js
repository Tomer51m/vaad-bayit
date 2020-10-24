import React from "react";
import "./landingPage.scss";
import { Link } from "react-router-dom";
import LoginForm from "../../components/login-form/LoginForm";

function LandingPage() {
  return (
    <div className="landingPage-container">
      <div className="form-section">
        <h2>Welcome to Vaad Bayit</h2>
        <div className="form">
          <LoginForm />
        </div>
        <p>
          Don't have an account? <Link to="/signup">signup</Link>
        </p>
      </div>
      <div className="visual-section"></div>
    </div>
  );
}

export default LandingPage;
