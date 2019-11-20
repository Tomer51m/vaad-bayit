import React from "react";
import "./residentsPage.scss";

import ResidentsList from "../../components/residentList/ResidentsList";

function ResidentsPage() {
  return (
    <div className="residents-page">
      <h2>Residents page</h2>
      <p>Here you can view add and edit residents</p>
      <ResidentsList />
    </div>
  );
}

export default ResidentsPage;
