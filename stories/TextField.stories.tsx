import React from "react";
import { storiesOf } from "@storybook/react";
import TextField from "../src/modules/TextField/TextField";
import "../src/index.css";

storiesOf("TextField", module).add("default", () => (
  <TextField placeholder="Placeholder" />
));
