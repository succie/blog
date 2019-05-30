import React from "react";
import { Route, Redirect, RouteProps, RouteComponentProps } from "react-router-dom";

type Props = {
  isLogin: boolean;
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
} & RouteProps;

const PrivateRoute = (props: Props) => {
  const { component: Component, ...rest } = props;

  return (
    <Route
      {...rest}
      render={p => {
        return props.isLogin ? <Component {...p} /> : <Redirect to="/" />;
      }}
    />
  );
};

export default PrivateRoute;
