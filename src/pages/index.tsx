import React from "react";
import { Route, Switch } from "react-router-dom";
import classnames from "classnames";
import { connect } from "react-redux";
import { RootState } from "../store";
import Index from "./Index/Index";
import Article from "./Article/Article";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import SignIn from "./SignIn/SignIn";
import Admin from "./Admin/Admin";
import "./index.css";

const mapStateToProps = (state: RootState) => {
  return {
    menu: state.menu,
    isSignIn: state.auth.isSignIn
  };
};

type Props = ReturnType<typeof mapStateToProps>;

const Page = (props: Props) => {
  const cns = classnames("Page", { "is-open-menu": props.menu.isOpen });

  return (
    <div className={cns}>
      <Switch>
        <Route path="/" exact component={Index} />
        <Route path="/signin" component={SignIn} />
        <PrivateRoute
          path="/admin"
          isSignIn={props.isSignIn}
          component={Admin}
        />
        <Route path="/:genre/:title" component={Article} />
      </Switch>
    </div>
  );
};

export default connect(mapStateToProps)(Page);
