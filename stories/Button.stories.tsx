import React from "react";
import { storiesOf } from "@storybook/react";
import Button from "../src/modules/Button/Button";
import "../src/index.css";

storiesOf("Button", module).add("default", () => (
  <Button>default</Button>
));
