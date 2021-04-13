import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import * as ROUTES from "../../routes";

function ProtectedRoute({ ...props }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated ? (
    <Route {...props} />
  ) : (
    <Redirect to={ROUTES.LOGIN} />
  );
}

export default ProtectedRoute;
