import React from "react";
import { Redirect, Route } from "react-router";
import { useAuthState } from "../context/auth";

export const AuthRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useAuthState();
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated)
          return (
            <Redirect
              to={{
                pathname: "/me",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        return <Component {...props} />;
      }}
    />
  );
};
