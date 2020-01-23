import React from "react";
import "./residentsList.scss";
import { Link } from "react-router-dom";

function ResidentsList({ users, match, location }) {
  if (!users) {
    return <div>loading...</div>;
  } else {
    return (
      <div className="residentList-container">
        <ul className="residentList-list">
          {users.map(user => {
            return (
              <li className="residentList-li" key={user.res_id}>
                <Link to={`/residents/${user.res_id}`} className="residentLink">
                  {user.first_name} {user.last_name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default ResidentsList;