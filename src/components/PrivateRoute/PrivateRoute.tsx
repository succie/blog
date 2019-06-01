import React from "react";
import {
  Route,
  Redirect,
  RouteProps,
  RouteComponentProps
} from "react-router-dom";

type ExternalProps = {
  isSignIn: boolean;
  component:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>;
};

type Props = RouteProps & ExternalProps;

const PrivateRoute = (props: Props) => {
  const { component: Component, ...rest } = props;

  return (
    <Route
      {...rest}
      render={p => {
        return props.isSignIn ? <Component {...p} /> : <Redirect to="/signin" />;
      }}
    />
  );
};

export default PrivateRoute;
