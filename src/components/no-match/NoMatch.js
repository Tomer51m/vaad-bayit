import React from "react";

function NoMatch({ location }) {
  return <div>Path to {location.pathname} leads nowhere...</div>;
}

export default NoMatch;
