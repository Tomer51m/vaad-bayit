import React, { useState } from "react";
import "./resident.scss";

function Resident({ user, handleDelete, handleEditUser }) {
  const [isActive, setIsActive] = useState("");
  console.log("user", user);
  user = user[0];
  return (
    <div className="resident-container">
      <h2 className="resident-title">
        {user.first_name} {user.last_name}
      </h2>
      <div className={`resident-subItem ${isActive}`}>
        <span>Apartment: {user.apartment_number}</span>
        <span>Floor: {user.floor_number}</span>
        <span>Status: {user.is_owner ? "Owner" : "Renting"}</span>
        <button className="resident-subItem_button" onClick={() => handleEditUser(user)}>
          Edit
        </button>
        <button
          className="resident-subItem_button bg-warning"
          onClick={() => handleDelete(user.res_id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default Resident;
