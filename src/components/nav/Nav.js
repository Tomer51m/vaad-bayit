import React, { useState } from "react";
import "./nav.scss";
import { Link, withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/actions/userActions";

function Nav({ match }) {
  const dispatch = useDispatch();
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
            dispatch(logout())
          }}
        >
          Logout
        </button>
      </nav>
    </div>
  );
}

export default withRouter(Nav);
