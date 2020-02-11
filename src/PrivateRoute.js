import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "./Auth";

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => {
        if (isAuthenticated()) {
          console.log("redirecting to component");
          return <Component {...props} />;
        } else {
          console.log("redirecting to login");
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          );
        }
      }}
    />
  );
}

export default PrivateRoute;
