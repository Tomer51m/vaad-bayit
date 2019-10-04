import React, { useState } from "react";
import "./resident.css";

function Resident({ user, handleDelete }) {
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
        <button className="subItem_button">edit</button>
        <button
          className="subItem_button bg-warning"
          onClick={e => handleDelete(user.res_id)}
        >
          DELETE
        </button>
      </div>
    </div>
  );
}

export default Resident;
