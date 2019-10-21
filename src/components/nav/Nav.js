import React from "react";
import "./nav.scss";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <div className="header-container">
      <div className="header-logo">
        <Link to="/">Vaad Bayit</Link>
      </div>
      <nav className="nav" role="navigation">
        <li className="list-item">
          <Link to="/residents">Residents</Link>
        </li>
        <li className="list-item">
          <Link to="/add">Add Resident</Link>
        </li>
        <li className="list-item">
          <Link to="/login">Login component</Link>
        </li>
        <li className="list-item">
          <Link to="/signup">Signup component</Link>
        </li>
      </nav>
    </div>
  );
}

export default Nav;
