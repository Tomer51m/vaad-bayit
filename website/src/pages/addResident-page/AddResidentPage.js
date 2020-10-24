import React from "react";
import "./addResidentPage.scss";

import ResidentForm from "../../components/residentForm/ResidentForm";

function AddResidentPage() {
  return (
    <div className="residendPage-container">
      <h2>Add Resident</h2>
      <p>Here you can add the residents you want to manage</p>
      <div className="form-container">
        <ResidentForm />
      </div>
    </div>
  );
}

export default AddResidentPage;
