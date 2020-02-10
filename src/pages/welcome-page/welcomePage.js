import React from "react";
import "./welcomePage.scss";
import Login from "../../components/login/Login";

export default function welcomePage() {
  return (
    <div className="welcomePage-container">
      <h2 className="welcomePage-header">Welcom to Vaad-Bayit</h2>
      <p>
        Our mission is to help you manage your residents, <br /> financial
        reports and other tasks.
      </p>
      <Login />
    </div>
  );
}
