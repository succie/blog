import React from "react";
import { storiesOf } from "@storybook/react";
import List from "../src/modules/List/List";
import ListItem from "../src/modules/ListItem/ListItem";
import "../src/index.css";

storiesOf("List", module).add("default", () => (
  <List>
    <ListItem>aaaa</ListItem>
    <ListItem>bbbb</ListItem>
    <ListItem>cccc</ListItem>
  </List>
));
