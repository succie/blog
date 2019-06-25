import React from "react";
import { Route, Switch } from "react-router-dom";
import Page from "../components/Page/Page";
import Index from "./Index/Index";
import SignIn from './SignIn/SignIn';
import Article from "./Article/Article";

const Pages = () => {
  return (
    <Page>
      <Switch>
        <Route path="/" exact component={Index} />
        <Route path='/signin' component={SignIn} />
        <Route path="/:genre/:title" exact component={Article} />
      </Switch>
    </Page>
  );
};

export default Pages;
