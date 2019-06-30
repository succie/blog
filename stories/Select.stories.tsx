import React from "react";
import { storiesOf } from "@storybook/react";
import Select from "../src/modules/Select/Select";
import "../src/index.css";

storiesOf("Select", module).add("default", () => (
  <div style={{ width: 128 }}>
    <Select label="test">
      <option>Apple</option>
      <option>bbbb</option>
      <option>cccc</option>
      <option>dddd</option>
    </Select>
  </div>
));
