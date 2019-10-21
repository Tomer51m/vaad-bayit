import React, { useState } from "react";
import "./resident.css";

function Resident({ user, handleDelete, handleEditUser }) {
  const [isActive, setIsActive] = useState("");
  return (
    <div className="user">
      <button
        className="users_item users_title"
        onClick={() =>
          isActive === "" ? setIsActive("active") : setIsActive("")
        }
      >
        {user.first_name} {user.last_name}
      </button>
      <div className={`users_subItem ${isActive}`}>
        <span>Apartment: {user.apartment_number}</span>
        <span>Floor: {user.floor_number}</span>
        <span>Status: {user.is_owner ? "Owner" : "Renting"}</span>
        <button className="subItem_button" onClick={() => handleEditUser(user)}>Edit</button>
        <button
          className="subItem_button bg-warning"
          onClick={() => handleDelete(user.res_id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default Resident;
