import { context } from "@xul/core";
import "material-icons/iconfont/material-icons.css";
import React from "react";
import ReactDOM from "react-dom";
import "typeface-roboto";
import { Application } from "./components/Application";
import "./index.css";
const rc = require.context("./", true, /\.(ts|tsx|js)$/);
rc.keys().forEach(rc);
context.initialize().then(r => {
  ReactDOM.render(<Application />, document.getElementById("root"));
});
