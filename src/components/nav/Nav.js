import React from "react";
import "./nav.scss";
import { Link, withRouter } from "react-router-dom";
import { setAuthentication } from "../../Auth";
import history from "../../history";

function Nav({ match }) {
  return (
    <div className="header-container">
      <nav className="nav" role="navigation">
        <div className="header-logo">
          <Link to="/home">Vaad Bayit</Link>
        </div>
        <li className="list-item">
          <Link to={`${match.url}/residents`}>Residents</Link>
        </li>
        <li className="list-item">
          <Link to={`${match.url}/add`}>Add Resident</Link>
        </li>
        <button
          className="logout-button"
          onClick={() => {
            setAuthentication(false);
            history.push("/login");
          }}
        >
          Logout
        </button>
      </nav>
    </div>
  );
}

export default withRouter(Nav);
