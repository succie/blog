import React from "react";
import { Route, Switch } from "react-router-dom";
import Index from "./Index/Index";
import Article from "./Article/Article";

const Pages = () => {
  return (
    <div className="Pages">
      <Switch>
        <Route path="/" exact component={Index} />
        <Route path="/:genre/:title" exact component={Article} />
      </Switch>
    </div>
  );
};

export default Pages;
