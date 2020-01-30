import React from "react";
import "./nav.scss";
import { Link, withRouter } from "react-router-dom";
import auth from "../../Auth";

function Nav(props) {
  console.log("rendering nav");
  console.log("nav props:", props)
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
          <Link to="/signup">Signup component</Link>
        </li>
        <button
          onClick={() => {
            auth.logout();
            props.history.push("/");
          }}
        >
          Logout
        </button>
      </nav>
    </div>
  );
}

export default withRouter(Nav);
