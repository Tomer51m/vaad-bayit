import React from "react";
import "./residentsList.scss";
import { Link } from "react-router-dom";

function ResidentsList({ buildings, users, match, location }) {
  console.log("list", buildings)
  if (!buildings) {
    return <div>loading...</div>;
  } else {
    return (
      <div className="residentList-container">
        <ul className="residentList-list">
          {buildings.map(building => {
            return (
              <li className="residentList-li" key={building.building_id}>
                <Link to={`/home/residents/${building.building_id}`} className="residentLink">
                  {building.city} {building.street} {building.building_number}
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