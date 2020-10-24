import React from "react";

function NoMatch({ location }) {
  return <div>
    <h2>404 - OOPS...</h2>
    <p>Path to {location.pathname} leads nowhere...</p>
    </div>;
}

export default NoMatch;
