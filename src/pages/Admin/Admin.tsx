import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Add from "./Add/Add";
import Edit from "./Edit/Edit";
import "./Admin.css";

const Admin = () => {
  return (
    <div className="Admin">
      <Link className="Admin-ModeChange" to="/admin/add">
        <Button variant="contained">Add</Button>
      </Link>
      <Link className="Admin-ModeChange" to="/admin/edit">
        <Button variant="contained">Edit</Button>
      </Link>
      <Switch>
        <Route path="/admin/add" component={Add} />
        <Route path="/admin/edit" component={Edit} />
      </Switch>
    </div>
  );
};

export default Admin;
