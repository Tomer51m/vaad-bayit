import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "./Auth";

function PrivateRoute({ children, component, ...rest }) {
  console.log("protected route children:", children)
  console.log("protected route component:", children)
  return (
    <Route
      {...rest}
      render={props => {
        if (auth.isAuthenticated()) {
          return children;
        } else {
          console.log('@@@GIL redirecting to login')
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
