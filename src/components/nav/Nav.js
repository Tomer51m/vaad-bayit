import React from "react";
import "./nav.scss";
import { Link, withRouter } from "react-router-dom";
import history from "../../history";
import { useSelector } from "react-redux";

function Nav({ match }) {
  const { user } = useSelector(state => state.users);
  console.log("nav user", user);
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
        <span className="user-greeting">Hello {user.first_name} {user.last_name}</span>
        <button
          className="logout-button"
          onClick={() => {
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
