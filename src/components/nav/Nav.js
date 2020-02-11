import React from "react";
import "./nav.scss";
import { Link, useRouteMatch } from "react-router-dom";
import { setAuthentication } from "../../Auth";
import history from "../../history";

function Nav() {
  console.log("rendering nav");
  let { url } = useRouteMatch();
  return (
    <div className="header-container">
      <div className="header-logo">
        <Link to="/">Vaad Bayit</Link>
      </div>
      <nav className="nav" role="navigation">
        <li className="list-item">
          <Link to={`${url}/residents`}>Residents</Link>
        </li>
        <li className="list-item">
          <Link to={`${url}/add`}>Add Resident</Link>
        </li>
        <button
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

export default Nav;
