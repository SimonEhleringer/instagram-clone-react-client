import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import { ReduxState } from "../store";

const IndexPage = () => {
  const isUserLoggedIn = useSelector(
    (state: ReduxState) => state.authenticationState.isUserLoggedIn
  );

  return !isUserLoggedIn ? <Redirect to="/login" /> : <div>Index</div>;
};

export default IndexPage;
