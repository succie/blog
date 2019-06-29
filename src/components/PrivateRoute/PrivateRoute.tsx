import React, { useState, useEffect } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { firebaseAuth } from "../../utils/firebase";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";

type Props = RouteProps;

const PrivateRoute = ({ component: Component, ...rest }: Props) => {
  const [isSignIn, setSignIn] = useState(false);
  const [isFetching, setFetching] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        setSignIn(true);
        dispatch(authActions.confirmSignIn(true));
      } else {
        setSignIn(false);
        dispatch(authActions.confirmSignIn(false));
      }
      setFetching(false);
    });
  }, []);

  return !isFetching ? (
    <Route
      {...rest}
      render={props => {
        if (isSignIn) {
          return Component ? <Component {...props} /> : null;
        } else {
          return (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          );
        }
      }}
    />
  ) : null;
};

export default PrivateRoute;
