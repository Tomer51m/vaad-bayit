import React, { useState } from "react";
import "./resident.scss";

function Resident({ building, handleDelete, handleEditUser }) {
  console.log("1", building)
  const [isActive, setIsActive] = useState("");
  building = building[0];
  return (
    <div className="resident-container">
      <h2 className="resident-title">
        {building.city} {building.street}
      </h2>
      <div className={`resident-subItem ${isActive}`}>
        <span>City: {building.city}</span>
        <span>Street: {building.street}</span>
        <span>Number: {building.building_number}</span>
        <button className="resident-subItem_button" onClick={() => handleEditUser(building)}>
          Edit
        </button>
        <button
          className="resident-subItem_button bg-warning"
          onClick={() => handleDelete(building.res_id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default Resident;
