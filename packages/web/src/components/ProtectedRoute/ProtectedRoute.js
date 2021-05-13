import React from "react";
import { bool } from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import * as ROUTES from "../../routes";

function ProtectedRoute({
  isFetchAllSuccess,
  isFetchPopularSuccess,
  playlistsFetched,
  usersFetched,
  genresFetched,
  ...props
}) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  if (
    isAuthenticated &&
    (!isFetchAllSuccess ||
      !isFetchPopularSuccess ||
      !playlistsFetched ||
      !usersFetched ||
      !genresFetched)
  ) {
    return null;
  }
  return isAuthenticated ? (
    <Route {...props} />
  ) : (
    <Redirect to={ROUTES.LOGIN} />
  );
}

ProtectedRoute.propTypes = {
  isFetchAllSuccess: bool.isRequired,
  isFetchPopularSuccess: bool.isRequired,
  playlistsFetched: bool.isRequired,
  usersFetched: bool.isRequired,
  genresFetched: bool.isRequired,
};

export default ProtectedRoute;
