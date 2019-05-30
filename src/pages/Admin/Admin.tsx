import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import Add from "./Add/Add";
import Edit from "./Edit/Edit";

const Admin = () => {
  return (
    <div className="Admin">
      <h1>Admin page</h1>
      <Link to="/admin/add">ADD</Link>
      <Link to="/admin/edit">EDIT</Link>
      <Switch>
        <Route path="/admin/add" component={Add} />
        <Route path="/admin/edit" component={Edit} />
      </Switch>
    </div>
  );
};

export default Admin;
