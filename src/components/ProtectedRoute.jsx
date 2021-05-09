import React from "react";
import { Redirect, Route } from "react-router";
import { useAuthState } from "../context/auth";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useAuthState();
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated) return <Component {...props} />;
        return (
          <Redirect
            to={{
              pathname: "/",
              state: {
                from: props.location,
              },
            }}
          />
        );
      }}
    />
  );
};
