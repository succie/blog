import React from "react";
import {
  Route,
  Redirect,
  RouteProps,
  RouteComponentProps
} from "react-router-dom";
import { firebaseAuth } from "../../utils/firebase";

type ExternalProps = {
  component:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>;
};

type Props = RouteProps & ExternalProps;

const PrivateRoute = (props: Props) => {
  const { component: Component, ...rest } = props;

  const isSignin = !!firebaseAuth.currentUser;

  return (
    <Route
      {...rest}
      render={p => {
        return isSignin ? <Component {...p} /> : <Redirect to="/login" />;
      }}
    />
  );
};

export default PrivateRoute;
